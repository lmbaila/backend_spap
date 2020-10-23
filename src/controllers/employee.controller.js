
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');
const {decodeToken} = require('../auth');


/** */
module.exports = {
  async index(req, res){
    try {
      const {id_company} = await decodeToken(req.headers.authorization);
      const employee = await knex('employee')
      .join('users', 'employee.id_user', 'users.id_user')
      .join('person', 'person.id_person', 'users.id_person')
      .join('group_users', 'group_users.id_group_users', 'users.id_group_users')
      .join('company', 'company.id_company', 'employee.id_company')
      .where('employee.id_company',id_company)
      .andWhere('employee.state', true)
      .column( 'employee.id_employee','person.name', 'person.surname', 'person.gender', 'company.full_name', 'person.nr_document')
      
      res.status(200).send({employee});      
    } catch (error) {
      return res.status(400).send({error: 'Request failed!'});
    }

  },
  async update(req, res){
    const { name, surname, born_at, nr_document, gender, password} = req.body;
    try {
      const {id_company} = await decodeToken(req.headers.authorization);
      const id_employee = req.params.id;
      await knex.transaction(async trx => {
        const {id_person, id_user} = await knex('employee')
        .join('users', 'users.id_user', 'employee.id_user')
        .join('person', 'person.id_person', 'users.id_person')
        .where({id_employee})
        .andWhere('employee.id_company', id_company)
        .andWhere('employee.state', true)
        .first().transacting(trx);
       
       await knex('person').where({id_person})
        .update({
          'name': name, 
          'surname': surname, 
          'born_at': born_at,
          'nr_document': nr_document,
          'gender': gender
        }).transacting(trx) ;  

        await knex('users').where({id_user})
        .update({
          'password': bcrypt.hash(password, 10)
        }).transacting(trx);
      });

       return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(400).send({error: 'Operation failed'});
    }      
  },

  async create(req, res){
    
    try {
      const {id_company} = await decodeToken(req.headers.authorization);
      const {name, surname, born_at, nr_document, gender, password, id_group_users} = req.body;
      const id_user = `${crypto.randomBytes(4).toString('Hex')}${name[0]}${surname[0]}`.toLowerCase();
      const id_employee = `${crypto.randomBytes(4).toString('Hex')}`;
      const [_user_name] = name.split(' ');
      const user_name = `${_user_name}_${id_user.substring(0, 4)}`.toLowerCase();
      const password_hash = await bcrypt.hash(password, 10);

      const person = await knex('person').where({nr_document}).first();
      if(person) return res.status(400).send({error: 'user with same document number already exists'}); 
      await knex.transaction(async trx => {
        const id_person = 
        await knex('person')
        .insert({name, surname, born_at, nr_document, gender}, 'id_person').transacting(trx);
       await knex('users')
       .insert({id_user, id_group_users, id_person:id_person[0], user_name, password:password_hash})
       .transacting(trx);
       await knex('employee')
       .insert({id_employee, id_user, id_company})
       .transacting(trx);
      });
      
      return res.status(200).send({message: 'user created sucessfully'});
    }catch(err){
      console.log(err);
      return res.status(400).send({error: 'Registration failed'});
    }
  },

  async delete(req, res){
    try {
      const {id_company} = await decodeToken(req.headers.authorization);
      const {id_employee} = req.body;
      const employee = await knex('employee')
      .where({id_employee})
      .andWhere('employee.id_company', id_company)
      .select('id_employee').first();
      if(employee.id_employee != id_employee){
        return res.status(401).send({error: 'Operation not permitted'});
      }
           
      await knex('employee').where({id_employee}).update('state', false);
      return res.status(204).send();

    } catch (error) {
      console.log(error)
    }
  }
}
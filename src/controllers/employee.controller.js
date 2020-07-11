
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');

module.exports = {
  async create(req, res){
    const {name, surname, born_at, nr_document, gender, password, id_group_users} = req.body;
 
    try {
     
      const id_user = `${crypto.randomBytes(4).toString('Hex')}${name[0]}${surname[0]}`;
      const id_employee = `${crypto.randomBytes(4).toString('Hex')}`;
      const user_name = `${name}${id_user.substring(0, 4)}`;
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
       .insert({id_employee, id_user})
       .transacting(trx);
      });
      
      return res.status(200).send({message: 'user created sucessfully'});
    }catch(err){
      console.log(err);
      return res.status(400).send({error: 'Registration failed'});
    }
  }
}
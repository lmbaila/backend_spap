
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');

module.exports = {
  async create(req, res){
    const {id_user, id_invoice, date_payment, kind_payment, file_path_proof, amount_pay} = req.body;
  
    try {
     
      const {id_employee} =  await knex('users').join('employee','users.id_user','employee.id_user').where({'employee.id_user':id_user}).first();
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
      return res.status(400).send({error: 'Registration failed'});
    }
  }
}
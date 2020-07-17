
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');

module.exports = {
  async create(req, res){
    const {id_user, id_contract_custumer, id_monthly_management, initial_consumption, final_consumption, obs, balance_value} = req.body;
  
    try {
     
      const {id_employee} =  await knex('users').join('employee','users.id_user','employee.id_user').where({'employee.id_user':id_user}).first();
      const existsReadingCurrentMonth = await knex('reading')
                    .where({id_contract_custumer})
                    .andWhere({id_monthly_management})
                    .first();

      if(existsReadingCurrentMonth) return res.status(400).send({error: 'Reading for this custumer already exists'}); 
      await knex.transaction(async trx => {
       await knex('reading')
       .insert({id_employee, id_contract_custumer, id_monthly_management, initial_consumption, final_consumption, obs, balance_value})
       .transacting(trx);
      });
      
      return res.status(200).send({message: ' Lecture created sucessfully'});
    }catch(err){
      return res.status(400).send({error: 'Registration failed'});
    }
  }
}

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');
const {decodeToken} = require('../auth');
const invoice = require('../controllers/invoice.controller');

module.exports = {
  async create(req, res){
    const {id_contract_custumer, id_monthly_management, initial_reading, final_reading, obs, balance_value} = req.body;
  
    try {
      const {id_employee, id_company} = await decodeToken(req.headers.authorization);
      //return res.status(200).send({id_employee, id_company});
      const id_reading = `${crypto.randomBytes(4).toString('Hex')}${id_employee.substring(0,4)}`.toUpperCase();
      const existsReadingCurrentMonth = await knex('reading')
                    .where({id_contract_custumer})
                    .andWhere({id_monthly_management})
                    .first();
      
      if(existsReadingCurrentMonth) return res.status(400).send({error: 'Reading for this custumer already exists'}); 
      await knex.transaction(async trx => {
       await knex('reading')
       .insert({id_reading, id_employee, id_contract_custumer, id_monthly_management, initial_reading, final_reading, obs, balance_value},'id_reading')
       .transacting(trx);
       invoice.create(id_reading, id_employee, id_company);
      });
      
      return res.status(200).send({message: ' Lecture created sucessfully'});
    }catch(err){
      console.log(err);
      return res.status(400).send({error: 'Registration failed'});
    }
  }
}
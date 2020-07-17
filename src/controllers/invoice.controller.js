
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');

module.exports = {
  async create(req, res){
    const {id_user, id_reading, value_pay} = req.body;
  
    try {
     
      const {id_employee} =  await knex('users').join('employee','users.id_user','employee.id_user').where({'employee.id_user':id_user}).first();
      const verifyInvoiceCurrentMonth = await knex('invoice').where({id_reading}).first();

      if(verifyInvoiceCurrentMonth) return res.status(400).send({error: 'Invoice for this contract already exists'}); 
      await knex.transaction(async trx => {
       await knex('invoice')
       .insert({id_employee,id_reading, value_pay})
       .transacting(trx);
      });
      
      return res.status(200).send({message: 'Invoice created sucessfully'});
    }catch(err){
      return res.status(400).send({error: 'Registration failed'});
    }
  }
}
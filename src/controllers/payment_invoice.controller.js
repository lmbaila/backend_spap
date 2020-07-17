
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');

module.exports = {
  async create(req, res){
    const {id_user, id_invoice, date_payment, kind_payment, file_path_proof, amount_pay} = req.body;
  
    try {
     
      const {id_employee} =  await knex('users').join('employee','users.id_user','employee.id_user').where({'employee.id_user':id_user}).first();
      const paymentNotClosed = await knex('payment_invoice')
                              .where({id_invoice})
                               .first();

      if(paymentNotClosed) return res.status(400).send({error: 'user with same document number already exists'}); 
      await knex.transaction(async trx => {
       await knex('employee')
       .insert({id_employee, id_invoice, date_payment, kind_payment, file_path_proof, amount_pay})
       .transacting(trx);
      });
      
      return res.status(200).send({message: 'user created sucessfully'});
    }catch(err){
      return res.status(400).send({error: 'Registration failed'});
    }
  }
}
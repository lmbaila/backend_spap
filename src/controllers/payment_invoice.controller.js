
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');
const {decodeToken} = require('../auth');
module.exports = {
  async create(req, res){

  
    try {
      const { id_invoice, date_payment, kind_payment, file_path_proof, amount_pay} = req.body;
      
      const {id_employee, id_user} = await decodeToken(req.headers.authorization);
      return res.status(200).send(temm);
      
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
      console.log(err);
      return res.status(400).send({error: 'Registration failed'});
    }
  }
}
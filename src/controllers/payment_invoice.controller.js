
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');
const {decodeToken} = require('../auth');
module.exports = {
  async create(req, res){

  
    try {
      const { id_invoice, kind_payment, file_path_proof, amount_pay} = req.body;
      
      const {id_employee} = await decodeToken(req.headers.authorization);     
      const paymentNotClosed = await knex('payment_invoice')
      .where({id_invoice})
      .first(); 

      if(paymentNotClosed) return res.status(400).send({error: 'Esta fatura foi paga. '}); 
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
  },

  async ifPaymentNotComplete(){
    return true;
  },

  async insertOnAccountBalanceOfCustumer(){
    return true;
  }
}
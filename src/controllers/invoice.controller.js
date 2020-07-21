
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');
const {calculateValueOfPayment} = require('../helpers/invoice.helper');
const knexfile = require('../../knexfile');
const {decodeToken} = require('../auth');

module.exports = {
  async create(id_reading, id_employee, id_company){
   
    try {
      await knex.transaction(async trx => {
      //const {id_company, id_employee} = await decodeToken(req.headers.authorization);
      const  {final_reading, initial_reading, count_state} = await knex('reading').join('contract_custumer','reading.id_contract_custumer', 'contract_custumer.id_contract_custumer')
                                                            .where('reading.id_reading', id_reading).first().transacting(trx);

      const consumption = final_reading - initial_reading;
      const {price,iva} = await knex('fee_payment').where('initial_consumption', `${count_state? '<=': '='}`, `${count_state?  consumption: 0}`)
                              .join('company', 'fee_payment.id_company', 'company.id_company')
                              .andWhere('final_consumption', `${count_state? '>=': '='}`, `${count_state?  consumption: 0}`)
                              .andWhere('fee_payment.id_company',id_company).first().transacting(trx);
      
      const value_pay =  calculateValueOfPayment({price, iva})

      const verifyInvoiceCurrentMonth = await knex('invoice').where({id_reading}).first();
      if(verifyInvoiceCurrentMonth) return res.status(400).send({error: 'Invoice for this contract already exists'}); 
    
       await knex('invoice')
       .insert({id_employee,id_reading, value_pay})
       .transacting(trx);
      });
    }catch(err){
      console.log(err);
      return res.status(400).send({error: "Error when try to create a new invoice"});
    }
  }


}

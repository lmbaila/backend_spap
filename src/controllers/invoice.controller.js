const knex = require('../database');
const {calculateValueOfPayment} = require('../helpers/invoice.helper');

module.exports = {
  async create(array){
   const {id_reading, id_employee, balance_value} = array;
    try {
      await knex.transaction(async trx => { 

      const verifyInvoiceCurrentMonth = await knex('invoice').where({id_reading}).first();
      if(verifyInvoiceCurrentMonth) return res.status(400).send({error: 'Invoice for this contract already exists'}); 
    
       await knex('invoice')
       .insert({id_employee,id_reading, value_pay: balance_value})
       .transacting(trx);
      });
    }catch(err){
      console.log(err);
      return res.status(400).send({error: "Error when try to create a new invoice"});
    }
  },

  async calculateValueofInvoice(array){
    try {
      const {id_company, count_state, consumption} = array;

        const {price,iva} = await knex('fee_payment').where('initial_consumption', `${count_state? '<=': '='}`, `${count_state?  consumption: 0}`)
        .join('company', 'fee_payment.id_company', 'company.id_company')
        .andWhere('final_consumption', `${count_state? '>=': '='}`, `${count_state?  consumption: 0}`)
        .andWhere('fee_payment.id_company',id_company).first();
        const balance_value = calculateValueOfPayment({price, iva});
        return balance_value;
      
    } catch (error) {
      console.log(error);
    }
    
  }

}

const knex = require("../database");
const { checkValueInvoice } = require('../helpers/invoice.helper');

module.exports = {
  async create(array){
    const{id_invoice, amount_pay, id_employee, kind_payment} = array;
    try {
      
        await knex.transaction(async trx => {
          const invoice_data = await checkValueInvoice(id_invoice);
          const valor_em_falta = invoice_data.valor_falta;
          if((amount_pay - valor_em_falta) >= 0) {
            await knex('late_payment')
             .insert({id_invoice, value_pay:valor_em_falta}).transacting(trx);
             await knex('payment_invoice')
             .insert({id_employee, id_invoice, kind_payment, amount_pay:invoice_data.valuepay})
             .transacting(trx);
             return 'MSG';
          }else{
            const valor_pagar = amount_pay - valor_em_falta;
            if(valor_pagar <= 0) {
              await knex('late_payment')
              .insert({id_invoice, value_pay:amount_pay}).transacting(trx);
             return 'MSG1';
            }else{
              await knex('late_payment')
              .insert({id_invoice, value_pay:valor_em_falta}).transacting(trx);
              return "MSG3";
            }               
          }
        });
        
    }catch(err){
      return err;
    }
  },

  async show(req, res){
    try {
      const {id_invoice} = req.params;
      const late_payment = await knex('late_payment')
        .where('late_payment.id_invoice', id_invoice)
        .select('*');
      res.status(200).send({late_payment});
    } catch (error) {
      console.log(error);

    }
  }

  
}
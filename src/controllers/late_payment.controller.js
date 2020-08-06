
const knex = require("../database");

module.exports = {
  async create(array){
    const{id_invoice, amount_pay, id_employee, kind_payment} = array;
    try {
      
        await knex.transaction(async trx => {
          const invoice_data = await  this.checkValueInvoice(id_invoice);
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

  async checkValueInvoice(id_invoice){
      try {
        const {sum} = await knex.sum('value_pay').from('late_payment').where({id_invoice}).first();
        const {value_pay} = await knex('invoice').where('id_invoice', id_invoice).first();
        const data = {valuepay: value_pay, valor_falta: value_pay - sum };
        return data;     
      } catch (error) {
          console.log(error);
      }
  }
}
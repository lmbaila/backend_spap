const knex = require("../database"); 
module.exports = {
    calculateValueOfPayment(array){
        const {price, iva} = array;
        return price + price* iva;
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
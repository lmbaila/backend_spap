const knex = require('../database');
const {calculateValueOfPayment} = require('../helpers/invoice.helper');
const {decodeToken} = require('../auth');

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

  async index(req, res){
    try {
      const {id_company} = await decodeToken(req.headers.authorization);
      const {page = 1, order = 'name', direction = 'asc'} = req.query;
      const column = order.split(',')
      const invoice = await knex('invoice')
      .join('reading', 'reading.id_reading', 'invoice.id_reading')  
      .join('contract_custumer', 'reading.id_contract_custumer', 'contract_custumer.id_contract_custumer')
      .join('custumer', 'contract_custumer.id_custumer', 'custumer.id_custumer')
      .join('person', 'person.id_person', 'custumer.id_person')
      .join('employee', 'employee.id_employee', 'reading.id_employee')
      .join('users', 'employee.id_user', 'users.id_user')
      .join('monthly_management', 'monthly_management.id_monthly_management', 'reading.id_monthly_management')
      .join('fee_payment', 'contract_custumer.id_fee', 'fee_payment.id_fee')
      .where('fee_payment.id_company', id_company)
      .limit(5)
      .offset((page - 1) * 5)
      .column(
        'contract_code', 'count_state', 'name', 
        'surname', 'date_invoice', 'initial_reading', 
        'final_reading', 'value_pay', 'reading_date',
        'description', 'user_name'
      )
      .orderBy(column, direction);
      return res.status(200).send({invoice});
    } catch (error) {
      console.log(error);
      return res.status(400).send({error});

    }
  },
  
  async calculateValueofInvoice(array){
    try {
      const {id_company, id_contract_custumer, consumption} = array;
        const {count_state} = await knex('contract_custumer').where({id_contract_custumer}).first();
        
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

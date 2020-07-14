
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');

module.exports = {
  async create(req, res){
   
    try {
      const { id_user, reading_date, date_invoice, limit_payment} = req.body;
      
      const {id_employee, id_company} =  await knex('users').join('employee','users.id_user','employee.id_user').where({'employee.id_user':id_user}).first();
      
      const verifyCurrentDateofCompany =  await knex.raw(`SELECT monthlymanagementopen('${reading_date}','${id_company}')`);
      
      console.log(verifyCurrentDateofCompany.rows[0].monthlymanagementopen);
      
      if(verifyCurrentDateofCompany.rows[0].monthlymanagementopen)  return res.status(400).send({error: 'This month is already open'});
       await knex('monthly_management')
        .insert({id_employee, reading_date, date_invoice, limit_payment});
       return res.status(200).send({msg: 'Monthly created successfull'})
    }catch(err){
      console.log(err)
      return res.status(400).send({error: 'Registration failed'});
    }
  }
}

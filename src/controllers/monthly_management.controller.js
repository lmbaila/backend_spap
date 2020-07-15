
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');
const moment = require('moment');

module.exports = {
  async create(req, res){
   
    try {
      const { id_user, reading_date, date_invoice, limit_payment} = req.body;
      const time =  moment(new Date(), 'YYYY-MM-DD').format();;
      
      console.log(time.substring(0, 7));
      const {id_employee, id_company} =  await knex('users').join('employee','users.id_user','employee.id_user').where({'employee.id_user':id_user}).first();
    
      const verifyCurrentDateofCompany =  await knex('');
      /*    
      if(verifyCurrentDateofCompany.rows[0].monthlymanagementopen)  return res.status(400).send({error: 'This month is already open'});
       await knex('monthly_management')
        .insert({id_employee, reading_date, date_invoice, limit_payment});*/
       return res.status(200).send({msg: 'Monthly created successfull'})
    }catch(err){
      console.log(err)
      return res.status(400).send({error: 'Registration failed'});
    }
  }
}

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');
const moment = require('moment');
const {decodeToken} = require('../auth');
module.exports = {
  async create(req, res){
   /* */
    try { 
      const id_user = await decodeToken(req.headers.authorization);
      console.log(id_user);
      const { reading_date, date_invoice, limit_payment} = req.body;
      
      const time = moment(new Date(), 'YYYY-MM-DD').format();
      const temp = '2021-09';
      //time.substring(0,7);
      //console.log( temp);

      const {id_employee, id_company} =  await knex('users').join('employee','users.id_user','employee.id_user').where({'employee.id_user':id_user}).first();
      if(!id_employee) return res.status(400).send({error:'Registration failed' });

      const verifyCurrentDateofCompany =  await knex('monthly_management')
      .join('employee','monthly_management.id_employee','employee.id_employee')
      .join('company','company.id_company','employee.id_company')
      .where({"company.id_company":id_company,state:'opened'}).andWhere('reading_date','like',`%${temp}%`).first();
           
      /*
      if(verifyCurrentDateofCompany.rows[0].monthlymanagementopen)  return res.status(400).send({error: 'This month is already open'});
       await knex('monthly_management')
        .insert({id_employee, reading_date, date_invoice, limit_payment});*/
       return res.status(200).send({verifyCurrentDateofCompany});

       return res.status(200).send({msg: 'Monthly created successfull'})
    }catch(err){
      console.log(err)
      return res.status(400).send({error: 'Registration failed'});
    }
  }
}

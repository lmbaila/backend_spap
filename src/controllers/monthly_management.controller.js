const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');
const moment = require('moment');
const {decodeToken} = require('../auth');
const { index } = require('./invoice.controller');

module.exports = {
  async create(req, res){
   
    try {
      const {id_employee, id_company} =  await decodeToken(req.headers.authorization);
      const { reading_date, date_invoice, limit_payment} = req.body;
      
      const time = moment(new Date(), 'YYYY-MM-DD').format();
      const temp = time.substring(0,7);
      
      if(!id_employee) return res.status(400).send({error:'Registration failed' });
       const verifyCurrentDateofCompany =  await knex('monthly_management')
      .join('employee','monthly_management.id_employee','employee.id_employee')
      .join('company','company.id_company','employee.id_company')
      .where({"company.id_company":id_company,"monthly_management.state":'opened'}).andWhere('reading_date','like',`%${temp}%`).first();
        
      if(verifyCurrentDateofCompany)  return res.status(400).send({error: 'This month is already open'});
      await knex.transaction(async trx => {
        await knex('monthly_management').where('state', 'opened')
        .update('state', 'closed')
        .transacting(trx);
        await knex('monthly_management')
        .insert({id_employee, reading_date, date_invoice, limit_payment})
        .transacting(trx);
      }); 
       
      return res.status(200).send({msg: 'Monthly created successfull'})
    }catch(err){
      console.log(err)
      return res.status(400).send({error: 'Registration failed'});
    }
  },

  async index(req, res){
    try {
      const {id_company} =  await decodeToken(req.headers.authorization);
      const montlhyOpened = await knex('monthly_management')
      .join('employee', 'employee.id_employee', 'monthly_management.id_employee')
      .join('company', 'company.id_company', 'employee.id_company')
      .where('company.id_company', id_company)
      .andWhere('monthly_management.state', 'opened')
      .select('*');
      return res.status(200).send({montlhyOpened});
    } catch (error) {
      console.log(error);
      return res.status(400).send({error})
    }
  }
}

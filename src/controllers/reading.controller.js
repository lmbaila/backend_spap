const {calculateValueOfPayment} = require('../helpers/invoice.helper');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');
const {decodeToken} = require('../auth');
const invoice = require('../controllers/invoice.controller');
const { index } = require('./contract_custumer.controller');

module.exports = {
  async create(req, res){
    const {id_contract_custumer, id_monthly_management, initial_reading, final_reading, obs} = req.body;
  
    try {
      const {id_employee, id_company} = await decodeToken(req.headers.authorization);
      
      const id_reading = `${crypto.randomBytes(4).toString('Hex')}${id_employee.substring(0,4)}`.toUpperCase();
        const data_readind_custumer = await knex('reading')
        .join('contract_custumer', 'contract_custumer.id_contract_custumer', 'reading.id_contract_custumer')
        .where('contract_custumer.id_contract_custumer', id_contract_custumer)
        .andWhere('reading.id_monthly_management', id_monthly_management) 
        .first();

      if(data_readind_custumer) return res.status(400).send({error: 'Reading for this custumer already exists'}); 
      await knex.transaction(async trx => {
        const consumption = final_reading - initial_reading;
        const balance_value = await invoice.calculateValueofInvoice({id_company, id_contract_custumer, consumption}); 
       await knex('reading')
       .insert({id_reading, id_employee, id_contract_custumer, id_monthly_management, initial_reading, final_reading, obs, balance_value})
       .transacting(trx);
       invoice.create({id_reading, id_employee, balance_value});
      });
      
      return res.status(200).send({message: ' Lecture created sucessfully'});
    }catch(err){
      console.log(err);
      return res.status(400).send({error: 'Registration failed'});
    }
  },

  async index(req, res){
    try {
      const {id_company} = await decodeToken(req.headers.authorization);
      const reading = await knex('reading')
      .join('employee', 'employee.id_employee', 'reading.id_employee')
      .join('contract_custumer', 'contract_custumer.id_contract_custumer', 'reading.id_contract_custumer')
      .join('custumer', 'custumer.id_custumer', 'contract_custumer.id_custumer')
      .join('person', 'person.id_person', 'custumer.id_person')
      .join('monthly_management', 'monthly_management.id_monthly_management', 'reading.id_monthly_management')
      .where('employee.id_company', id_company)
      .select('*');
      return res.status(200).send({reading});
    } catch (error) {
      console.log(error);
    }
  }
}
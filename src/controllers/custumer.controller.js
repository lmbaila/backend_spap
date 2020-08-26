
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');
const {decodeToken} = require ('../auth');


module.exports = {
  async create(req, res){
    const {name, surname, born_at, nr_document, gender, nacionality,} = req.body;
    const {id_company} = await decodeToken(req.headers.authorization);
    
    try { 
     
      const id_custumer = `${crypto.randomBytes(4).toString('Hex')}${name[0]}${surname[0]}`.toLowerCase();
      const person = await knex('person')
      .join('custumer', 'person.id_person', 'custumer.id_person')
      .join('contract_custumer' ,'custumer.id_custumer', 'contract_custumer.id_custumer')
      .join('fee_payment', 'fee_payment.id_fee', 'contract_custumer.id_fee')
      .where({nr_document}).andWhere({id_company}).first();

      if(person) return res.status(400).send({error: 'Custumer with same document number already exists'}); 
      await knex.transaction(async trx => {
        const id_person = 
        await knex('person')
        .insert({name, surname, born_at, nr_document, gender}, 'id_person').transacting(trx);
       await knex('custumer')
       .insert({id_custumer,id_person:id_person[0], nacionality})
       .transacting(trx);
      });
      
      return res.status(200).send({message: 'Custumer created sucessfully'});
    }catch(err){
      console.log(err);
      return res.status(400).send({error: 'Registration failed'});
    }
  }
}

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');

module.exports = {
  async create(req, res){
    const {name, surname, born_at, nr_document, gender, nacionality,} = req.body;
  
    try { 
     
      const id_custumer = `${crypto.randomBytes(4).toString('Hex')}${name[0]}${surname[0]}`.toLowerCase();
      const person = await knex('person').where({nr_document}).first();

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
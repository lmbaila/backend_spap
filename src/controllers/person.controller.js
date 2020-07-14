
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('./../database/index');

module.exports = {

  async create(req, res, trx) {
    const {name,  surname, born_at,nr_document, gender} = req.body;
    const person = await knex('person').where({nr_document}).first();
    if(person) return res.status(400).send({error: 'user with same document number already exists'}); 
      const id_person = 
      await knex('person')
      .insert({name, surname, born_at, nr_document, gender}, 'id_person').transacting(trx);
    return id_person;
  }
}
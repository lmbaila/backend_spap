
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('./../database/index');

module.exports = {

  async createPerson(req, res) {
    const {name,  surname, born_at,nr_document, gender} = req.body;
    return res.json(req.body);
    
  }
}
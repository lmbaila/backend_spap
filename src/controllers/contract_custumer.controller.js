const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');

module.exports = {
  async create(req, res){
    const {contract_code, id_custumer, id_fee, account_balance, province_code, address_name, place_nr, block_nr, latitude, longitude} = req.body;
    try {

      const contract_custumer = await knex('contract_custumer').where({contract_code}).andWhere('id_fee', id_fee).first();

      if(contract_custumer) return res.status(400).send({error: 'Contract with same code already exists'}); 
      await knex.transaction(async trx => {
          const id_contract_custumer = await knex('contract_custumer')
            .insert({contract_code,id_fee, id_custumer, account_balance}, 'id_contract_custumer')
            .transacting(trx);

       await knex('address_contract')
       .insert({id_contract_custumer:id_contract_custumer[0], province_code, address_name, place_nr, block_nr, latitude, longitude})
       .transacting(trx);
      });
      
      return res.status(200).send({message: 'Contract created sucessfully'});
    }catch(err){
      console.log(err);
      return res.status(400).send({error: 'Registration failed'});
    }
  }
}
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');
const {decodeToken} = require('../auth');

module.exports = {
  async index(req, res){
    try {
      const {id_company} = await decodeToken(req.headers.authorization);
      const contract_custumer = await knex('contract_custumer')
      .join('custumer', 'contract_custumer.id_custumer', 'custumer.id_custumer')
      .join('person', 'custumer.id_person', 'person.id_person')
      .join('fee_payment', 'contract_custumer.id_fee', 'fee_payment.id_fee')
      .join('company', 'fee_payment.id_company', 'company.id_company')
      .join('address_contract', 'contract_custumer.id_contract_custumer', "address_contract.id_contract_custumer")
      .where('fee_payment.id_company',id_company)
      .andWhere('contract_custumer.state', true)
      .column('person.name', 'person.surname', 'person.nr_document', 'contract_custumer.contract_code', 'contract_custumer.account_balance', 'address_contract.address_name');
      return res.status(200).send({contract_custumer});
    } catch (err) {
      console.log(err);
      return res.status(400).send({ error: err });
    }  
  }, 

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
      return res.status(400).send({error: 'Registration failed'});
    }
  },

  async delete(req, res){
    try {
      const {id_contract_custumer} = req.body;
      const {id_company} = await decodeToken(req.headers.authorization);
      const contract_custumer = await knex('contract_custumer')
      .join('fee_payment','fee_payment.id_fee', 'contract_custumer.id_fee')
      .where({id_contract_custumer})
      .andWhere('fee_payment.id_company', id_company)
      .select('id_contract_custumer') .first();
      
      if(contract_custumer.id_contract_custumer != id_contract_custumer){
        return res.status(401).send({error: 'Operation not permitted'});
      }
           
      await knex('contract_custumer').where({id_contract_custumer}).update('state', false);
      //HTTP CODE 204 = Not content
      return res.status(204).send();

    } catch (error) {
      return res.status(400).send({error: 'Operation failed'});
    }
  },
   async update(req, res){
     try {
      const {id_contract_custumer, id_fee, count_state, province_code, address_name, place_nr, block_nr, latitude, longitude} = req.body;
      const {id_company} = await decodeToken(req.headers.authorization);

      await knex.transaction(async trx => {
        const contract_custumer = await knex('contract_custumer')
        .join('fee_payment','fee_payment.id_fee', 'contract_custumer.id_fee')
        .where({id_contract_custumer})
        .andWhere('fee_payment.id_company', id_company)
        .andWhere('contract_custumer.state', true)
        .select('id_contract_custumer')
        .first()
        .transacting(trx);
  
        await knex('contract_custumer').where({id_contract_custumer})
        .update({
          'id_fee': id_fee,
          'count_state': count_state
        }).transacting(trx) ;
  
        await knex('address_contract').where({id_contract_custumer})
        .update({
          'place_nr': place_nr,
          'block_nr': block_nr,
          'latitude': latitude,
          'longitude': longitude,
          'province_code': province_code,
          'address_name': address_name
        }).transacting(trx) ;
      });
            
      return res.status(204).send();
     } catch (error) {
      console.log(error);
      return res.status(400).send({error: 'Operation failed'});
     }
   }
}
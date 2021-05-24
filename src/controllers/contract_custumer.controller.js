const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('../database');
const {decodeToken} = require('../auth');

module.exports = {
  async index(req, res){
    try {
      const {id_company} = await decodeToken(req.headers.authorization);
      const {page = 1, order = 'name', direction = 'asc'} = req.query;
      const column = order.split(',')
      const contract_custumer = await knex('contract_custumer')
      .join('custumer', 'contract_custumer.id_custumer', 'custumer.id_custumer')
      .join('person', 'custumer.id_person', 'person.id_person')
      .join('fee_payment', 'contract_custumer.id_fee', 'fee_payment.id_fee')
      .join('company', 'fee_payment.id_company', 'company.id_company')
      .join('address_contract', 'contract_custumer.id_contract_custumer', "address_contract.id_contract_custumer")
      .where('fee_payment.id_company',id_company)
      .andWhere('contract_custumer.state', true) 
      .limit(5)
      .offset((page - 1) * 5)
      .column(
        'contract_custumer.id_contract_custumer', 'person.name', 'person.surname', 
        'person.nr_document', 'contract_custumer.contract_code', 'contract_custumer.account_balance',
        'address_contract.address_name', 'place_nr', 'block_nr')
      .orderBy(column, direction);

      return res.status(200).send({contract_custumer});
    } catch (err) {
      console.log(err);
      return res.status(400).send({ error: err });
    }  
  }, 

  async create(req, res){
    const {name, surname, born_at, nr_document, gender, nacionality, contract_code, id_fee, province_code, address_name, place_nr, block_nr, latitude, longitude} = req.body;
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

       const id_contract_custumer = await knex('contract_custumer')
        .insert({contract_code,id_fee, id_custumer}, 'id_contract_custumer')
        .transacting(trx);

       await knex('address_contract')
       .insert({id_contract_custumer:id_contract_custumer[0], province_code, address_name, place_nr, block_nr, latitude, longitude})
       .transacting(trx);
      });
      
      return res.status(200).send({message: 'Custumer created sucessfully'});
    }catch(err){
      console.log(err);
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
      const { id_fee, count_state, province_code, address_name, place_nr, block_nr, latitude, longitude} = req.body;
      const {id_company} = await decodeToken(req.headers.authorization);
      const id_contract_custumer = req.params.id;
      
      await knex.transaction(async trx => {
        const contract_custumer = await knex('contract_custumer')
        .join('fee_payment','fee_payment.id_fee', 'contract_custumer.id_fee')
        .where({id_contract_custumer})
        .andWhere('fee_payment.id_company', id_company)
        .andWhere('contract_custumer.state', true)
        .select('id_contract_custumer')
        .first()
        .transacting(trx);
        if(!contract_custumer) return res.status(400).send({msg: 'Can`t find de contract custumer'})
  
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
   },

   async show(req, res){
     try {
       const {id_contract_custumer} = req.params;
       const {id_company} = await decodeToken(req.headers.authorization);
       const contract_custumer = await knex('contract_custumer')
        .join('custumer', 'custumer.id_custumer', 'contract_custumer.id_custumer')
        .join('person', 'person.id_person', 'custumer.id_person')
        .join('address_contract', 'contract_custumer.id_contract_custumer', 'address_contract.id_contract_custumer')
        .join('fee_payment', 'fee_payment.id_fee', 'contract_custumer.id_fee')
        .join('company', 'company.id_company', 'fee_payment.id_company')
        .where('contract_custumer.id_contract_custumer', id_contract_custumer)
        .andWhere('company.id_company', id_company)
        .column(
          'contract_code', 'count_state', 'nacionality',
          'name', 'surname', 'nr_document',
          'nuit', 'contact_number1', 'contact_number2',
          'latitude', 'longitude', 'count_state'
        );
      return res.status(200).send({contract_custumer});
     } catch (error) {
       console.log(error);
       return res.status(400).send({error});
     }
   }
}
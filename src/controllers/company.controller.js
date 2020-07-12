const knex = require('../database');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

module.exports = {
    async create(req, res){
        const {id_person, full_name, license, nuit, contact_number1, contact_number2, email, obs, address_description, iva, fine, logo_company, slogan, contrat_expire} = req.body;
        try {
            const id_company = `${crypto.randomBytes(4).toString('Hex')}${full_name[0]}`.toLowerCase();
            const company = await knex('company').where({license}).first();
            const company_nuit = await knex('company').where({nuit}).first();
            if(company) return res.status(400).send({error: 'company with same license already exists'}); 
                await knex.transaction(async trx => {
                    await knex('company')
                    .insert({id_company, id_person, full_name, license, nuit, contact_number1, contact_number2, email, obs, address_description, iva, fine, logo_company, slogan, contrat_expire}, 'license').transacting(trx);
                });
            if(company_nuit) return res.status(400).send({error: 'Company with same nuit already exists'});
                await knex.transaction(async trx => {
                    await knex('company')
                    .insert({id_company, id_person, full_name, license, nuit, contact_number1, contact_number2, email, obs, address_description, iva, fine, logo_company, slogan, contrat_expire}, 'license').transacting(trx);
                });        
            return res.status(200).send({message: 'company created sucessfully'});
        } catch (error) {
            console.log(error);
        }
    }
};
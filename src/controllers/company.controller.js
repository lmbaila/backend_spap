const knex = require('../database');
const crypto = require('crypto');
const {decodeToken} = require('../auth');

module.exports = {
    async create(req, res){
        const {id_person, full_name, license, nuit, contact_number1, contact_number2, email, obs, address_description, iva, fine, logo_company, slogan, contrat_expire} = req.body;
        try {
            const id_company = `${crypto.randomBytes(4).toString('Hex')}${full_name[0]}`.toLowerCase();
            const company = await knex('company').where({id_company}).first();
            const company_nuit = await knex('company').where({nuit}).first();

            if(company && company_nuit) return res.status(400).send({error: 'Registration failed'}); 
                await knex.transaction(async trx => {
                    await knex('company')
                    .insert({id_company, id_person, full_name, license, nuit, contact_number1, contact_number2, email, obs, address_description, iva, fine, logo_company, slogan, contrat_expire}, 'license').transacting(trx);
                });
                 
            return res.status(200).send({message: 'company created sucessfully'});
        } catch (error) {
            console.log(error);
        }
    },
    async index(req, res){
        try {
            const company = await knex('company')
            .join('fee_payment', 'fee_payment.id_company', 'company.id_company')
            .select('*')
            .orderBy('license', 'asc')
            return res.status(200).send({'company': company});
        } catch (error) {
            console.log(error);
        }
    },

    async show(req, res){
        try {
            const {id_company} = await decodeToken(req.headers.authorization);
            const company = await knex('company')
             .where({id_company})
             .column(
                'full_name', 'license', 'nuit', 'contact_number1',
                'logo_company', 'slogan', 'contrat_expire'
             );
           return res.status(200).send({company}); 
          } catch (error) {
              console.log(error)
            return res.status(400).send({error});
          }
        }
};
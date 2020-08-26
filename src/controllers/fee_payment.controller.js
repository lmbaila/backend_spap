const knex = require('../database');
const crypto = require('crypto');
const { create } = require('./company.controller');

module.exports = {
    async create(req, res){
        const {id_company, description, initial_consumption, final_consumption, price} = req.body;
        try {
            const id_fee = `${crypto.randomBytes(4).toString('Hex')}${description[0]}`.toLowerCase();
            const fee_payment = await knex('fee_payment').where({id_fee}).first();
            if(fee_payment) return res.status(400).send({error: 'fee paymet for this company already registed'}); 
            await knex.transaction(async trx => {
                await knex('fee_payment')
                .insert({id_fee, id_company, description, initial_consumption, final_consumption, price}, 'id_fee')
                .transacting(trx);
            });
            res.status(200).send({msg:'Fee payment has been created'});
        } catch (error) {
            console.log(error);
        }
    }
};
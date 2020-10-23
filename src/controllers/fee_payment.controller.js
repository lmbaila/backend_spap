const knex = require('../database');
const crypto = require('crypto');
const {decodeToken} = require('../auth');

module.exports = {
    async create(req, res){
        const {id_company} = await decodeToken(req.headers.authorization);
        const {description, initial_consumption, final_consumption, price} = req.body;
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
    },
    async update(req, res){
        try {
            const { description, initial_consumption, final_consumption, price} = req.body;
            const {id_company} = await decodeToken(req.headers.authorization);
            const id_fee = req.params.id;
            await knex.transaction(async trx =>{
                const fee_payment = await knex('fee_payment')
                .where({id_fee})
                .andWhere({id_company})
                .transacting(trx);
                if(!fee_payment) return res.status(400).send({error: 'fee paymet does not exists'});
                await knex('fee_payment').where({id_fee})
                .update({
                    'description': description, 
                    'initial_consumption': initial_consumption,
                    'final_consumption': final_consumption,
                    'price': price
                }).transacting(trx);
                return res.status(204).send({msg: 'Ok'});
            });
            
        } catch (error) {
            console.log(error)
            //return res.status(401).send({error});
        }
    }
};
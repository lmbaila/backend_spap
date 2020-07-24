
const knex = require('../database');
const {decodeToken} = require('../auth');

module.exports = {
  async create(req, res){
    const {id_contract_custumer, description} = req.body;
    try {
      const {id_employee} = decodeToken(req.headers.authorization);
      const verifyProblemCustumer = await knex('custumer_problem').where('id_contract_custumer', id_contract_custumer).andWhere('state_problem','not resolved');
      if(verifyProblemCustumer) return res.status(400).send({error: 'Este cliente tem uma occorencia que ainda nao foi registada'}); 
      await knex.transaction(async trx => {
           await knex('custumer_problem')
            .insert({id_employee, id_contract_custumer, description})
            .transacting(trx);
      });
      
      return res.status(200).send({message: 'Occorencia registada com sucesso'});
    }catch(err){
      //console.log(err);
      return res.status(400).send({error: 'Registration failed'});
    }
  }
}


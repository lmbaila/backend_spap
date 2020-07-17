
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('./../database/index');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const jwt1 = require('../auth');

module.exports = {
  async autheticate(req, res){
    const {user_name, password} = req.body;
    try{
      const user = await knex('users')
      .join('person', 'person.id_person','users.id_person')
       .select('users.id_user as id_user', 'password', 'name', 'surname', 'born_at', 'nr_document', 'gender')
      .where({user_name}).first();

      if(!user)
        return res.status(400).send({label: 'user_name', message: 'User not found'}); 
        

        if(await bcrypt.compare(password, user.password)){
          const access_token = jwt1.genereteToken(user.id_user);
          user.id_user =undefined;
          user.password =undefined;
          return res.status(200).json({access_token, user});
        }
      return res.status(400).send({label: 'password', message: 'password not found'});
    }catch(err){
      return res.status(400).send({error: err});
    }
  },
}
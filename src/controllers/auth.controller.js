
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const knex = require('./../database/index');
const authConfig = require('../config/auth.json');
const {generateToken} = require('../auth');
module.exports = {
  async autheticate(req, res){
    const {user_name, password} = req.body;
    try{
      const user = await knex('users')
      .join('person', 'person.id_person','users.id_person')
       .select('person.id_person', 'users.id_user as id_user', 'password', 'name', 'surname', 'born_at', 'nr_document', 'gender')
      .where({user_name}).first();
      
      if(!user)
        return res.send({message: 'User or password not valid!'}); 
        
        if(await bcrypt.compare(password, user.password)){
          const access_token = generateToken(user.id_user);
          user.id_user =undefined;
          user.password =undefined;
          return res.status(200).json({access_token, user});
        }
    }catch(err){
      return res.send({error: err});
    }
  },
}
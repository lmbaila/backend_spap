const authConfig = require('../config/auth.json');
const jwt = require('jsonwebtoken');
const knex = require('../database');
module.exports = {
   genereteToken(id_user){
      const id = id_user;
    const access_token = jwt.sign({id_user}, authConfig.secret, {expiresIn: '7 days',});
    return access_token;
  },
  async decodeToken(_token){
    const  token =_token.split(' ')[1];
      const payload = await jwt.decode(token, authConfig.secret); 
     return payload.id;
  }
}

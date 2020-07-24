const authConfig = require('../config/auth.json');
const jwt = require('jsonwebtoken');
const knex = require('../database');


async function decodeToken(_token){
    
  const token = _token.split(' ')[1];
  const payload =   jwt.decode(token, authConfig.secret); 
const user_data = await knex.table('employee').join('users', 'users.id_user','employee.id_user').where('users.id_user', payload.id).first();
 return user_data;
}

function generateToken(id_user){
    const access_token = jwt.sign({id_user}, authConfig.secret, {expiresIn: '7 days'});
    return access_token;
}
module.exports = {decodeToken, generateToken}




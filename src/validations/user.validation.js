const {Joi} = require('celebrate');

exports.create = {
  body: Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(8).max(30).required(),
    email: Joi.string().email(),
    first_name: Joi.string().min(2).max(75).required(),
    last_name: Joi.string().min(2).max(30).required(),
    phone_number: Joi.number().min(8).max(13).required()
  })
};

exports.login = {
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().min(8).max(30).required(),
    })
}
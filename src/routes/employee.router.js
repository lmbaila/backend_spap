const express = require('express');
const employee = require('../controllers/employee.controller');
const router = express.Router();
//const validadeUser = require('../validations/user.validation');
const { celebrate, Joi } = require('celebrate');
router.post('/create', employee.create);
module.exports = app => app.use('/employee', router);
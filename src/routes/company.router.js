const express = require('express');
const company = require('../controllers/company.controller');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');
router.post('/create', company.create);
module.exports = app => app.use('/company', router);
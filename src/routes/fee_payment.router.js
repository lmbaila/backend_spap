const express = require('express');
const fee_payment = require('../controllers/fee_payment.controller');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');
router.post('/create', fee_payment.create);
module.exports = app => app.use('/feepayment', router);
const express = require('express');
const fee_payment = require('../controllers/fee_payment.controller');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');

const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware);
router.post('/create', fee_payment.create);
router.put('/update', fee_payment.update);
module.exports = app => app.use('/feepayment', router);
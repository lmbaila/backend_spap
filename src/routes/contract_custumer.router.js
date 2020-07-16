const express = require('express');
const contract_custumer = require('../controllers/contract_custumer.controller');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const authMiddleware = require('../middlewares/auth.middleware');



router.use(authMiddleware);
router.post('/create', contract_custumer.create);
module.exports = app => app.use('/contract', router);
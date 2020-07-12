const express = require('express');
const custumer = require('../controllers/custumer.controller');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');
router.post('/create', custumer.create);
module.exports = app => app.use('/custumer', router);
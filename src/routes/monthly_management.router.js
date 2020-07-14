const express = require('express');
const monthly_management = require('../controllers/monthly_management.controller');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');
router.post('/create', monthly_management.create);
module.exports = app => app.use('/monthly', router);
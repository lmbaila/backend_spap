const express = require('express');
const invoice = require('../controllers/invoice.controller');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware);
router.post('/create', invoice.create);
module.exports = app => app.use('/invoice', router);
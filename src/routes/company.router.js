const express = require('express');
const company = require('../controllers/company.controller');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');

const authMiddleware = require('../middlewares/auth.middleware');
//router.use(authMiddleware);
router.post('/create', company.create);
router.get('/', company.index);
module.exports = app => app.use('/company', router);
const express = require('express');
const company = require('../controllers/company.controller');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');

const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create', company.create);
router.get('/', company.index);
router.use(authMiddleware);
router.get('/show', company.show);
module.exports = app => app.use('/company', router);
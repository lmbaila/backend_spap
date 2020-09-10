const express = require('express');
const monthly_management = require('../controllers/monthly_management.controller');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');


const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware);
router.post('/create', monthly_management.create);
router.get('/', monthly_management.index);
module.exports = app => app.use('/monthly', router);
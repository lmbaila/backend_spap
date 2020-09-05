const express = require('express');
const reading = require('../controllers/reading.controller');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');

const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware);
router.post('/create', reading.create);
router.get('/', reading.index);
module.exports = app => app.use('/reading', router);
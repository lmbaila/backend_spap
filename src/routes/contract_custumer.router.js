const express = require('express');
const contract_custumer = require('../controllers/contract_custumer.controller');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);
router.get('/', contract_custumer.index);
router.post('/create', contract_custumer.create);
router.delete('/delete', contract_custumer.delete);
router.put('/update', contract_custumer.update);
module.exports = app => app.use('/contract', router);
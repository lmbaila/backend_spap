const express = require('express');
const payment_invoice = require('../controllers/payment_invoice.controller');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware);
router.post('/create', payment_invoice.create);
module.exports = app => app.use('/payment_invoice', router);
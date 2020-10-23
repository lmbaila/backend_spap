const express = require('express');
const late_payment = require('../controllers/late_payment.controller');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware);
router.get('/latepayment/:id_invoice', late_payment.show);
module.exports = app => app.use('/payment_invoice', router); 
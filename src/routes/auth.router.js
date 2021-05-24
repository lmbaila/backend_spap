const express = require('express');
const auth = require('../controllers/auth.controller');
const router = express.Router();
router.post('/authenticate',  auth.autheticate); 

module.exports = app => app.use('/auth', router);

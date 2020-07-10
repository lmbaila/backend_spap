const express = require('express');
const auth = require('./../controllers/person.controller');
const router = express.Router();
router.post('/create', celebrate(validadeUser.create, {abortEarly:false, allowUnknown: true}), auth.create);

module.exports = app => app.use('/auth', router);

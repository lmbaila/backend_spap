const express = require('express');
const custumer_problem = require('../controllers/custumer_problem.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware);
router.post('/create', custumer_problem.create);
module.exports = app => app.use('/problem', router);
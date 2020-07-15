require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./routes/employee.router')(app);
require('./routes/company.router')(app);
require('./routes/custumer.router')(app);
require('./routes/fee_payment.router')(app);
require('./routes/contract_custumer.router')(app);
require('./routes/monthly_management.router')(app);
app.listen(3333, ()=>{console.log('server up')});


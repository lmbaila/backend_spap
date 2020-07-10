require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./routes/employee.router')(app);
app.listen(3333, ()=>{console.log('server up')});


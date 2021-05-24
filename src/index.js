require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
/*const corsOption = {
    origin: 'http://localhost:3000/',
    optionSuccessStatus: 200
}*/
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./routes/auth.router')(app);
require('./routes/employee.router')(app);
require('./routes/company.router')(app);
require('./routes/custumer.router')(app);
require('./routes/fee_payment.router')(app);
require('./routes/contract_custumer.router')(app);
require('./routes/monthly_management.router')(app);
require('./routes/reading.router')(app);
require('./routes/invoice.router')(app);
require('./routes/payment_invoice.router')(app);
require('./routes/late_payment.router')(app);
app.listen(process.env.PORT||3333, ()=>{console.log('server up')});


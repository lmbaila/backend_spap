require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./routes/auth.router')(app);
// require('./routes/product.router')(app);
// require('./routes/store.router')(app);
app.use(errors());
app.listen(process.env.PORT|| 3333);

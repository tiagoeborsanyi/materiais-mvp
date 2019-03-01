const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const item = require('./routes/item');

const app = express();

app.use('*', cors());

// default options
app.use(fileUpload());

// body parser middlaeware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db)
    .then(() => console.log('mongodb conectado'))
    .catch(err => console.log(err));

// rotas
app.use('/api/item', item);

app.listen(5000, () => console.log(`Server rodando na porta 5000`));
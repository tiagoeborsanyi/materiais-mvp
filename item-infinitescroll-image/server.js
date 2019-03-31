const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const http = require('http');
const https = require('https');
const fs    = require('fs');

const item = require('./routes/item');

const app = express();

require('dotenv').config();

const options = {
    key: fs.readFileSync("/etc/letsencrypt/archive/evsoul.com/privkey1.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/archive/evsoul.com/fullchain1.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/archive/evsoul.com/chain1.pem")
  };

app.use('*', cors());

app.use(express.static(path.join(__dirname, 'public')));

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

const server = http.createServer(app);
const httpsServer = https.createServer(options, app);

server.listen(5000, () => console.log(`Server rodando na porta 5000`));
httpsServer.listen(443, () => console.log(`Server rodando na porta 5000`));
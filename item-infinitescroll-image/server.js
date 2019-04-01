const express = require('express');
const forceSSL = require('express-force-ssl');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const http = require('http');
const https = require('https');
const fs    = require('fs');
const path = require('path');

const item = require('./routes/item');

const app = express();

require('dotenv').config();

const options = {
     key: fs.readFileSync("/etc/letsencrypt/archive/tiagoemerick.com/privkey1.pem"),
     cert: fs.readFileSync("/etc/letsencrypt/archive/tiagoemerick.com/fullchain1.pem"),
     ca: fs.readFileSync("/etc/letsencrypt/archive/tiagoemerick.com/chain1.pem")
   };

app.use('*', cors());

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'public/index.html'));
});

// default options
app.use(fileUpload());

// body parser middlaeware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(forceSSL);

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
//app.listen(5000, () => console.log(`Server rodando na porta 5000`));
server.listen(5000, () => console.log(`Server rodando na porta 5000`));
httpsServer.listen(443, () => console.log(`Server rodando na porta 5000`));

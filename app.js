const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/v1', require('./routes/index.js')); // ruteo

app.listen(3000, () => console.log('listening on 3000'));
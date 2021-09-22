const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const uri = require('./config').secret;
mongoose.connect(uri);

mongoose.set("debug", true);

require("./models/Usuario");
require("./models/Solicitud");

app.use(bodyParser.json());

require("./config/passport.js");

app.use('/v1', require('./routes/index.js')); // ruteo

app.listen(80, () => console.log('App listening on 80'));

module.exports = app;
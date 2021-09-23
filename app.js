if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const uri = require('./config').secret;
mongoose.connect(process.env.SECRET);

mongoose.set("debug", true);

require("./models/Usuario");
require("./models/Producto")
// require("./models/Solicitud");

app.use(bodyParser.json());

require("./config/passport.js");

app.use('/v1', require('./routes/index.js')); // ruteo

app.listen(process.env.PORT || 3000, () => console.log('App listening on 3000')); // habilitar para heroku

module.exports = app;
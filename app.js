if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // Habilitando el testeo local
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true});

mongoose.set("debug", true); // Habilitando logs en cada operación de Mongo

require("./models/Usuario");
require("./models/Producto");
require("./models/Venta");

app.use(bodyParser.json());

require("./config/passport.js");

app.use('/v1', require('./routes/index.js')); // ruteo

app.listen(process.env.PORT || 3000, () => console.log('App listening on 3000')); // habilitar para heroku

module.exports = app;
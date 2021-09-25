if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // Habilitando variables locales para testing
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set("debug", true); // Habilitando logs en cada operación de Mongo

require("./models/Usuario"); // Incluyendo los modelos de la aplicación
require("./models/Producto");
require("./models/Venta");

app.use(bodyParser.json()); // Librería para facilitar parsing de solicitudes

require("./config/passport.js"); // Incluyendo la estrategia de autenticación

app.use('/v1', require('./routes/index.js')); // Ruteo

app.listen(process.env.PORT || 3000, () => console.log('App listening on 3000')); // Variable requerida por Heroku

module.exports = app; // Para permitir el testing
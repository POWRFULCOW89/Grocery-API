const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const uri = "mongodb+srv://user:pass@address/database?retryWrites=true&w=majority";

mongoose.connect(uri);
mongoose.set("debug", true);

require("./models/Usuario");

app.use(bodyParser.json());

app.use('/v1', require('./routes/index.js')); // ruteo

app.listen(3000, () => console.log('listening on 3000'));
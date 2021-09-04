const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/v1', require('./routes/index.js')); // ruteo

// gods/:id
// req.params.id


// app.get('/constelaciones/:propiedad', (req, res) => {
//     const search = req.params.propiedad;

//     const cons = constelaciones[search] || constelacionesEntries.find( constelacion => constelacion[1]?.abreviatura === search)[1];

//     if (cons) res.send(cons);
//     else res.status(404).send('La constelación no existe');
// })

// app.post('/gods', (req, res) => {
//     const name = req.query.name;
//     const info = req.body;
//     gods[name] = info;
//     res.status(200).send(gods);
// })

// app.delete('/gods:name', (req, res) => {
//     const name = req.params.name;
//     delete gods[name];
//     res.send(gods);
// });

// app.get('/gods', (req, res) => {
//     res.send(gods);
// });

app.listen(3000, () => console.log('listening on 3000'));
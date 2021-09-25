// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const expect = chai.expect;
// const mongoose = require("mongoose");
// process.env.PORT = 4000
// const app = require('../app.js');

// const api = app // local testing
// // const api = 'https://proyectofinalback19.herokuapp.com'; // server testing

// const Venta = mongoose.model("Venta"); 
// const Producto = mongoose.model('Producto')
// const Usuario = mongoose.model('Usuario')

// const token = process.env.SAMPLE_TOKEN; // A previosly generated token to simplify testing
// const cod = "LLAL001"; // A sample product code
// const usuario = '614b99ba6db755b3e572456e';

// chai.use(chaiHttp); // para realizar peticiones a nuestra API

// function shuffle(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     }
//     return a;
// }

// Producto.find().then(prods => {

//     Usuario.find().then(users => {
//         let copyProds = prods.map(function(model) { return model.toObject(); })

//         for (let i = 0; i < users.length; i++) {
//             const user = users[i];
//             shuffle(copyProds)
            

//             let products =  (copyProds.slice(0, Math.floor(Math.random() * 10) + 1));
//             let sub = products.reduce((acum, val) => acum+=val.precio, 0);

//             let newSale = {
//                 "vendedor": user._id,
//                 // "productos": products.map((product) => product.codigo),
//                 "productos": products, 
//                 "cantidad": products.length,
//                 "subtotal": sub,
//                 "total": +(sub * 1.16).toFixed(2)

//             }

//             // console.log(newSale)

//             chai.request(api)
//             .post('/v1/ventas')
//             .set('content-type', 'application/json')
//             .auth(token, { type: 'bearer' })
//             .send(JSON.stringify(newSale))
//             .end((err, res) => {
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res).to.be.json;
//                 expect(res.body).to.have.property('_id');
//                 expect(res.body).to.have.property('createdAt');
//                 expect(res.body).to.have.property('updatedAt');

//                 // Venta.findById(res.body._id).then(venta => id = venta._id).catch(console.log);
//             });
//         }

//     });
// });
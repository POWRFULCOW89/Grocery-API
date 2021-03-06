const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoose = require("mongoose");
const app = require('../app.js');

const api = app // local testing
// const api = 'https://proyectofinalback19.herokuapp.com'; // server testing

const Venta = mongoose.model("Venta"); 

const token = process.env.SAMPLE_TOKEN; // A previosly generated token to simplify testing
const cod = "LLAL001"; // A sample product code
const usuario = '614b99ba6db755b3e572456e';

chai.use(chaiHttp); // para realizar peticiones a nuestra API

describe('Flujo de ventas', () => {
    beforeEach( async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    const n = Date.now(); // Generating a sample sale
    const nuevaVenta = {
        "vendedor": usuario,
        "productos": ["CSOL001", "CSOL002"],
        "cantidad": Math.floor(Math.random() * 10),
        "subtotal": Math.floor(Math.random() * 100),
        "total": Math.floor(Math.random() * 100)
    }

    it('should create a new sale', async () => {
        chai.request(api)
            .post('/v1/ventas')
            .set('content-type', 'application/json')
            .auth(token, { type: 'bearer' })
            .send(JSON.stringify(nuevaVenta))
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('createdAt');
                expect(res.body).to.have.property('updatedAt');

                Venta.findById(res.body._id).then(venta => id = venta._id).catch(console.log);
            });
    });

    it('should retrieve all sales', async () => {
        chai.request(api)
            .get('/v1/ventas')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.greaterThanOrEqual(1);
            });
    });

    it('should retrieve three sales', async () => {
        chai.request(api)
            .get('/v1/ventas?limit=3')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(3);
            });
    });

    it('should retrieve specific sales', async () => {
        chai.request(api)
            .get('/v1/ventas/' + id)
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('vendedor');
                expect(res.body).to.have.property('productos');
                expect(res.body.productos.length).to.be.greaterThanOrEqual(1);
                expect(res.body.cantidad).to.be.a('number');
                expect(res.body.subtotal).to.be.a('number');
                expect(res.body.total).to.be.a('number');
            });
    });

    // it('should edit a specified product',  async () => {
    //     chai.request(api)
    //         .put('/v1/productos/' + cod)
    //         .set('content-type', 'application/json')
    //         .auth(token, { type: 'bearer' })
    //         .send(JSON.stringify({
    //             nombre: nuevoProducto.nombre + " edited",
    //             categoria: nuevoProducto.categoria + " edited",
    //         }))
    //         .end((err, res) => {
    //             expect(err).to.be.null;
    //             expect(res).to.have.status(200);
    //             expect(res).to.be.json;
    //             expect(res.body).to.have.property('_id');
    //             expect(res.body).to.have.property('nombre');
    //             expect(res.body).to.have.property('categoria');
    //             expect(res.body).to.have.property('stock');
    //             expect(res.body).to.have.property('precio');
    //             expect(res.body).to.have.property('codigo');
    //             expect(res.body.nombre).to.equal(nuevoProducto.nombre + " edited");
    //             expect(res.body.categoria).to.equal(nuevoProducto.categoria + " edited");
    //         });
    // });

    it('should delete a specific sale',  async () => {
        chai.request(api)
            .delete('/v1/ventas/' + id)
            .set('content-type', 'application/json')
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('vendedor');
                expect(res.body).to.have.property('productos');
                expect(res.body.productos.length).to.be.greaterThanOrEqual(1);
                expect(res.body.cantidad).to.be.a('number');
                expect(res.body.subtotal).to.be.a('number');
                expect(res.body.total).to.be.a('number');

                Venta.findById(id).then(r => expect(r).to.be.null).catch(console.log);
            });
    });
})

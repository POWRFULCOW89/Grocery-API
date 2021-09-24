
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
const mongoose = require("mongoose");

const app = require('../app.js');

const api = app
// const api = 'https://proyectofinalback19.herokuapp.com';

// const Usuario = require("../models/Usuario");
const Producto = mongoose.model("Producto");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGE5NjhmZGViZjIzMjVhNDU2ZDQ3YiIsInVzZXJuYW1lIjoiZGllZ3VpdG8zIiwiZXhwIjoxNjM3NDY4MTE4LCJpYXQiOjE2MzIyODA1MTh9.Q4-tRMtlLOoVf8oUlYaVxxNQ2hE1gL5ptYAt0xVn_Z8";
const cod = "CSOL001";

chai.use(chaiHttp); // para realizar peticiones a nuestra API

describe('Flujo de producto', () => {
    beforeEach( async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // console.log("----------------------");
    });

    const n = Date.now();
    const nuevoProducto = {
        "nombre": `productname-${n}`,
        "categoria": `category-${n}`,
        "stock": Math.floor(Math.random() * 100),
        "precio": Math.floor(Math.random() * 100),
        "codigo": `COD${n}`
    }


    it('should create a new product', async () => {
        chai.request(api)
            // .post('v1/usuarios')
            .post('/v1/productos')
            .set('content-type', 'application/json')
            .auth(token, { type: 'bearer' })
            .send(JSON.stringify(nuevoProducto))
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('createdAt');
                expect(res.body).to.have.property('updatedAt');

                Producto.findOne({codigo: nuevoProducto.codigo}).then(prod => id = prod._id).catch(console.log);
            });
        
    });

    it('should retrieve all products', async () => {
        chai.request(api)
            .get('/v1/productos')
            // .set('content-type', 'application/json')
            // .auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.greaterThanOrEqual(1);
            });
    });

    it('should retrieve specific products', async () => {
        chai.request(api)
            .get('/v1/productos/' + cod)
            .set('content-type', 'application/json')
            // .auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('nombre');
                expect(res.body).to.have.property('categoria');
                expect(res.body).to.have.property('stock');
                expect(res.body).to.have.property('precio');
                expect(res.body).to.have.property('codigo');
                
            });
    });

    it('should edit a specified product',  async () => {

        chai.request(api)
            .put('/v1/productos/' + cod)
            .set('content-type', 'application/json')
            .auth(token, { type: 'bearer' })
            .send(JSON.stringify({
                nombre: nuevoProducto.nombre + " edited",
                cateogoria: nuevoProducto.categoria + " edited",
            }))
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('nombre');
                expect(res.body).to.have.property('categoria');
                expect(res.body).to.have.property('stock');
                expect(res.body).to.have.property('precio');
                expect(res.body).to.have.property('codigo');
            });
    });

    
    it('should delete a specific product',  async () => {

        chai.request(api)
            .delete('/v1/productos/' + nuevoProducto.codigo)
            .set('content-type', 'application/json')
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('nombre');
                expect(res.body).to.have.property('categoria');
                expect(res.body).to.have.property('stock');
                expect(res.body).to.have.property('precio');
                expect(res.body).to.have.property('codigo');
            });
    });

    
    
})


const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
const mongoose = require("mongoose");

const app = require('../app.js');

const api = app
// const api = 'https://proyectofinalback19.herokuapp.com';

// const Usuario = require("../models/Usuario");
const Usuario = mongoose.model("Usuario");

chai.use(chaiHttp); // para realizar peticiones a nuestra API

describe('Flujo de usuario', () => {
    beforeEach( async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("----------------------");
     });

    const n = Date.now();
    const nuevoUsuario = {
        "usuario": `test-${n}`,
        "nombre": `NameSurname-${n}`,
        "email": `mail${n}@test.com`,
        "rol": `admin`,
        "password": `password`
    }

    let token = undefined;
    let id = undefined;

    it('should create a new user', async () => {

        chai.request(api)
            // .post('v1/usuarios')
            .post('/v1/usuarios')
            .set('content-type', 'application/json')
            .send(JSON.stringify(nuevoUsuario))
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('username');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('token');
                // token = res.body.token;
                Usuario.findOne({email: nuevoUsuario.email}).then(user => id = user._id).catch(console.log);
            });
        
    });

    it('should login',  async () => {


        chai.request(api)
            // .post('v1/usuarios')
            .post('/v1/usuarios/login')
            .set('content-type', 'application/json')
            // .set({ Authorization: `Bearer ${token}` })
            .send(JSON.stringify({
                email: nuevoUsuario.email,
                password: nuevoUsuario.password
            }))
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('user');
                expect(res.body.user).to.have.property('username');
                expect(res.body.user).to.have.property('email');
                expect(res.body.user).to.have.property('token');
                token = res.body.user.token;
            });
    });

    it('should retrieve all users', async () => {

        chai.request(api)
            // .post('v1/usuarios')
            .get('/v1/usuarios')
            .set('content-type', 'application/json')
            // .set({ Authorization: `Bearer ${token}` })
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.greaterThanOrEqual(1);
            });
    });

    it('should retrieve three users', async () => {
        chai.request(api)
            .get('/v1/usuarios?limit=3')
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(3);
            });
    });

    it('should retrieve specific users', async () => {

        const user = "614a93e8a2f74c4ad3c838fe";
        
        chai.request(api)
            .get('/v1/usuarios/' + id)
            .set('content-type', 'application/json')
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('usuario');
                expect(res.body).to.have.property('nombre');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('rol');
                
            });
    });

    it('should edit the user profile',  async () => {

        chai.request(api)
            .put('/v1/usuarios/' + id)
            .set('content-type', 'application/json')
            .auth(token, { type: 'bearer' })
            .send(JSON.stringify({
                usuario: nuevoUsuario.usuario + " edited",
                nombre: nuevoUsuario.nombre + " edited",
                email: nuevoUsuario.email + " edited",
                rol: "cajero",
            }))
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('usuario');
                expect(res.body).to.have.property('nombre');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('rol');
            });
    });

    
    it('should delete the current user',  async () => {

        chai.request(api)
            .delete('/v1/usuarios/' + id)
            .set('content-type', 'application/json')
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('usuario');
                expect(res.body).to.have.property('nombre');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('rol');
            });
    });

    
    
})

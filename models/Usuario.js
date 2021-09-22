// class Usuario {
//     constructor(id, usuario, nombre, contraseña, rol){
//         this.id = id;
//         this.usuario = usuario;
//         this.nombre = nombre;
//         this.contraseña = contraseña;
//         this.rol = rol;
//     }
// }

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const SchemaUsuario = new mongoose.Schema({
    usuario: {type: String, required: [true, "El nombre de usuario debe ser único"], unique: true},
    nombre: {type: String, required: true},
    // contraseña: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    rol: {type: String, required: true, enum: ["admin", "cajero"]},
    hash: String,
    salt: String
}, {collection: "usuarios", timestamps: true});

// {type: mongoose.Schema.Types.ObjectId, ref: "Usuario"} para referenciar otro documento con otro schema

SchemaUsuario.plugin(uniqueValidator, {message: "Ya existe"});

SchemaUsuario.methods.publicData = function () {
    return {
        id: this.id,
        usuario: this.usuario,
        nombre: this.nombre,
        email: this.email,
        rol: this.rol
    }
}

SchemaUsuario.methods.createPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

SchemaUsuario.methods.validatePassword = function(password){
    const newHash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === newHash;
}

SchemaUsuario.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60); // permitir el token por 60 días

    return jwt.sign({
        id: this._id,
        username: this.usuario,
        exp: parseInt(exp.getTime() / 1000)
    }, secret);
}

SchemaUsuario.methods.toAuthJSON = function() {
    return {
        username: this.usuario,
        email: this.email,
        token: this.generateJWT()
    }
}

// module.exports = SchemaUsuario;
mongoose.model("Usuario", SchemaUsuario);
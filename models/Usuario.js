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

const SchemaUsuario = new mongoose.Schema({
    usuario: {type: String, required: true},
    nombre: {type: String, required: true},
    contraseña: {type: String, required: true},
    rol: {type: String, required: true, enum: ["admin", "cajero"]},

}, {collection: "usuarios", timestamps: true});

// {type: mongoose.Schema.Types.ObjectId, ref: "Usuario"} para referenciar otro documento con otro schema

SchemaUsuario.methods.publicData = () => {
    return {
        id: this.id,
        usuario: this.usuario,
        nombre: this.nombre,
        rol: this.rol
    }
}

// module.exports = SchemaUsuario;
mongoose.model("Usuario", SchemaUsuario);
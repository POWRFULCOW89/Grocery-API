// RETO1

const mongoose = require('mongoose');

const SchemaSolicitud = new mongoose.Schema({
    idMascota: {type: mongoose.Schema.Types.ObjectId, ref: "Mascota"},
    fechaDeCreacion: Date,
    idUsuarioAnunciante: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario"},
    idUsuarioSolicitante: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario"},
    estado: {type: String, enum: ["pendiente","disponible","adoptado"]},
    
}, {collection: "solicitudes", timestamps: true});

SchemaSolicitud.methods.publicData = () => {
    return {
        idMascota: this.idMascota,
        fechaDeCreacion: this.fechaDeCreacion,
        idUsuarioAnunciante: this.idUsuarioAnunciante,
        idUsuarioSolicitante: this.idUsuarioSolicitante,
        estado: this.estado
    }
}

mongoose.model("Solicitud", SchemaSolicitud);
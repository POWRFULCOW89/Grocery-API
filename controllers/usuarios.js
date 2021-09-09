// const Usuario = require('../models/Usuario');
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

const crearUsuario = (req, res, next) => {
    let usuario = new Usuario(req.body);
    usuario.save().then(doc => {
        res.status(200).send(doc)
    }).catch(next);
}

const obtenerUsuarios = (req, res, next) => {
    if (req.params.id) {
        console.log(req.params.is)
        Usuario.findById(req.params.id)
        .then(doc => res.send(doc))
        .catch(next);
    } else {
        Usuario.find() // return all
        .then(docs => res.send(docs))
        .catch(next);
    }
}

const modificarUsuario = (req, res, next) => {
    // let usuario = new Usuario(req.params.id, "juancho",'Juan Vega', "1234566", "cajero");
    // const modificaciones = req.body;
    // usuario = {...usuario, ...modificaciones};
    // res.status(200).send(usuario);

    // traer doc si existe
    Usuario.findById(req.params.id)
    .then(doc => {
        if(!doc){
            return res.sendStatus(404);
        } 
        
        let nuevaInfo = req.body; // Validación básica
        if (typeof nuevaInfo.nombre != "undefined"){
            doc.nombre = nuevaInfo.nombre;
        } else if (typeof nuevaInfo.usuario != "undefined"){
            doc.usuario = nuevaInfo.usuario;
        } else if (typeof nuevaInfo.contraseña != "undefined"){
            doc.contraseña = nuevaInfo.contraseña;
        } else if (typeof nuevaInfo.rol != "undefined"){
            doc.rol = nuevaInfo.rol;
        }

        // solo modifica parcialmente TODO: revisar
        doc.save().then(updated => res.status(200).json(updated.publicData())).catch(next);
    })
    .catch(next);
}

const eliminarUsuario = (req, res, next) => {
    Usuario.findByIdAndDelete(req.params.id)
    .then(r => res.status(200).send(`El usuario ${req.params.id} ha sido eliminado`))
    .catch(next);
}

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    modificarUsuario,
    eliminarUsuario,
}
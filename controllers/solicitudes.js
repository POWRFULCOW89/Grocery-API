// const Solicitud = require('../models/Solicitud');
const mongoose = require('mongoose');
const Solicitud = mongoose.model('Solicitud');

const crearSolicitud = (req, res, next) => {
    let solicitud = new Solicitud(req.body);
    solicitud.save().then(doc => {
        res.status(200).send(doc)
    }).catch(next);
}

const obtenerSolicitudes = (req, res, next) => {
    if (req.params.id) {
        console.log(req.params.is)
        Solicitud.findById(req.params.id)
        .then(doc => res.send(doc))
        .catch(next);
    } else {
        Solicitud.find() // return all
        .then(docs => res.send(docs))
        .catch(next);
    }
}

const modificarSolicitud = (req, res, next) => {
    // let solicitud = new Solicitud(req.params.id, "juancho",'Juan Vega', "1234566", "cajero");
    // const modificaciones = req.body;
    // solicitud = {...solicitud, ...modificaciones};
    // res.status(200).send(solicitud);

    // traer doc si existe
    Solicitud.findById(req.params.id)
    .then(doc => {
        if(!doc){
            return res.sendStatus(404);
        } 
        
        let nuevaInfo = req.body; // Validación básica
        if (typeof nuevaInfo.nombre != "undefined"){
            doc.nombre = nuevaInfo.nombre;
        } else if (typeof nuevaInfo.solicitud != "undefined"){
            doc.solicitud = nuevaInfo.solicitud;
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

const eliminarSolicitud = (req, res, next) => {
    Solicitud.findByIdAndDelete(req.params.id)
    .then(r => res.status(200).send(`La solicitud ${req.params.id} ha sido eliminado`))
    .catch(next);
}

const obtenerConteo = (req, res, next) => {
    Solicitud.aggregate([
        {
          '$match': {
            '_id': req.params.id,
          }
        }, {
          '$count': 'count'
        }, {
          '$group': {
            '_id': null, 
            'count': {
              '$sum': '$count'
            }
          }
        }
      ]).then(doc => res.send(doc)).catch(next);
}

module.exports = {
    crearSolicitud,
    obtenerSolicitudes,
    modificarSolicitud,
    eliminarSolicitud,
    obtenerConteo
}
const mongoose = require('mongoose');
const Producto = mongoose.model('Producto');
const {sanitizeJSON} = require('../util');

const crearProducto = (req, res, next) => {
    const producto = new Producto(req.body);
    producto.save()
    .then(prod => res.json(prod))
    .catch(next);
}

const obtenerProductos = (req, res, next) => {
    if (req.params.codigo){ // Si se buscó por id, devolver el registro
        Producto.findOne({codigo: req.params.codigo})
        .then(prod => {
            if (!prod) return res.sendStatus(404);
            else res.json(prod);
        })
        .catch(next);
    } else { // Si no se especificó un id, devolver todos los registros
        Producto.find()
        .then(prods => {
            if (!prods) return res.sendStatus(404);
            else res.send(prods);
        })
        .catch(next);
    }
}

const modificarProducto = (req, res, next) => {
    if (!req.body) res.status(400).send('No body provided');

    if (req.params.codigo){
        Producto.findOne({codigo: req.params.codigo})
        .then(prod => {
            if (!prod) return res.sendStatus(404);

            let nuevaInfo = sanitizeJSON(req.body);
            
            Object.assign(prod, nuevaInfo);

            prod.save()
            .then(updated => res.json(updated))
            .catch(next);
        })
        .catch(next);
    }

    else res.sendStatus(400);
}

const eliminarProducto = (req, res, next) => {
    Producto.findOneAndDelete({codigo: req.params.codigo})
    .then(r => res.json(r))
    .catch(next);
}

module.exports = {
    crearProducto,
    obtenerProductos,
    modificarProducto,
    eliminarProducto
}
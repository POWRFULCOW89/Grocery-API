const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const SchemaProducto = new mongoose.Schema({
    nombre: {type: String, required: [true, "Se debe incluir el nombre de producto"]},
    categoria: {type: String, required: [true, "Se debe incluir la categoría del producto"]},
    stock: {type: Number, required: [true, "Se debe incluir el stock del producto"]}, // Mover a inventario ?
    precio: {type: Number, required: [true, "Se debe incluir el precio del producto"]},
    codigo: {type: String, unique: true, required: [true, "Se debe incluir el código del producto"]}
}, {collection: "productos", timestamps: true})

SchemaProducto.plugin(uniqueValidator, {message: "Ya existe un producto con el código provisto"});

mongoose.model("Producto", SchemaProducto);
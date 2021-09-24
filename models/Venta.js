const mongoose = require('mongoose');

const SchemaVenta = new mongoose.Schema({
    vendedor: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: [true, 'Vendedor no fue especificado']},
    productos: {type: Array, required: [true, 'Añade al menos un producto']},
    cantidad: {type: Number, required: [true, "Se debe incluir la cantidad de productos"]},
    subtotal: {type: Number, required: [true, "Hace falta el subtotal"]},
    total: {type: Number, required: [true, "Se requiere incluir el total"]}
}, {collection: "ventas", timestamps: true})

mongoose.model("Venta", SchemaVenta);
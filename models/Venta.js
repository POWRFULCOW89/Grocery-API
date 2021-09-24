/* class Venta {
    constructor(id, productos, cantidad, subtotal, total){
        this.id = id;
        this.productos = productos;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
        this.total = total;
    }
} */

const mongoose = require('mongoose');

const SchemaVenta = new mongoose.Schema({
    vendedor: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: [true, 'Vendedor no fue especificado']},
    productos: {type: Object, required: [true, 'Añade al menos un producto']},
    cantidad: {type: Number, required: [true, "Se debe incluir la cantidad de productos"]},
    subtotal: {type: Number, required: [true, "Hace falta el subtotal"]},
    total: Number
}, {collection: "ventas", timestamps: true})

mongoose.model("Venta", SchemaVenta);
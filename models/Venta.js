class Venta {
    constructor(productos, cantidad, subtotal, total){
        this.productos = productos;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
        this.total = total;
    }
}

module.exports = Venta;
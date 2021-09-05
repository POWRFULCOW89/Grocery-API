class Venta {
    constructor(id, productos, cantidad, subtotal, total){
        this.id = id;
        this.productos = productos;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
        this.total = total;
    }
}

module.exports = Venta;
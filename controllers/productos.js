const Producto = require('../models/Producto');

const crearProducto = (req, res) => {
    const producto = new Producto(...req.body);
    res.status(200).send(producto);
}

const obtenerProductos = (req, res) => {
    const prod1 = new Producto("Sol", "Clara", 10, 19, "SOL001")
    const prod2 = new Producto("Bud Light", "Clara", 10, 29, "BUD001")

    res.send([prod1, prod2]);
}

const modificarProducto = (req, res) => {
    let prod = new Producto("Sol", "Clara", 10, 29, "SOL001")
    const modificaciones = req.body;
    prod = {...prod, ...modificaciones};
    res.status(200).send(prod);
}

const eliminarProducto = (req, res) => {
    res.status(200).send(`Producto ${req.params.id} eliminado`); // Eliminación simulada
}

module.exports = {
    crearProducto,
    obtenerProductos,
    modificarProducto,
    eliminarProducto
}
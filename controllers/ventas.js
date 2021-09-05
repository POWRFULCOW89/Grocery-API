const Venta = require('../models/Venta');

const crearVenta = (req, res) => {
    const venta = new Venta(...req.body);
    res.status(200).send(venta);
}

const obtenerVentas = (req, res) => {
    const venta1 = new Venta(["Bud Light", "Sol"], 2, 50, 55);
    const venta2 = new Venta(["Heineken", "Sol"], 4, 100, 110);
    const dummyVentas = [venta1, venta2];

    res.send(dummyVentas);
}

const modificarVenta = (req, res) => {
    let venta = new Venta(req.params.id, ["Sol"], 1, 20, 30);
    const modificaciones = req.body;
    venta = {...venta, ...modificaciones};
    res.status(200).send(venta);
}

const eliminarVenta = (req, res) => {
    res.status(200).send(`Venta ${req.params.id} eliminada`); // Eliminación simulada
}

module.exports = {
    crearVenta,
    obtenerVentas,
    modificarVenta,
    eliminarVenta
}
const Mascota = require('../models/Mascota');

const mascota = new Mascota(1, "Max", "perro", undefined, "Guapo", "Juan", "Veracruz");
const mascota2 = new Mascota(2, "Rex", "gato", undefined, "Flojo", "Monse", "Xalapa");
const mascotas = [mascota, mascota2];

const crearMascota = (req, res) => {
    const mascota = new Mascota(req.body);
    mascotas.push(mascota);
    res.status(200).send(mascota);
}

const obtenerMascotas = (req, res) => {
    res.send(mascotas);
}

const modificarMascota = (req, res) => {
    const mascota = mascotas.splice(req.params.id - 1, 1);
    const modificaciones = req.body;
    mascotas.push({...mascota, ...modificaciones});
    res.status(200).send(mascota);
}

const eliminarMascota = (req, res) => {
    mascotas.splice(req.params.id - 1, 1);
    res.status(200).send(`Mascota ${req.params.id} eliminado`);
}

module.exports = {
    crearMascota,
    obtenerMascotas,
    modificarMascota,
    eliminarMascota,
}
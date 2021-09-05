const Usuario = require('../models/Usuario');

const crearUsuario = (req, res) => {
    const usuario = new Usuario(...req.body);
    res.status(200).send(usuario);
}

const obtenerUsuarios = (req, res) => {
    const usuario = new Usuario(1, "juancho", "Juan Vega", "juanito123", "admin");
    const usuario2 = new Usuario(2, "juanast", "Juana Asturias", "asturitas", "cajero");
    res.send([usuario, usuario2]);
}

const modificarUsuario = (req, res) => {
    let usuario = new Usuario(req.params.id, "juancho",'Juan Vega', "1234566", "cajero");
    const modificaciones = req.body;
    usuario = {...usuario, ...modificaciones};
    res.status(200).send(usuario);
}

const eliminarUsuario = (req, res) => {
    res.status(200).send(`Usuario ${req.params.id} eliminado`);
}

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    modificarUsuario,
    eliminarUsuario,
}
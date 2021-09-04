const Usuario = require('../models/Usuario');

const crearUsuario = (req, res) => {
    const usuario = new Usuario(...req.body);
    res.status(200).send(usuario);
}

const obtenerUsuarios = (req, res) => {
    const usuario = new Usuario(1, "juancho",'Juan', 'Vega', 'juan@vega.com', 12345, "aqui", "1234566", "hola", undefined, "normal" );
    const usuario2 = new Usuario(2, "juanast", "Juana", "Asturias", "ast@vega.ast", 123456, "allá", "12568934", "soy yo", undefined, "anunciante");

    res.send([usuario, usuario2]);
}

const modificarUsuario = (req, res) => {
    let usuario = new Usuario(req.params.id, "juancho",'Juan', 'Vega', 'juan@vega.com', 12345, "aqui", "1234566", "hola", undefined, "normal" );
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
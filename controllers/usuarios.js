// const Usuario = require('../models/Usuario');
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const passport = require('passport');

const crearUsuario = (req, res, next) => {
    
    const body = req.body, password = body.password;

    delete body.password;

    const user = new Usuario(body);
    user.createPassword(password);
    user.save()
        .then( user => res.status(200).json(user.toAuthJSON()))
        .catch(next);
}

const obtenerUsuarios = (req, res, next) => {
    if (req?.params?.id){
        Usuario.findById(req?.params?.id)
            .then( user => {
                if (!user) return res.sendStatus(404);
                else res.json(user);
            })
            .catch(next);
    }
    
    else {
        Usuario.find()
            .then(docs => res.send(docs))
            .catch(next);
    } 
}
  
function modificarUsuario(req, res, next) {
    if(req.params.id){
        Usuario.findById(req.params.id)
            .then(user => {
                if (!user) return res.sendStatus(404); 
                let nuevaInfo = req.body;
    
                if (typeof nuevaInfo.usuario !== 'undefined') user.usuario = nuevaInfo.usuario;
                if (typeof nuevaInfo.nombre !== 'undefined') user.nombre = nuevaInfo.nombre;
                if (typeof nuevaInfo.email !== 'undefined') user.email = nuevaInfo.email;
                if (typeof nuevaInfo.rol !== 'undefined') user.rol = nuevaInfo.rol;
                if (typeof nuevaInfo.password !== 'undefined') {
                    user.createPassword(nuevaInfo.password);
                    user.save()
                        .then(updatedUser => res.status(201).json(updatedUser.publicData()))
                        .catch(next);
                }
                
                user.save()
                .then(updated => res.json(updated.publicData()))
                .catch(next);
        }).catch(next);
    } 
    
    else res.sendStatus(400);
}

function eliminarUsuario(req, res, next) {
    let { id } = req.params;
    // Usuario.findOneAndDelete({ _id: id }).then(r => {         //Buscando y eliminando usuario en MongoDB.
    //     res.send(r);
    // }).catch(next);

    Usuario.findByIdAndDelete(id)
    .then(r => res.send(r))
    .catch(next);
}


function iniciarSesion(req, res, next) {
    if (!req.body.email || ! req.body.password) {
      return res.status(422).json({ errors: { email: "no puede estar vacío" } });
    }
  
    passport.authenticate('local', { session: false }, function (err, user, info) {
      if (err) { return next(err); }
  
      if (user) {
        user.token = user.generateJWT();
        return res.json({ user: user.toAuthJSON() });
      } else {
        return res.status(422).json(info);
      }
    })(req, res, next);
  }

// const iniciarSesion

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    modificarUsuario,
    eliminarUsuario,
    iniciarSesion
}
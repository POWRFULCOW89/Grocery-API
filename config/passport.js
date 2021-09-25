const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require('mongoose');
const Usuario = mongoose.model("Usuario");

// Definiendo una estrategia de inicio de sesión con email y contraseña
passport.use('local', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
}, (email, password, next) => {
    Usuario.findOne({email: email})
    .then(user => {
        if (!user || !user.validatePassword(password)){
            return next(null, false, {
                error: "El email o la contraseña son incorrectos"
            });
        }
        return next(null, user)
    })
    .catch(next);
}));
const jwt = require("express-jwt");
const secret = process.env.MONGO_URI;

// Obtener el token de la cabecera de autorización
const getTokenFromHeader = req => {
    const authorization = req.headers.authorization;
    if (authorization && 
        (authorization.split(' ')[0] === 'Token' || authorization.split(' ')[0] === 'Bearer')){

        return authorization.split(' ')[1];
    }
}

// Definiendo distintos niveles de autorización
const auth = {
    requerido: jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'usuario',
        credentialsRequired: true,
        getToken: getTokenFromHeader
    }),
    opcional: jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'usuario',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    }),
}

module.exports = auth;
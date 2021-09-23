const router = require('express').Router();

router.get('/', (req, res) => {
    res.send(`Bienvenido a nuestra API. Revisa nuestra <a href="https://app.swaggerhub.com/apis/Bedu-Back-19/ProyectoFinalBack/1.0.0" target="_blank">documentación</a>.`);
})

router.use("/usuarios", require('./usuarios.js'));
router.use("/ventas", require('./ventas.js'));
router.use("/solicitudes", require('./solicitudes.js'));

module.exports = router;
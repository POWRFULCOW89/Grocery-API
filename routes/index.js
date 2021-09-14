const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Welcome to our API");
})

router.use("/usuarios", require('./usuarios.js'));
router.use("/ventas", require('./ventas.js'));
router.use("/solicitudes", require('./solicitudes.js'));

module.exports = router;
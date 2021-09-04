const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Welcome to our API");
})

router.use("/usuarios", require('./usuarios.js'));
router.use("/mascotas", require('./mascotas.js'));

module.exports = router;
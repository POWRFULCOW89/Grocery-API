const router = require('express').Router();

const {
    crearProducto,
    obtenerProductos,
    modificarProducto,
    eliminarProducto
} = require('../controllers/productos');

const auth = require("./auth");

router.get('/:codigo', obtenerProductos);
router.get('/', obtenerProductos);
router.post('/', auth.requerido, crearProducto);
router.put('/:codigo', auth.requerido, modificarProducto);
router.delete('/:codigo', auth.requerido, eliminarProducto);

module.exports = router;
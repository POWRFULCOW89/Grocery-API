const router = require('express').Router();

const {
    crearProducto,
    obtenerProductos,
    modificarProducto,
    eliminarProducto
} = require('../controllers/productos');

router.get('/:codigo', obtenerProductos);
router.get('/', obtenerProductos);
router.post('/', crearProducto);
router.put('/:codigo', modificarProducto);
router.delete('/:codigo', eliminarProducto);

module.exports = router;
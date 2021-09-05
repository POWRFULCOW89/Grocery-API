const router = require('express').Router();

const {
    crearVenta,
    obtenerVentas,
    modificarVenta,
    eliminarVenta
} = require('../controllers/ventas');

router.get('/', obtenerVentas);
router.post('/', crearVenta);
router.put('/:id', modificarVenta);
router.delete('/:id', eliminarVenta);

module.exports = router;
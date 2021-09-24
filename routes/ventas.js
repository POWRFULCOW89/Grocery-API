const router = require('express').Router();

const {
	crearVenta,
	obtenerVentas,
	eliminarVenta,
} = require('../controllers/ventas');

const auth = require('./auth');

router.get('/:idVenta', obtenerVentas);
router.get('/', obtenerVentas);
router.post('/', auth.requerido, crearVenta);
router.delete('/:idVenta', auth.requerido, eliminarVenta);

module.exports = router;

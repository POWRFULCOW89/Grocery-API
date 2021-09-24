const router = require('express').Router();

const {
	crearVenta,
	obtenerVentas,
	eliminarVenta,
} = require('../controllers/ventas');

router.get('/', obtenerVentas);
router.get('/:idVenta', obtenerVentas);

router.post('/', crearVenta);

router.delete('/:idVenta', eliminarVenta);

module.exports = router;

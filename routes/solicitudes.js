const router = require('express').Router();

const {
    crearSolicitud,
    obtenerSolicitudes,
    modificarSolicitud,
    eliminarSolicitud,
    obtenerConteo
} = require('../controllers/solicitudes');

router.get('/', obtenerSolicitudes);
router.get('/conteo/:id', obtenerConteo);
router.post('/', crearSolicitud);
router.put('/:id', modificarSolicitud);
router.delete('/:id', eliminarSolicitud);

module.exports = router;
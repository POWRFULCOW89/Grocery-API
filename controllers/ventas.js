const mongoose = require('mongoose');
const Venta = mongoose.model('Venta');

const crearVenta = (req, res, next) => {
	const venta = new Venta(req.body);
	venta.save()
	.then(venta => res.json(venta))
	.catch(next);
};

const obtenerVentas = (req, res, next) => {

	let limit = isNaN(parseInt(req?.query?.limit)) ? null : parseInt(req.query.limit);

	if (req.params.idVenta)
		Venta.findById(req.params.idVenta)
			.then(venta => {
				if (!venta) return res.sendStatus(404);
				else res.json(venta);
			})
			.catch(next);
	else {
		if (limit) { 
            Venta.aggregate([
                {
                  '$sample': {
                    'size': limit
                  }
                }
              ]).then(ventas => {
                if (!ventas) return res.sendStatus(404);
                else res.send(ventas);
              }).catch(next);
        }
		else Venta.find()
			.then(ventas => {
				if (!ventas) return res.sendStatus(404);
				else res.send(ventas);
			}) 
			.catch(next);
	}
};

const eliminarVenta = (req, res, next) => {
	Venta.findByIdAndDelete(req.params.idVenta)
		.then(r => res.json(r))
		.catch(next);
};

module.exports = {
	crearVenta,
	obtenerVentas,
	eliminarVenta,
};

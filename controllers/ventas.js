const mongoose = require('mongoose');
const Venta = mongoose.model('Venta');
const Usuario = mongoose.model('Usuario');

const crearVenta = (req, res, next) => {
	const venta = new Venta(req.body);
	Usuario.findById(venta.vendedor)
		.then(user => {
			if (user.rol === 'cajero') {
				venta
					.save()
					.then(venta => res.status(200).json(venta))
					.catch(next);
			} else  res.status(401).json();
		})
		.catch(next);
};

const obtenerVentas = (req, res, next) => {
	if (req.params.idVenta)
		Venta.findById(req.params.id)
			.then(venta => {
				if (!venta) return res.sendStatus(404);
				else res.json(venta);
			})
			.catch(next);
	else
		Venta.find()
			.then(ventas => res.send(ventas))
			.catch(next);
};

const eliminarVenta = (req, res, next) => {
	Venta.findByIdAndDelete(req.params.idVenta)
		.then(res.sendStatus(200))
		.catch(next);
};

module.exports = {
	crearVenta,
	obtenerVentas,
	eliminarVenta,
};

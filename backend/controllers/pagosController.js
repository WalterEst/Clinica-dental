const Pago = require('../models/pagosModel');

const getPagos = (req, res, next) => {
  Pago.getAll((err, data) => {
    if (err) return next(new Error('Error al obtener pagos'));
    res.json(data);
  });
};

const getPagoById = (req, res, next) => {
  Pago.getById(req.params.id, (err, data) => {
    if (err) return next(new Error('Error al obtener pago por ID'));
    res.json(data[0] || {});
  });
};

const createPago = (req, res, next) => {
  Pago.create(req.body, (err, result) => {
    if (err) return next(new Error('Error al agregar pago'));
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

const updatePago = (req, res, next) => {
  Pago.update(req.params.id, req.body, (err, result) => {
    if (err) return next(new Error('Error al actualizar pago'));
    res.json({ message: 'Pago actualizado correctamente' });
  });
};

const deletePago = (req, res, next) => {
  Pago.delete(req.params.id, (err, result) => {
    if (err) return next(new Error('Error al eliminar pago'));
    res.json({ message: 'Pago eliminado correctamente' });
  });
};

module.exports = {
  getPagos,
  getPagoById,
  createPago,
  updatePago,
  deletePago
};

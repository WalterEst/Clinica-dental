const Pago = require('../models/pagosModel');

//obtiene todos los pagos
const getPagos = (req, res, next) => {
  Pago.getAll((err, data) => {
    if (err) return next(new Error('Error al obtener pagos'));
    res.json(data);
  });
};

//obtiene un pago especifico
const getPagoById = (req, res, next) => {
  Pago.getById(req.params.id, (err, data) => {
    if (err) return next(new Error('Error al obtener pago por ID'));
    res.json(data[0] || {});
  });
};

//crea un pago
const createPago = (req, res, next) => {
  Pago.create(req.body, (err, result) => {
    if (err) return next(new Error('Error al agregar pago'));
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

//actualiza un pago
const updatePago = (req, res, next) => {
  Pago.update(req.params.id, req.body, (err, result) => {
    if (err) return next(new Error('Error al actualizar pago'));
    res.json({ message: 'Pago actualizado correctamente' });
  });
};

//elimina un pago
const deletePago = (req, res, next) => {
  Pago.delete(req.params.id, (err, result) => {
    if (err) return next(new Error('Error al eliminar pago'));
    res.json({ message: 'Pago eliminado correctamente' });
  });
};

//exporta las funciones
module.exports = {
  getPagos,
  getPagoById,
  createPago,
  updatePago,
  deletePago
};

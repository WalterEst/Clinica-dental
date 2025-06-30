const model = require('../models/pagoModel');

const getAllPagos = (req, res) => {
  model.getAllPagos((err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener pagos' });
    res.json(results);
  });
};

const getPagoById = (req, res) => {
  const id = req.params.id;
  model.getPagoById(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el pago' });
    if (result.length === 0) return res.status(404).json({ error: 'Pago no encontrado' });
    res.json(result[0]);
  });
};

const createPago = (req, res) => {
  const data = req.body;
  model.createPago(data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al registrar pago' });
    res.status(201).json({ id_pago: result.insertId, ...data });
  });
};

const getPagosByTratamientoId = (req, res) => {
  const id = req.params.id;
  model.getPagosByTratamientoId(id, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener pagos' });
    res.json(results);
  });
};

const updatePagoById = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  model.updatePagoById(id, data, (err, result) => {
    if (err) {
      console.error('Error al actualizar pago:', err);
      return res.status(500).json({ error: 'Error al actualizar pago' });
    }
    res.json({ message: 'Pago actualizado correctamente', id, ...data });
  });
};


const deletePagoById = (req, res) => {
  const id = req.params.id;
  model.deletePagoById(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar pago' });
    res.json({ message: 'Pago eliminado correctamente' });
  });
};

module.exports = {
  getAllPagos,
  getPagoById,
  createPago,
  getPagosByTratamientoId,
  updatePagoById,
  deletePagoById
};

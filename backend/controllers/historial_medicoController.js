const Historial = require('../models/historial_medicoModel');

//obtiene todos los historiales medicos
const getHistoriales = (req, res, next) => {
  Historial.getAll((err, data) => {
    if (err) return next(new Error('Error al obtener historial'));
    res.json(data);
  });
};

//obtiene un historial medico por id
const getHistorialById = (req, res, next) => {
  Historial.getById(req.params.id, (err, data) => {
    if (err) return next(new Error('Error al obtener historial por ID'));
    if (!data[0]) return next(new Error('Historial no encontrado'));
    res.json(data[0]);
  });
};

//crea un nuevo historial medico
const createHistorial = (req, res, next) => {
  Historial.create(req.body, (err, result) => {
    if (err) return next(new Error('Error al agregar historial'));
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

//actualiza un historial medico
const updateHistorial = (req, res, next) => {
  Historial.update(req.params.id, req.body, (err, result) => {
    if (err) return next(new Error('Error al actualizar historial'));
    if (result.affectedRows === 0) return next(new Error('Historial no encontrado para actualizar'));
    res.json({ message: 'Historial actualizado correctamente' });
  });
};

//elimina un historial
const deleteHistorial = (req, res, next) => {
  Historial.delete(req.params.id, (err, result) => {
    if (err) return next(new Error('Error al eliminar historial'));
    if (result.affectedRows === 0) return next(new Error('Historial no encontrado para eliminar'));
    res.json({ message: 'Historial eliminado correctamente' });
  });
};

module.exports = {
  getHistoriales,
  getHistorialById,
  createHistorial,
  updateHistorial,
  deleteHistorial
};

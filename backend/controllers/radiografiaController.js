const Radiografia = require('../models/radiografiaModel');

const getRadiografias = (req, res, next) => {
  Radiografia.getAll((err, data) => {
    if (err) return next(new Error('Error al obtener radiografías'));
    res.json(data);
  });
};

const getRadiografiaById = (req, res, next) => {
  Radiografia.getById(req.params.id, (err, data) => {
    if (err) return next(new Error('Error al obtener radiografía por ID'));
    res.json(data[0] || {});
  });
};

const createRadiografia = (req, res, next) => {
  Radiografia.create(req.body, (err, result) => {
    if (err) return next(new Error('Error al agregar radiografía'));
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

const updateRadiografia = (req, res, next) => {
  Radiografia.update(req.params.id, req.body, (err, result) => {
    if (err) return next(new Error('Error al actualizar radiografía'));
    res.json({ message: 'Radiografía actualizada correctamente' });
  });
};

const deleteRadiografia = (req, res, next) => {
  Radiografia.delete(req.params.id, (err, result) => {
    if (err) return next(new Error('Error al eliminar radiografía'));
    res.json({ message: 'Radiografía eliminada correctamente' });
  });
};

module.exports = {
  getRadiografias,
  getRadiografiaById,
  createRadiografia,
  updateRadiografia,
  deleteRadiografia
};

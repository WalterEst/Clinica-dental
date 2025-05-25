const Tratamiento = require('../models/tratamientoModel');

const getTratamientos = (req, res, next) => {
  Tratamiento.getAll((err, data) => {
    if (err) return next(new Error('Error al obtener tratamientos'));
    res.json(data);
  });
};

const getTratamientoById = (req, res, next) => {
  Tratamiento.getById(req.params.id, (err, data) => {
    if (err) return next(new Error('Error al obtener tratamiento por ID'));
    res.json(data[0] || {});
  });
};

const createTratamiento = (req, res, next) => {
  Tratamiento.create(req.body, (err, result) => {
    if (err) return next(new Error('Error al agregar tratamiento'));
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

const updateTratamiento = (req, res, next) => {
  Tratamiento.update(req.params.id, req.body, (err, result) => {
    if (err) return next(new Error('Error al actualizar tratamiento'));
    res.json({ message: 'Tratamiento actualizado correctamente' });
  });
};

const deleteTratamiento = (req, res, next) => {
  Tratamiento.delete(req.params.id, (err, result) => {
    if (err) return next(new Error('Error al eliminar tratamiento'));
    res.json({ message: 'Tratamiento eliminado correctamente' });
  });
};

module.exports = {
  getTratamientos,
  getTratamientoById,
  createTratamiento,
  updateTratamiento,
  deleteTratamiento
};

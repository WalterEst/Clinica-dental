const Radiografia = require('../models/radiografiaModel');

//obtiene las radiografia
const getRadiografias = (req, res, next) => {
  Radiografia.getAll((err, data) => {
    if (err) return next(new Error('Error al obtener radiografías'));
    res.json(data);
  });
};

//obtiene una radiografia especifica
const getRadiografiaById = (req, res, next) => {
  Radiografia.getById(req.params.id, (err, data) => {
    if (err) return next(new Error('Error al obtener radiografía por ID'));
    res.json(data[0] || {});
  });
};

//crea un registro de una radiografia
const createRadiografia = (req, res, next) => {
  Radiografia.create(req.body, (err, result) => {
    if (err) return next(new Error('Error al agregar radiografía'));
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

//actualiza un registro de una radiografia
const updateRadiografia = (req, res, next) => {
  Radiografia.update(req.params.id, req.body, (err, result) => {
    if (err) return next(new Error('Error al actualizar radiografía'));
    res.json({ message: 'Radiografía actualizada correctamente' });
  });
};

//elimina el registro de una radiografia
const deleteRadiografia = (req, res, next) => {
  Radiografia.delete(req.params.id, (err, result) => {
    if (err) return next(new Error('Error al eliminar radiografía'));
    res.json({ message: 'Radiografía eliminada correctamente' });
  });
};

//exporta las funciones
module.exports = {
  getRadiografias,
  getRadiografiaById,
  createRadiografia,
  updateRadiografia,
  deleteRadiografia
};

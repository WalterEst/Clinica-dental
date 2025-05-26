const Personal = require('../models/personalModel');

//obtiene todo el personal
const getPersonal = (req, res, next) => {
  Personal.getAll((err, data) => {
    if (err) return next(new Error('Error al obtener personal'));
    res.json(data);
  });
};

//obtiene un personal por id
const getPersonalById = (req, res, next) => {
  Personal.getById(req.params.id, (err, data) => {
    if (err) return next(new Error('Error al obtener personal por ID'));
    res.json(data[0] || {});
  });
};

//crea un nuevo personal
const createPersonal = (req, res, next) => {
  Personal.create(req.body, (err, result) => {
    if (err) return next(new Error('Error al agregar personal'));
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

//actualiza un personal
const updatePersonal = (req, res, next) => {
  Personal.update(req.params.id, req.body, (err, result) => {
    if (err) return next(new Error('Error al actualizar personal'));
    res.json({ message: 'Personal actualizado correctamente' });
  });
};

//elimina un personal
const deletePersonal = (req, res, next) => {
  Personal.delete(req.params.id, (err, result) => {
    if (err) return next(new Error('Error al eliminar personal'));
    res.json({ message: 'Personal eliminado correctamente' });
  });
};

//exporta las funciones
module.exports = {
  getPersonal,
  getPersonalById,
  createPersonal,
  updatePersonal,
  deletePersonal
};

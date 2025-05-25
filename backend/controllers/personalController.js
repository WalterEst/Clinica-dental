const Personal = require('../models/personalModel');

const getPersonal = (req, res, next) => {
  Personal.getAll((err, data) => {
    if (err) return next(new Error('Error al obtener personal'));
    res.json(data);
  });
};

const getPersonalById = (req, res, next) => {
  Personal.getById(req.params.id, (err, data) => {
    if (err) return next(new Error('Error al obtener personal por ID'));
    res.json(data[0] || {});
  });
};

const createPersonal = (req, res, next) => {
  Personal.create(req.body, (err, result) => {
    if (err) return next(new Error('Error al agregar personal'));
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

const updatePersonal = (req, res, next) => {
  Personal.update(req.params.id, req.body, (err, result) => {
    if (err) return next(new Error('Error al actualizar personal'));
    res.json({ message: 'Personal actualizado correctamente' });
  });
};

const deletePersonal = (req, res, next) => {
  Personal.delete(req.params.id, (err, result) => {
    if (err) return next(new Error('Error al eliminar personal'));
    res.json({ message: 'Personal eliminado correctamente' });
  });
};

module.exports = {
  getPersonal,
  getPersonalById,
  createPersonal,
  updatePersonal,
  deletePersonal
};

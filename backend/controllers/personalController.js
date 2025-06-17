const Personal = require('../models/personalModel');

const getPersonal = (req, res, next) => {
  Personal.getAll((err, data) => {
    if (err) {
      console.error('Error al obtener personal:', err);
      return next(err);
    }
    res.json(data);
  });
};

const getDoctores = (req, res, next) => {
  Personal.getDoctores((err, data) => {
    if (err) {
      console.error('Error al obtener doctores:', err);
      return next(err);
    }
    res.json(data);
  });
};

const getPersonalById = (req, res, next) => {
  Personal.getById(req.params.id, (err, data) => {
    if (err) {
      console.error('Error al obtener personal por ID:', err);
      return next(err);
    }
    res.json(data[0] || {});
  });
};

const createPersonal = (req, res, next) => {
  console.log('Datos recibidos en controlador:', req.body);

  Personal.create(req.body, (err, result) => {
    if (err) {
      console.error('Error al agregar personal:', err);
      return next(err);
    }
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

const updatePersonal = (req, res, next) => {
  Personal.update(req.params.id, req.body, (err, result) => {
    if (err) {
      console.error('Error al actualizar personal:', err);
      return next(err);
    }
    res.json({ message: 'Personal actualizado correctamente' });
  });
};

const deletePersonal = (req, res, next) => {
  Personal.delete(req.params.id, (err, result) => {
    if (err) {
      console.error('Error al eliminar personal:', err);
      return next(err);
    }
    res.json({ message: 'Personal eliminado correctamente' });
  });
};

module.exports = {
  getPersonal,
  getPersonalById,
  createPersonal,
  updatePersonal,
  deletePersonal,
  getDoctores
};

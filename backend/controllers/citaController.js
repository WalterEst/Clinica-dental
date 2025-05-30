const Cita = require('../models/citaModel');

//obtiene todas las citas
const getCitas = (req, res, next) => {
  Cita.getAll((err, data) => {
    if (err) return next(new Error('Error al obtener citas'));
    res.json(data);
  });
};

//obtiene una cita especifica
const getCitaById = (req, res, next) => {
  Cita.getById(req.params.id, (err, data) => {
    if (err) return next(new Error('Error al obtener citas por ID'));
    if (!data[0]) return next(new Error('Cita no encontrada'));
    res.json(data[0]);
  });
};

//crea una cita
const createCita = (req, res, next) => {
  Cita.create(req.body, (err, result) => {
    if (err) return next(new Error('Error al agregar citas'));
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

//actualiza una cita
const updateCita = (req, res, next) => {
  Cita.update(req.params.id, req.body, (err, result) => {
    if (err) return next(new Error('Error al actualizar Cita'));
    if (result.affectedRows === 0) return next(new Error('Cita no encontrada para actualizar'));
    res.json({ message: 'Cita actualizada correctamente' });
  });
};

//elimina una cita
const deleteCita = (req, res, next) => {
  Cita.delete(req.params.id, (err, result) => {
    if (err) return next(new Error('Error al eliminar Cita'));
    if (result.affectedRows === 0) return next(new Error('Cita no encontrada para eliminar'));
    res.json({ message: 'Cita eliminada correctamente' });
  });
};

//exporta las funciones
module.exports = {
  getCitas,
  getCitaById,
  createCita,
  updateCita,
  deleteCita
};

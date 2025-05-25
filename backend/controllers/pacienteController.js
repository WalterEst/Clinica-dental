const Paciente = require('../models/pacienteModel');

const getAllPacientes = (req, res, next) => {
  Paciente.getAll((err, data) => {
    if (err) return next(new Error('Error al obtener pacientes'));
    res.json(data);
  });
};

const getPacienteById = (req, res, next) => {
  Paciente.getById(req.params.id, (err, data) => {
    if (err) return next(new Error('Error al buscar paciente'));
    if (!data[0]) return next(new Error('Paciente no encontrado'));
    res.json(data[0]);
  });
};

const createPaciente = (req, res, next) => {
  Paciente.create(req.body, (err, result) => {
    if (err) return next(new Error('Error al agregar paciente'));
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

const updatePaciente = (req, res, next) => {
  Paciente.update(req.params.id, req.body, (err, result) => {
    if (err) return next(new Error('Error al actualizar paciente'));
    if (result.affectedRows === 0) return next(new Error('Paciente no encontrado para actualizar'));
    res.json({ message: 'Paciente actualizado correctamente' });
  });
};

const deletePaciente = (req, res, next) => {
  Paciente.delete(req.params.id, (err, result) => {
    if (err) return next(new Error('Error al eliminar paciente'));
    if (result.affectedRows === 0) return next(new Error('Paciente no encontrado para eliminar'));
    res.json({ message: 'Paciente eliminado correctamente' });
  });
};

module.exports = {
  getAllPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente
};

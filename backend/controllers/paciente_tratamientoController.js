const PacienteTratamiento = require('../models/paciente_tratamientoModel');

//obtiene todos los tratamientos por paciente
const getPacienteTratamientos = (req, res, next) => {
  PacienteTratamiento.getAll((err, data) => {
    if (err) return next(new Error('Error al obtener tratamientos del paciente'));
    res.json(data);
  });
};

//obtiene un tratamiento por especifico
const getPacienteTratamientoById = (req, res, next) => {
  PacienteTratamiento.getById(req.params.id, (err, data) => {
    if (err) return next(new Error('Error al obtener tratamiento del paciente por ID'));
    if (!data[0]) return next(new Error('Tratamiento no encontrado'));
    res.json(data[0]);
  });
};

//crea un nuevo tratamiento para un paciente
const createPacienteTratamiento = (req, res, next) => {
  PacienteTratamiento.create(req.body, (err, result) => {
    if (err) return next(new Error('Error al agregar tratamiento al paciente'));
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

//actualiza un tratamiento de un paciente
const updatePacienteTratamiento = (req, res, next) => {
  PacienteTratamiento.update(req.params.id, req.body, (err, result) => {
    if (err) return next(new Error('Error al actualizar tratamiento del paciente'));
    if (result.affectedRows === 0) return next(new Error('Tratamiento no encontrado para actualizar'));
    res.json({ message: 'Tratamiento actualizado correctamente' });
  });
};

//elimina un tratamiento de un paciente
const deletePacienteTratamiento = (req, res, next) => {
  PacienteTratamiento.delete(req.params.id, (err, result) => {
    if (err) return next(new Error('Error al eliminar tratamiento del paciente'));
    if (result.affectedRows === 0) return next(new Error('Tratamiento no encontrado para eliminar'));
    res.json({ message: 'Tratamiento eliminado correctamente' });
  });
};

//exporta las funciones
module.exports = {
  getPacienteTratamientos,
  getPacienteTratamientoById,
  createPacienteTratamiento,
  updatePacienteTratamiento,
  deletePacienteTratamiento
};

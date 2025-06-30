const model = require('../models/paciente-tratamientoModel');

const getAllPacienteTratamientos = (req, res) => {
  model.getAllPacienteTratamientos((err, results) => {
    if (err) {
      console.error('Error al obtener tratamientos:', err);
      return res.status(500).json({ error: 'Error al obtener tratamientos' });
    }
    res.json(results);
  });
};

const createPacienteTratamiento = (req, res) => {
  const data = req.body;
  model.createPacienteTratamiento(data, (err, result) => {
    if (err) {
      console.error('Error al crear tratamiento:', err);
      return res.status(500).json({ error: 'Error al crear tratamiento' });
    }
    res.status(201).json({ id: result.insertId, ...data });
  });
};


const getPacienteTratamientosByRut = (req, res) => {
  const rut = req.params.rut;
  model.getPacienteTratamientosByRut(rut, (err, results) => {
    if (err) {
      console.error('Error al obtener tratamientos:', err);
      return res.status(500).json({ error: 'Error al obtener tratamientos' });
    }
    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'No se encontraron tratamientos para este paciente' });
    }
    res.json(results);
  });
};

const updatePacienteTratamientoById = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  model.updatePacienteTratamientoById(id, data, (err, result) => {
    if (err) {
      console.error('Error al actualizar tratamiento:', err);
      return res.status(500).json({ error: 'Error al actualizar tratamiento' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tratamiento no encontrado para actualizar' });
    }
    res.json({ message: 'Tratamiento actualizado correctamente', id, ...data });
  });
};

const deletePacienteTratamientoById = (req, res) => {
  const id = req.params.id;
  model.deletePacienteTratamientoById(id, (err, result) => {
    if (err) {
      console.error('Error al eliminar tratamiento:', err);
      return res.status(500).json({ error: 'Error al eliminar tratamiento' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tratamiento no encontrado para eliminar' });
    }
    res.json({ message: 'Tratamiento eliminado correctamente' });
  });
};

module.exports = {
  getAllPacienteTratamientos,
  createPacienteTratamiento,
  getPacienteTratamientosByRut,
  updatePacienteTratamientoById,
  deletePacienteTratamientoById
};

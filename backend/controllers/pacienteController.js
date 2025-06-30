const model = require('../models/pacienteModel');

const getAllPaciente = (req, res) => {
  const callback = (err, results) => {
    if (err) {
      console.error('Error al obtener paciente:', err);
      return res.status(500).json({ error: 'Error al obtener paciente' });
    }
    res.json(results);
  };

  model.getAllPaciente(callback);  // <-- Función correcta
};

const createPaciente = (req, res) => {
  const data = req.body;
  const callback = (err, result) => {
    if (err) {
      console.error('Error al insertar paciente:', err);
      return res.status(500).json({ error: 'Error al insertar paciente' });
    }
    res.status(201).json({ id: result.insertId, ...data });
  };

  model.createPaciente(data, callback);
};

const getPacienteByRut = (req, res) => {
  const rut = req.params.rut;

  model.getPacienteByRut(rut, (err, result) => {
    if (err) {
      console.error('Error al obtener paciente por RUT:', err);
      return res.status(500).json({ error: 'Error al obtener paciente por RUT' });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'paciente no encontrado' });
    }

    res.json(result[0]);  // si esperas un solo resultado
  });
};


const updatePaciente = (req, res) => {
  const rut = req.params.rut;  // <- se usará rut, no id
  const data = req.body;

  const callback = (err, result) => {
    if (err) {
      console.error('Error al actualizar paciente:', err);
      return res.status(500).json({ error: 'Error al actualizar paciente' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'paciente no encontrado para actualizar' });
    }
    res.json({ message: 'paciente actualizado correctamente', rut, ...data });
  };

  model.updatePacienteByRut(rut, data, callback);  // función del modelo corregida más abajo
};


const deletePaciente = (req, res) => {
  const rut = req.params.rut;

  model.deletePaciente(rut, (err, result) => {
    if (err) {
      console.error('Error al eliminar paciente:', err);
      return res.status(500).json({ error: 'Error al eliminar paciente' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'paciente no encontrado para eliminar' });
    }
    res.json({ message: 'paciente eliminado correctamente' });
  });
};


module.exports = {
  getAllPaciente, 
  createPaciente,
  getPacienteByRut,
  updatePaciente, 
  deletePaciente
};

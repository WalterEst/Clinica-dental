const model = require('../models/historial-medicoModel');

const getAllHistorialMedico = (req, res) => {
  const callback = (err, results) => {
    if (err) {
      console.error('Error al obtener Historial:', err);
      return res.status(500).json({ error: 'Error al obtener Historial' });
    }
    res.json(results);
  };

  model.getAllHistorialMedico(callback);
};

const createHistorialMedico = (req, res) => {
  const data = req.body;

  const callback = (err, result) => {
    if (err) {
      console.error('Error al insertar Historial:', err);
      return res.status(500).json({ error: 'Error al insertar Historial' });
    }
    res.status(201).json({ id: result.insertId, ...data });
  };

  model.createHistorialMedico(data, callback);
};

const getHistorialByPacienteRut = (req, res) => {
  const rut = req.params.rut;

  const callback = (err, result) => {
    if (err) {
      console.error('Error al obtener Historial por RUT:', err);
      return res.status(500).json({ error: 'Error al obtener Historial por RUT' });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'Historial no encontrado' });
    }

    res.json(result); 
  };

  model.getHistorialByPacienteRut(rut, callback);
};


const updateHistorialByPacienteRut = (req, res) => {
  const rut = req.params.rut;
  const data = req.body;

  const callback = (err, result) => {
    if (err) {
      console.error('Error al actualizar Historial:', err);
      return res.status(500).json({ error: 'Error al actualizar Historial' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Historial no encontrado para actualizar' });
    }
    res.json({ message: 'Historial actualizado correctamente', rut, ...data });
  };

  model.updateHistorialByPacienteRut(rut, data, callback);
};

const deleteHistorialMedico = (req, res) => {
  const id = req.params.id;
  console.log('Intentando eliminar historial con ID:', id);

  const callback = (err, result) => {
    if (err) {
      console.error('Error al eliminar Historial:', err);
      return res.status(500).json({ error: 'Error al eliminar Historial', details: err.message });
    }
    if (result.affectedRows === 0) {
      console.log('No se encontró historial para eliminar con id:', id);
      return res.status(404).json({ error: 'Historial no encontrado para eliminar' });
    }
    console.log('Historial eliminado correctamente, id:', id);
    res.json({ message: 'Historial eliminado correctamente' });
  };

  // Usar el nombre correcto del modelo:
  model.deleteHistorialMedico(id, callback);
};

const getHistorialMedicoById = (req, res) => {
  const id = req.params.id;

  const callback = (err, result) => {
    if (err) {
      console.error('Error al obtener historial por ID:', err);
      return res.status(500).json({ error: 'Error al obtener historial por ID' });
    }
    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'Historial no encontrado' });
    }
    res.json(result[0]); // Solo un objeto
  };

  model.getHistorialMedicoById(id, callback);
};

const updateHistorialMedicoById = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const callback = (err, result) => {
    if (err) {
      console.error('Error al actualizar historial:', err);
      return res.status(500).json({ error: 'Error al actualizar historial' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Historial no encontrado para actualizar' });
    }
    res.json({ message: 'Historial actualizado correctamente', id, ...data });
  };

  model.updateHistorialMedicoById(id, data, callback);
};



module.exports = {
  getAllHistorialMedico, 
  createHistorialMedico,
  getHistorialByPacienteRut,
  updateHistorialByPacienteRut, 
  deleteHistorialMedico,
  getHistorialMedicoById,
  updateHistorialMedicoById,
};

const model = require('../models/citaModel');

const getAllCita = (req, res) => {
  const callback = (err, results) => {
    if (err) {
      console.error('Error al obtener Cita:', err);
      return res.status(500).json({ error: 'Error al obtener Cita' });
    }
    res.json(results);
  };

  model.getAllCita(callback);  // <-- Función correcta
};

const createCita = (req, res) => {
  const data = req.body;
  const callback = (err, result) => {
    if (err) {
      console.error('Error al insertar Cita:', err);
      return res.status(500).json({ error: 'Error al insertar Cita' });
    }
    res.status(201).json({ id: result.insertId, ...data });
  };

  model.createCita(data, callback);
};

const getCitaByid = (req, res) => {
  const id = req.params.id;

  model.getCitaByid(id, (err, result) => {
    if (err) {
      console.error('Error al obtener Cita por id:', err);
      return res.status(500).json({ error: 'Error al obtener Cita por id' });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'Cita no encontrado' });
    }

    res.json(result[0]);  // si esperas un solo resultado
  });
};


const updateCita = (req, res) => {
  const id = req.params.id;  // <- se usará id, no id
  const data = req.body;

  const callback = (err, result) => {
    if (err) {
      console.error('Error al actualizar Cita:', err);
      return res.status(500).json({ error: 'Error al actualizar Cita' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cita no encontrado para actualizar' });
    }
    res.json({ message: 'Cita actualizado correctamente', id, ...data });
  };

  model.updateCitaByid(id, data, callback);  // función del modelo corregida más abajo
};


const deleteCita = (req, res) => {
  const id = req.params.id;

  model.deleteCita(id, (err, result) => {
    if (err) {
      console.error('Error al eliminar Cita:', err);
      return res.status(500).json({ error: 'Error al eliminar Cita' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cita no encontrado para eliminar' });
    }
    res.json({ message: 'Cita eliminado correctamente' });
  });
};


module.exports = {
  getAllCita,
  createCita, 
  getCitaByid,
  updateCita,
  deleteCita
};

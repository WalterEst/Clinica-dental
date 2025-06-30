const model = require('../models/personalModel');

const getAllPersonal = (req, res) => {
  const callback = (err, results) => {
    if (err) {
      console.error('Error al obtener personal:', err);
      return res.status(500).json({ error: 'Error al obtener personal' });
    }
    res.json(results);
  };

  model.getAllPersonal(callback);  // <-- Función correcta
};

const createPersonal = (req, res) => {
  const data = req.body;
  const callback = (err, result) => {
    if (err) {
      console.error('Error al insertar personal:', err);
      return res.status(500).json({ error: 'Error al insertar personal' });
    }
    res.status(201).json({ id: result.insertId, ...data });
  };

  model.createPersonal(data, callback);
};

const getPersonalByRut = (req, res) => {
  const rut = req.params.rut;

  model.getPersonalByRut(rut, (err, result) => {
    if (err) {
      console.error('Error al obtener personal por RUT:', err);
      return res.status(500).json({ error: 'Error al obtener personal por RUT' });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'Personal no encontrado' });
    }

    res.json(result[0]);  // si esperas un solo resultado
  });
};


const updatePersonal = (req, res) => {
  const rut = req.params.rut;  // <- se usará rut, no id
  const data = req.body;

  const callback = (err, result) => {
    if (err) {
      console.error('Error al actualizar personal:', err);
      return res.status(500).json({ error: 'Error al actualizar personal' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Personal no encontrado para actualizar' });
    }
    res.json({ message: 'Personal actualizado correctamente', rut, ...data });
  };

  model.updatePersonalByRut(rut, data, callback);  // función del modelo corregida más abajo
};


const deletePersonal = (req, res) => {
  const rut = req.params.rut;

  model.deletePersonal(rut, (err, result) => {
    if (err) {
      console.error('Error al eliminar personal:', err);
      return res.status(500).json({ error: 'Error al eliminar personal' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Personal no encontrado para eliminar' });
    }
    res.json({ message: 'Personal eliminado correctamente' });
  });
};


module.exports = {
  getAllPersonal,
  createPersonal, 
  getPersonalByRut,
  updatePersonal,
  deletePersonal
};

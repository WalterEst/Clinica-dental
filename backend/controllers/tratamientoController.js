const model = require('../models/tratamientoModel');


const getAllTratamientos = (req, res) => {
  model.getAllTratamientos((err, results) => {
    if (err) {
      console.error('Error al obtener tratamientos:', err);
      return res.status(500).json({ error: 'Error al obtener tratamientos' });
    }
    res.json(results);
  });
};

const getTratamientoById = (req, res) => {
  const id = req.params.id;

  model.getTratamientoById(id, (err, results) => {
    if (err) {
      console.error('Error al obtener tratamiento por id:', err);
      return res.status(500).json({ error: 'Error al obtener tratamiento' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Tratamiento no encontrado' });
    }
    res.json(results[0]);
  });
};

const createTratamiento = (req, res) => {
  const data = req.body;

  const callback = (err, result) => {
    if (err) {
      console.error('Error al crear tratamiento:', err);
      return res.status(500).json({ error: 'Error al crear tratamiento' });
    }
    res.status(201).json({ id: result.insertId, ...data });
  };

  model.createTratamiento(data, callback);
};

const updateTratamiento = (req, res) => {
  const id = req.params.id;  
  const data = req.body;

  const callback = (err, result) => {
    if (err) {
      console.error('Error al actualizar Tratamiento:', err);
      return res.status(500).json({ error: 'Error al actualizar Tratamiento' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tratamiento no encontrado para actualizar' });
    }
    res.json({ message: 'Tratamiento actualizado correctamente', id, ...data });
  };

  model.updateTratamiento(id, data, callback);  // función del modelo corregida más abajo
};


const deleteTratamiento = (req, res) => {
  const id = req.params.id;

  const callback = (err, result) => {
    if (err) {
      console.error('Error al eliminar tratamiento:', err);
      return res.status(500).json({ error: 'Error al eliminar tratamiento' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tratamiento no encontrado' });
    }
    res.json({ message: 'Tratamiento eliminado correctamente' });
  };

  model.deleteTratamiento(id, callback);
};

module.exports = {
  getAllTratamientos,
  getTratamientoById,
  createTratamiento,
  updateTratamiento,
  deleteTratamiento
};

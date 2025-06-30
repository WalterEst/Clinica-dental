const model = require('../models/radiografiaModel');

const getAllRadiografias = (req, res) => {
  model.getAllRadiografias((err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener radiografías' });
    res.json(results);
  });
};

const getRadiografiaById = (req, res) => {
  const id = req.params.id;
  model.getRadiografiaById(id, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener radiografía' });
    if (results.length === 0) return res.status(404).json({ error: 'Radiografía no encontrada' });
    res.json(results[0]);
  });
};

const getRadiografiasByRut = (req, res) => {
  const rut = req.params.rut;

  model.getRadiografiasByRut(rut, (err, results) => {
    if (err) {
      console.error('Error al obtener radiografías:', err);
      return res.status(500).json({ error: 'Error al obtener radiografías' });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'No se encontraron radiografías para este paciente' });
    }

    res.json(results);
  });
};

  const createRadiografia = (req, res) => {
    const data = req.body;

    // Asegúrate de remover el rutPaciente si viene
    delete data.rutPaciente;

    // Verificamos si se subió archivo
    if (req.file) {
      data.archivo = req.file.filename;
    }

    model.createRadiografia(data, (err, result) => {
      if (err) {
        console.error('Error al crear radiografía:', err);
        return res.status(500).json({ error: 'Error al crear radiografía' });
      }
      res.status(201).json({ id: result.insertId, ...data });
    });
  };



const updateRadiografia = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (req.file) {
    data.archivo = req.file.filename;
  }
  model.updateRadiografia(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar radiografía' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Radiografía no encontrada' });
    res.json({ message: 'Radiografía actualizada correctamente', id, ...data });
  });
};


const deleteRadiografia = (req, res) => {
  const id = req.params.id;
  model.deleteRadiografia(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar radiografía' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Radiografía no encontrada' });
    res.json({ message: 'Radiografía eliminada correctamente' });
  });
};

module.exports = {
  getAllRadiografias,
  getRadiografiaById,
  getRadiografiasByRut,
  createRadiografia,
  updateRadiografia,
  deleteRadiografia
};

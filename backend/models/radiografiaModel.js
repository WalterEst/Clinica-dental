const db = require('../config/db');

const getAllRadiografias = (callback) => {
  const sql = `
    SELECT r.*, p.nombre, p.apellido
    FROM radiografia r
    INNER JOIN paciente p ON r.id_paciente = p.id_paciente
    ORDER BY r.fecha_toma DESC
  `;
  db.query(sql, callback);
};

const getRadiografiaById = (id, callback) => {
  const sql = `
  SELECT r.*, p.rut AS rutPaciente, p.nombre, p.apellido
  FROM radiografia r
  JOIN paciente p ON r.id_paciente = p.id_paciente
  WHERE r.id_radiografia = ?
  `;
  db.query(sql, [id], callback);
};

const getRadiografiasByRut = (rut, callback) => {
  const sql = `
    SELECT r.*, p.nombre, p.apellido
    FROM radiografia r
    INNER JOIN paciente p ON r.id_paciente = p.id_paciente
    WHERE p.rut = ?
    ORDER BY r.fecha_toma DESC
  `;
  db.query(sql, [rut], callback);
};

const createRadiografia = (data, callback) => {
  const sql = 'INSERT INTO radiografia SET ?';
  db.query(sql, data, callback);
};

const updateRadiografia = (id, data, callback) => {
  const sql = 'UPDATE radiografia SET ? WHERE id_radiografia = ?';
  db.query(sql, [data, id], callback);
};


const deleteRadiografia = (id, callback) => {
  const sql = 'DELETE FROM radiografia WHERE id_radiografia = ?';
  db.query(sql, [id], callback);
};

module.exports = { 
  getAllRadiografias,
  getRadiografiaById,
  getRadiografiasByRut,
  createRadiografia,
  updateRadiografia,
  deleteRadiografia
};

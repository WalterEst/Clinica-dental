const db = require('../config/db');

const getAllHistorialMedico = (callback) => {
  const sql = 'SELECT * FROM historial_medico';
  db.query(sql, callback);
};

const createHistorialMedico = (data, callback) => {
  const sql = 'INSERT INTO historial_medico SET ?';
  db.query(sql, data, callback);
};

const getHistorialByPacienteRut = (rut, callback) => {
  const query = `
    SELECT hm.* 
    FROM historial_medico hm
    INNER JOIN paciente p ON hm.id_paciente = p.id_paciente
    WHERE p.rut = ?
    ORDER BY hm.fecha_actualizacion DESC
  `;
  db.query(query, [rut], callback);
};

const updateHistorialByPacienteRut = (rut, data, callback) => {
  const query = `
    UPDATE historial_medico hm
    INNER JOIN paciente p ON hm.id_paciente = p.id_paciente
    SET hm.descripcion = ?
    WHERE p.rut = ?
  `;
  db.query(query, [data.descripcion, rut], callback);
};

const deleteHistorialMedico= (id, callback) => {
  const sql = 'DELETE FROM historial_medico WHERE id_historial = ?';
  db.query(sql, [id], callback);
};

const getHistorialMedicoById = (id, callback) => {
  const sql = 'SELECT * FROM historial_medico WHERE id_historial = ?';
  db.query(sql, [id], callback);
};

const updateHistorialMedicoById = (id, data, callback) => {
  const sql = 'UPDATE historial_medico SET descripcion = ? WHERE id_historial = ?';
  db.query(sql, [data.descripcion, id], callback);
};

module.exports = {
  getAllHistorialMedico,
  createHistorialMedico,
  getHistorialByPacienteRut,
  updateHistorialByPacienteRut,
  deleteHistorialMedico,
  getHistorialMedicoById,
  updateHistorialMedicoById
};

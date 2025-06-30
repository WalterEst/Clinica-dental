const db = require('../config/db');

const getAllCita = (callback) => {
  const sql = `
    SELECT c.id_cita, c.fecha_hora, c.duracion_minutos, c.estado, c.observaciones,
           p.rut AS paciente_rut,
           p.nombre AS paciente_nombre,
           p.apellido AS paciente_apellido
    FROM cita c
    JOIN paciente p ON c.id_paciente = p.id_paciente
  `;
  db.query(sql, callback);
};


const createCita = (data, callback) => {
  const sql = 'INSERT INTO cita SET ?';
  db.query(sql, data, callback);
};

const getCitaByid = (id, callback) => {
  const query = 'SELECT * FROM cita WHERE id_cita = ?';
  db.query(query, [id], callback);
};

const updateCitaByid = (id, data, callback) => {
  const sql = 'UPDATE cita SET ? WHERE id_cita = ?';
  db.query(sql, [data, id], callback);
};

const deleteCita = (id, callback) => {
  const sql = 'DELETE FROM cita WHERE id_cita = ?';
  db.query(sql, [id], callback);
};

module.exports = {
  getAllCita,
  createCita,
  getCitaByid,
  updateCitaByid,
  deleteCita
};

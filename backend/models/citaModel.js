const db = require('../config/database');

//define Cita con funciones para interactuar con cita en la base de datos
const Cita = {
  getAll: (callback) => {
    const sql = `
      SELECT c.*, 
             CONCAT(p.nombre, ' ', p.apellido) AS nombre_paciente, 
             p.id_paciente AS rut_paciente
      FROM cita c
      JOIN paciente p ON c.id_paciente = p.id_paciente
    `;
    db.query(sql, callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM cita WHERE id_cita = ?', [id], callback);
  },
  create: (cita, callback) => {
    db.query('INSERT INTO cita SET ?', cita, callback);
  },
  update: (id, cita, callback) => {
    db.query('UPDATE cita SET ? WHERE id_cita = ?', [cita, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM cita WHERE id_cita = ?', [id], callback);
  }
};


module.exports = Cita;

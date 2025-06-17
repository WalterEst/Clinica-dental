const db = require('../config/database');

//define Personal con funciones para interactuar con personal en la base de datos
const Personal = {
  getAll: (callback) => {
    db.query('SELECT * FROM personal', callback);
  },
  getDoctores: (callback) => {
    const sql = "SELECT id_personal, nombre, apellido FROM personal WHERE rol = 'doctor'";
    db.query(sql, callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM personal WHERE id_personal = ?', [id], callback);
  },
 create: (personal, callback) => {
  const sql = `INSERT INTO personal (nombre, apellido, rut, email, telefono, rol, activo, fecha_ingreso) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [personal.nombre, personal.apellido, personal.rut , personal.telefono, personal.email, personal.rol, personal.activo ? 1 : 0, personal.fecha_ingreso], callback);
},
  update: (id, personal, callback) => {
    db.query('UPDATE personal SET ? WHERE id_personal = ?', [personal, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM personal WHERE id_personal = ?', [id], callback);
  }
};

module.exports = Personal;

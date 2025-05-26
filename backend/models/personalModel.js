const db = require('../config/database');

//define Personal con funciones para interactuar con personal en la base de datos
const Personal = {
  getAll: (callback) => {
    db.query('SELECT * FROM personal', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM personal WHERE id_personal = ?', [id], callback);
  },
  create: (personal, callback) => {
    db.query('INSERT INTO personal SET ?', personal, callback);
  },
  update: (id, personal, callback) => {
    db.query('UPDATE personal SET ? WHERE id_personal = ?', [personal, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM personal WHERE id_personal = ?', [id], callback);
  }
};

module.exports = Personal;

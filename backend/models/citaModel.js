const db = require('../config/database');

const Cita = {
  getAll: (callback) => {
    db.query('SELECT * FROM cita', callback);
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

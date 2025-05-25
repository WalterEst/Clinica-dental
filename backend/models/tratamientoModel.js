const db = require('../config/database');

const Tratamiento = {
  getAll: (callback) => {
    db.query('SELECT * FROM tratamiento', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM tratamiento WHERE id_tratamiento = ?', [id], callback);
  },
  create: (tratamiento, callback) => {
    db.query('INSERT INTO tratamiento SET ?', tratamiento, callback);
  },
  update: (id, tratamiento, callback) => {
    db.query('UPDATE tratamiento SET ? WHERE id_tratamiento = ?', [tratamiento, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM tratamiento WHERE id_tratamiento = ?', [id], callback);
  }
};

module.exports = Tratamiento;

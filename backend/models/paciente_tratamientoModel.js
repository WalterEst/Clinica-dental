const db = require('../config/database');

const PacienteTratamiento = {
  getAll: (callback) => {
    db.query('SELECT * FROM paciente_tratamiento', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM paciente_tratamiento WHERE id_p_tratamiento = ?', [id], callback);
  },
  create: (tratamiento, callback) => {
    db.query('INSERT INTO paciente_tratamiento SET ?', tratamiento, callback);
  },
  update: (id, tratamiento, callback) => {
    db.query('UPDATE paciente_tratamiento SET ? WHERE id_p_tratamiento = ?', [tratamiento, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM paciente_tratamiento WHERE id_p_tratamiento = ?', [id], callback);
  }
};

module.exports = PacienteTratamiento;

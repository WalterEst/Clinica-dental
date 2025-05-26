const db = require('../config/database');

//define HistorialMedico con funciones para interactuar con historial medico en la base de datos
const HistorialMedico = {
  getAll: (callback) => {
    db.query('SELECT * FROM historial_medico', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM historial_medico WHERE id_historial = ?', [id], callback);
  },
  create: (historial, callback) => {
    db.query('INSERT INTO historial_medico SET ?', historial, callback);
  },
  update: (id, historial, callback) => {
    db.query('UPDATE historial_medico SET ? WHERE id_historial = ?', [historial, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM historial_medico WHERE id_historial = ?', [id], callback);
  }
};

module.exports = HistorialMedico;

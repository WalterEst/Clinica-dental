const db = require('../config/database');

//define Paciente con funciones para interactuar con paciente en la base de datos
const Paciente = {
  getAll: (callback) => {
    db.query('SELECT * FROM paciente', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM paciente WHERE id_paciente = ?', [id], callback);
  },
  create: (paciente, callback) => {
    db.query('INSERT INTO paciente SET ?', paciente, callback);
  },
  update: (id, paciente, callback) => {
    db.query('UPDATE paciente SET ? WHERE id_paciente = ?', [paciente, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM paciente WHERE id_paciente = ?', [id], callback);
  }
};

module.exports = Paciente;

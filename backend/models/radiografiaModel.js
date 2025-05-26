const db = require('../config/database');

//define Radiografia con funciones para interactuar con radiografia en la base de datos
const Radiografia = {
  getAll: (callback) => {
    db.query('SELECT * FROM radiografia', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM radiografia WHERE id_radiografia = ?', [id], callback);
  },
  create: (radiografia, callback) => {
    db.query('INSERT INTO radiografia SET ?', radiografia, callback);
  },
  update: (id, radiografia, callback) => {
    db.query('UPDATE radiografia SET ? WHERE id_radiografia = ?', [radiografia, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM radiografia WHERE id_radiografia = ?', [id], callback);
  }
};

module.exports = Radiografia;

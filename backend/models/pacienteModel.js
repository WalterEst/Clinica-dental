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
    const sql = `
      INSERT INTO paciente 
      (nombre, apellido, fecha_nacimiento, telefono, rut, email, direccion)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      paciente.nombre,
      paciente.apellido,
      paciente.fecha_nacimiento,
      paciente.telefono,
      paciente.rut,
      paciente.email,
      paciente.direccion
    ];
    db.query(sql, values, callback);
  },
  update: (id, paciente, callback) => {
    db.query('UPDATE paciente SET ? WHERE id_paciente = ?', [paciente, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM paciente WHERE id_paciente = ?', [id], callback);
  }
};

module.exports = Paciente;

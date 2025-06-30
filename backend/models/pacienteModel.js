const db = require('../config/db');

const getAllPaciente = (callback) => {
  const sql = 'SELECT * FROM paciente';
  db.query(sql, callback);
};

const createPaciente = (data, callback) => {
  const sql = 'INSERT INTO paciente SET ?';
  db.query(sql, data, callback);
};

const getPacienteByRut = (rut, callback) => {
  const query = 'SELECT * FROM paciente WHERE rut = ?'; // usa "rut" como campo
  db.query(query, [rut], callback);
};


const updatePacienteByRut = (rut, data, callback) => {
  const sql = 'UPDATE paciente SET ? WHERE rut = ?';
  db.query(sql, [data, rut], callback);
};


const deletePaciente = (rut, callback) => {
  const sql = 'DELETE FROM paciente WHERE rut = ?';
  db.query(sql, [rut], callback);
};



module.exports = {
  getAllPaciente,
  createPaciente,
  getPacienteByRut,
  updatePacienteByRut,
  deletePaciente
};

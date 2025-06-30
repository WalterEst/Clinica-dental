const db = require('../config/db');

const getAllPersonal = (callback) => {
  const sql = 'SELECT * FROM personal';
  db.query(sql, callback);
};

const createPersonal = (data, callback) => {
  const sql = 'INSERT INTO personal SET ?';
  db.query(sql, data, callback);
};

const getPersonalByRut = (rut, callback) => {
  const query = 'SELECT * FROM personal WHERE rut = ?'; // usa "rut" como campo
  db.query(query, [rut], callback);
};


const updatePersonalByRut = (rut, data, callback) => {
  const sql = 'UPDATE personal SET ? WHERE rut = ?';
  db.query(sql, [data, rut], callback);
};


const deletePersonal = (rut, callback) => {
  const sql = 'DELETE FROM personal WHERE rut = ?';
  db.query(sql, [rut], callback);
};



module.exports = {
  getAllPersonal,
  createPersonal,
  getPersonalByRut,
  updatePersonalByRut,
  deletePersonal
};

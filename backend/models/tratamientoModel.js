const db = require('../config/db');

const getAllTratamientos = (callback) => {
  const sql = `SELECT * FROM tratamiento ORDER BY id_tratamiento ASC`;
  db.query(sql, callback);
};

const getTratamientoById = (id, callback) => {
  const sql = 'SELECT * FROM tratamiento WHERE id_tratamiento = ?';
  db.query(sql, [id], callback);
};

const createTratamiento = (data, callback) => {
  const sql = 'INSERT INTO tratamiento SET ?';
  db.query(sql, data, callback);
};

const updateTratamiento = (id, data, callback) => {
  const sql = 'UPDATE tratamiento SET ? WHERE id_tratamiento = ?';
  db.query(sql, [data, id], callback);
};


const deleteTratamiento = (id, callback) => {
  const sql = 'DELETE FROM tratamiento WHERE id_tratamiento = ?';
  db.query(sql, [id], callback);
};

module.exports = {
  getAllTratamientos,
  getTratamientoById,
  createTratamiento,
  updateTratamiento,
  deleteTratamiento
};

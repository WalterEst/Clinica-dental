const db = require('../config/db');

const getAllPacienteTratamientos = (callback) => {
  const sql = `
    SELECT pt.*, t.nombre AS nombre_tratamiento, t.descripcion AS descripcion_tratamiento
    FROM paciente_tratamiento pt
    LEFT JOIN tratamiento t ON pt.id_tratamiento = t.id_tratamiento
  `;
  db.query(sql, callback);
};

const createPacienteTratamiento = (data, callback) => {
  const sql = 'INSERT INTO paciente_tratamiento SET ?';
  db.query(sql, data, callback);
};

const getPacienteTratamientosByRut = (rut, callback) => {
  const sql = `
    SELECT 
      pt.id_p_tratamiento,
      pt.fecha_inicio,
      pt.fecha_fin,
      pt.descripcion AS descripcion_tratamiento_paciente,
      pt.monto_aplicado,
      t.nombre AS nombre_tratamiento,
      t.descripcion AS descripcion_tratamiento
    FROM paciente_tratamiento pt
    INNER JOIN paciente p ON pt.id_paciente = p.id_paciente
    INNER JOIN tratamiento t ON pt.id_tratamiento = t.id_tratamiento
    WHERE p.rut = ?
    ORDER BY pt.fecha_inicio DESC
  `;
  db.query(sql, [rut], callback);
};

const updatePacienteTratamientoById = (id, data, callback) => {
  const sql = 'UPDATE paciente_tratamiento SET ? WHERE id_paciente_tratamiento = ?';
  db.query(sql, [data, id], callback);
};

const deletePacienteTratamientoById = (id, callback) => {
  const sql = 'DELETE FROM paciente_tratamiento WHERE id_p_tratamiento = ?';
  db.query(sql, [id], callback);
};


module.exports = {
  getAllPacienteTratamientos,
  createPacienteTratamiento,
  getPacienteTratamientosByRut,
  updatePacienteTratamientoById,
  deletePacienteTratamientoById
};

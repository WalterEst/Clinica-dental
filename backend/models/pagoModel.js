const db = require('../config/db');

// Obtener todos los pagos con nombre del tratamiento
const getAllPagos = (callback) => {
  const sql = `
    SELECT p.*, pt.id_paciente, t.nombre AS nombre_tratamiento
    FROM pagos p
    JOIN paciente_tratamiento pt ON p.id_p_tratamiento = pt.id_p_tratamiento
    JOIN tratamiento t ON pt.id_tratamiento = t.id_tratamiento
    ORDER BY p.fecha_pago DESC
  `;
  db.query(sql, callback);
};

// Obtener un pago por ID
const getPagoById = (id_pago, callback) => {
  const sql = `
    SELECT p.*, pt.id_paciente, t.nombre AS nombre_tratamiento
    FROM pagos p
    JOIN paciente_tratamiento pt ON p.id_p_tratamiento = pt.id_p_tratamiento
    JOIN tratamiento t ON pt.id_tratamiento = t.id_tratamiento
    WHERE p.id_pago = ?
  `;
  db.query(sql, [id_pago], callback);
};

// Crear un nuevo pago
const createPago = (data, callback) => {
  const sql = 'INSERT INTO pagos SET ?';
  db.query(sql, data, callback);
};

// Obtener pagos por ID de tratamiento
const getPagosByTratamientoId = (id_p_tratamiento, callback) => {
  const sql = `
    SELECT p.*, pt.id_paciente, t.nombre AS nombre_tratamiento
    FROM pagos p
    JOIN paciente_tratamiento pt ON p.id_p_tratamiento = pt.id_p_tratamiento
    JOIN tratamiento t ON pt.id_tratamiento = t.id_tratamiento
    WHERE p.id_p_tratamiento = ?
    ORDER BY p.fecha_pago DESC
  `;
  db.query(sql, [id_p_tratamiento], callback);
};

// Actualizar un pago
const updatePagoById = (id_pago, data, callback) => {
  const sql = 'UPDATE pagos SET ? WHERE id_pago = ?';
  db.query(sql, [data, id_pago], callback);
};

// Eliminar un pago
const deletePagoById = (id_pago, callback) => {
  const sql = 'DELETE FROM pagos WHERE id_pago = ?';
  db.query(sql, [id_pago], callback);
};

module.exports = {
  getAllPagos,
  getPagoById,
  createPago,
  getPagosByTratamientoId,
  updatePagoById,
  deletePagoById
};

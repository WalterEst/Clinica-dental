const db = require('../config/database');

const Pagos = {
  getAll: (callback) => {
    db.query('SELECT * FROM pagos', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM pagos WHERE id_pago = ?', [id], callback);
  },
  create: (pago, callback) => {
    db.query('INSERT INTO pagos SET ?', pago, callback);
  },
  update: (id, pago, callback) => {
    db.query('UPDATE pagos SET ? WHERE id_pago = ?', [pago, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM pagos WHERE id_pago = ?', [id], callback);
  }
};

module.exports = Pagos;

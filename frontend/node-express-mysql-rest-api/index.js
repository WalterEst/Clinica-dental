// index.js - API completa con todos los modelos integrados en un solo archivo
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const router = express.Router();
const port = 3000;

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clinicadb'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

app.use(bodyParser.json());
app.use(cors());

// Función utilitaria para generar rutas CRUD
function generarCRUD(path, modelo, idField) {
  router.get(`/${path}`, (req, res) => modelo.getAll((err, result) => {
    if (err) return res.status(500).send(`Error al obtener ${path}`);
    res.json(result);
  }));

  router.get(`/${path}/:id`, (req, res) => {
    modelo.getById(req.params.id, (err, result) => {
      if (err) return res.status(500).send(`Error al obtener ${path} por ID`);
      if (!result.length) return res.status(404).send(`${path} no encontrado`);
      res.json(result[0]);
    });
  });

  router.post(`/${path}`, (req, res) => {
    modelo.create(req.body, (err, result) => {
      if (err) return res.status(500).send(`Error al crear ${path}`);
      res.status(201).json({ mensaje: `${path} creado correctamente`, idInsertado: result.insertId });
    });
  });

  router.put(`/${path}/:id`, (req, res) => {
    modelo.update(req.params.id, req.body, (err) => {
      if (err) return res.status(500).send(`Error al actualizar ${path}`);
      res.json({ mensaje: `${path} actualizado correctamente` });
    });
  });

  router.delete(`/${path}/:id`, (req, res) => {
    modelo.delete(req.params.id, (err) => {
      if (err) return res.status(500).send(`Error al eliminar ${path}`);
      res.json({ mensaje: `${path} eliminado correctamente` });
    });
  });
}

// MODELOS - cada uno definido directamente con conexión db
const Paciente = {
  getAll: cb => db.query('SELECT * FROM paciente', cb),
  getById: (id, cb) => db.query('SELECT * FROM paciente WHERE id_paciente = ?', [id], cb),
  create: (data, cb) => db.query('INSERT INTO paciente SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE paciente SET ? WHERE id_paciente = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM paciente WHERE id_paciente = ?', [id], cb)
};

const Tratamiento = {
  getAll: cb => db.query('SELECT * FROM tratamiento', cb),
  getById: (id, cb) => db.query('SELECT * FROM tratamiento WHERE id_tratamiento = ?', [id], cb),
  create: (data, cb) => db.query('INSERT INTO tratamiento SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE tratamiento SET ? WHERE id_tratamiento = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM tratamiento WHERE id_tratamiento = ?', [id], cb)
};

const Radiografia = {
  getAll: cb => db.query('SELECT * FROM radiografia', cb),
  getById: (id, cb) => db.query('SELECT * FROM radiografia WHERE id_radiografia = ?', [id], cb),
  create: (data, cb) => db.query('INSERT INTO radiografia SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE radiografia SET ? WHERE id_radiografia = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM radiografia WHERE id_radiografia = ?', [id], cb)
};

const Cita = {
  getAll: cb => db.query(`SELECT c.*, CONCAT(p.nombre, ' ', p.apellido) AS nombre_paciente FROM cita c JOIN paciente p ON c.id_paciente = p.id_paciente`, cb),
  getById: (id, cb) => db.query('SELECT * FROM cita WHERE id_cita = ?', [id], cb),
  create: (data, cb) => db.query('INSERT INTO cita SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE cita SET ? WHERE id_cita = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM cita WHERE id_cita = ?', [id], cb)
};

const HistorialMedico = {
  getAll: cb => db.query('SELECT * FROM historial_medico', cb),
  getById: (id, cb) => db.query('SELECT * FROM historial_medico WHERE id_historial = ?', [id], cb),
  create: (data, cb) => db.query('INSERT INTO historial_medico SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE historial_medico SET ? WHERE id_historial = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM historial_medico WHERE id_historial = ?', [id], cb)
};

const Pagos = {
  getAll: cb => db.query('SELECT * FROM pagos', cb),
  getById: (id, cb) => db.query('SELECT * FROM pagos WHERE id_pago = ?', [id], cb),
  create: (data, cb) => db.query('INSERT INTO pagos SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE pagos SET ? WHERE id_pago = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM pagos WHERE id_pago = ?', [id], cb)
};

const Personal = {
  getAll: cb => db.query('SELECT * FROM personal', cb),
  getById: (id, cb) => db.query('SELECT * FROM personal WHERE id_personal = ?', [id], cb),
  create: (data, cb) => db.query('INSERT INTO personal SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE personal SET ? WHERE id_personal = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM personal WHERE id_personal = ?', [id], cb)
};

const PacienteTratamiento = {
  getAll: cb => db.query('SELECT * FROM paciente_tratamiento', cb),
  getById: (id, cb) => db.query('SELECT * FROM paciente_tratamiento WHERE id_p_tratamiento = ?', [id], cb),
  create: (data, cb) => db.query('INSERT INTO paciente_tratamiento SET ?', data, cb),
  update: (id, data, cb) => db.query('UPDATE paciente_tratamiento SET ? WHERE id_p_tratamiento = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM paciente_tratamiento WHERE id_p_tratamiento = ?', [id], cb)
};

// Registrar todas las rutas

// CRUD general
const rutas = [
  ['pacientes', Paciente],
  ['tratamientos', Tratamiento],
  ['radiografias', Radiografia],
  ['citas', Cita],
  ['historiales', HistorialMedico],
  ['pagos', Pagos],
  ['personal', Personal],
  ['paciente_tratamientos', PacienteTratamiento],
];

rutas.forEach(([ruta, modelo]) => generarCRUD(ruta, modelo));

// Prefijo para todas las rutas
app.use('/api', router);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

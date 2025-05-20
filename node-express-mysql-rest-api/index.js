const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'sistema_restaurantes'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

app.get('/api/platos', (req, res) => {
  const { nombre, precioMin, precioMax } = req.query;

  let query = `
    SELECT 
      platos.id,
      platos.nombre AS nombre_plato,
      platos.precio,
      platos.descripcion,
      platos.imagen,
      restaurantes.nombre AS restaurante
    FROM platos
    JOIN restaurantes ON platos.restaurante_id = restaurantes.id
    WHERE 1=1
  `;

  const queryParams = [];

  if (nombre) {
    query += ' AND platos.nombre LIKE ?';
    queryParams.push(`%${nombre}%`);
  }

  if (precioMin) {
    query += ' AND platos.precio >= ?';
    queryParams.push(precioMin);
  }

  if (precioMax) {
    query += ' AND platos.precio <= ?';
    queryParams.push(precioMax);
  }

  console.log('Consulta SQL:', query);
  console.log('Parámetros:', queryParams);

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error al obtener platos:', err);
      res.status(500).send('Error al obtener platos');
      return;
    }
    res.json(results);
  });
});

app.get('/api/restaurantes', (req, res) => {
  const query = `
    SELECT id, nombre, direccion, tipo_comida, imagen
    FROM restaurantes
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener restaurantes:', err);
      res.status(500).send('Error al obtener restaurantes');
      return;
    }
    res.json(results);
  });
});

app.get('/api/restaurantes/:id/platos', (req, res) => {
  const restauranteId = req.params.id;

  const query = `
    SELECT 
      id, nombre AS nombre_plato, precio, descripcion, imagen
    FROM platos
    WHERE restaurante_id = ?
  `;

  db.query(query, [restauranteId], (err, results) => {
    if (err) {
      console.error('Error al obtener platos del restaurante:', err);
      res.status(500).send('Error al obtener platos');
      return;
    }
    res.json(results);
  });
});

app.get('/api/platos/:id', (req, res) => {
  const platoId = req.params.id;

  const query = `
    SELECT 
      platos.id,
      platos.nombre AS nombre_plato,
      platos.precio,
      platos.descripcion,
      platos.imagen,
      restaurantes.nombre AS restaurante
    FROM platos
    JOIN restaurantes ON platos.restaurante_id = restaurantes.id
    WHERE platos.id = ?
  `;

  db.query(query, [platoId], (err, results) => {
    if (err) {
      console.error('Error al obtener el plato:', err);
      res.status(500).send('Error al obtener el plato');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Plato no encontrado');
      return;
    }

    res.json(results[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});

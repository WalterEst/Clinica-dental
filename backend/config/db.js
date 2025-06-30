const mysql = require('mysql2');

//configura la conexion a la db
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'josefa2003',
  database: 'clinica_dental'
});

//conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');
});

module.exports = db;

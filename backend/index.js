const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas API
app.use('/api/personal', require('./routes/personalRoutes'));
app.use('/api/paciente', require('./routes/pacienteRoutes'));
app.use('/api/cita', require('./routes/citaRoutes'));
app.use('/api/historial', require('./routes/historial-medicoRoutes'));
app.use('/api/tratamiento', require('./routes/tratamientoRoutes'));
app.use('/api/paciente-tratamiento', require('./routes/paciente-tratamientoRoutes'));
app.use('/api/radiografia', require('./routes/radiografiaRoutes'));
app.use('/api/pago', require('./routes/pagoRoutes'));

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});

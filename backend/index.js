const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(express.json());

// rutas existentes
app.use('/api/pacientes', require('./routes/pacienteRoutes'));
app.use('/api/tratamientos', require('./routes/tratamientoRoutes'));
app.use('/api/paciente-tratamientos', require('./routes/paciente_tratamientoRoutes'));
app.use('/api/citas', require('./routes/citaRoutes'));
app.use('/api/historiales', require('./routes/historial_medicoRoutes'));
app.use('/api/pagos', require('./routes/pagosRoutes'));
app.use('/api/personal', require('./routes/personalRoutes'));
app.use('/api/radiografias', require('./routes/radiografiaRoutes'));

// ruta login
// app.use('/api/auth', require('./routes/loginRoutes'));

// middleware de errores
app.use(errorHandler);

// inicio del servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});

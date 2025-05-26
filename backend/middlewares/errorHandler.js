// Middleware para manejar errores
function errorHandler(err, req, res, next) {
  console.error(err.stack); // Muestra el error en consola

  // Responde con un error 500 y un mensaje
  res.status(500).json({
    message: err.message || 'Error interno del servidor'
  });
}

// Exporta el middleware
module.exports = errorHandler;

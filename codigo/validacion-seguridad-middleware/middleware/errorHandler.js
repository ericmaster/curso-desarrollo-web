// Middleware centralizado para manejo de errores
const errorHandler = (err, req, res, next) => {
    // Obtener el código de estado (si existe) o usar 500 por defecto
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    // Log del error en consola
    console.error('❌ Error:', err.message);
    console.error(err.stack);
    
    // Respuesta al cliente
    res.status(statusCode).json({
        error: {
            mensaje: err.message,
            // Solo mostrar stack trace en desarrollo
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
};

module.exports = errorHandler;

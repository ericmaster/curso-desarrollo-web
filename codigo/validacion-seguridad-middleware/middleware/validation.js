const { validationResult } = require('express-validator');

// Middleware para verificar errores de validación
const verificarErrores = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Errores de validación',
            detalles: errors.array().map(err => ({
                campo: err.path,
                mensaje: err.msg,
                valor: err.value
            }))
        });
    }
    
    next();
};

module.exports = { verificarErrores };

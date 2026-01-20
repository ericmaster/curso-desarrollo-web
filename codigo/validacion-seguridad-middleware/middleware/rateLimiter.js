const rateLimit = require('express-rate-limit');

// Rate limiter general para la API
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máximo 100 peticiones por ventana
    message: {
        error: 'Demasiadas peticiones desde esta IP, por favor intenta más tarde.'
    },
    standardHeaders: true, // Retorna info en los headers `RateLimit-*`
    legacyHeaders: false, // Deshabilita headers `X-RateLimit-*`
});

// Rate limiter estricto para rutas sensibles (login, registro)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Máximo 5 intentos
    message: {
        error: 'Demasiados intentos. Por favor intenta de nuevo en 15 minutos.'
    },
    skipSuccessfulRequests: false,
});

// Rate limiter para creación de recursos
const createLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 10, // Máximo 10 creaciones por hora
    message: {
        error: 'Has alcanzado el límite de creación de recursos por hora.'
    },
});

module.exports = { apiLimiter, authLimiter, createLimiter };

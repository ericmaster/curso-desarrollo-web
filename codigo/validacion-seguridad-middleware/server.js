const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Importar rutas y middleware
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const productosRoutes = require('./routes/productos');
const usuariosRoutes = require('./routes/usuarios');

const app = express();

// ==================================================
// MIDDLEWARE DE SEGURIDAD
// ==================================================

// Helmet: Configurar headers HTTP seguros
app.use(helmet());

// CORS: Configurar acceso entre dominios
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://miapp.com'] 
        : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));

// ==================================================
// MIDDLEWARE DE PARSEO
// ==================================================

// Parsear JSON con límite de tamaño
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ==================================================
// MIDDLEWARE DE LOGGING
// ==================================================

// Morgan: Logging de peticiones HTTP
app.use(morgan('dev'));

// Middleware personalizado de logging
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// ==================================================
// RUTAS
// ==================================================

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de Validación, Seguridad y Middleware',
        version: '1.0.0',
        endpoints: {
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        }
    });
});

// Rutas de la API
app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// ==================================================
// MIDDLEWARE DE MANEJO DE ERRORES
// ==================================================

// Ruta no encontrada (404)
app.use(notFound);

// Manejador de errores global
app.use(errorHandler);

// ==================================================
// INICIAR SERVIDOR
// ==================================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`📝 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

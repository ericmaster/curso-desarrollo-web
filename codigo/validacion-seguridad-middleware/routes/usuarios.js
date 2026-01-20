const express = require('express');
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verificarErrores } = require('../middleware/validation');
const { autenticar } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Base de datos simulada de usuarios
let usuarios = [
    {
        id: 1,
        nombre: 'Admin',
        email: 'admin@example.com',
        password: '$2a$10$8ZGzTvL5x8qF8YJ8rGzTvL5x8qF8YJ8rGzTvL5x8qF8YJ8rGzTvL5', // password: admin123
        rol: 'admin'
    }
];

// ==================================================
// VALIDACIONES
// ==================================================

const validarRegistro = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El nombre solo puede contener letras'),
    
    body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Email inválido')
        .normalizeEmail()
        .custom(async (email) => {
            const usuarioExistente = usuarios.find(u => u.email === email);
            if (usuarioExistente) {
                throw new Error('El email ya está registrado');
            }
            return true;
        }),
    
    body('password')
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage(
            'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
        ),
    
    body('confirmarPassword')
        .notEmpty().withMessage('Debes confirmar la contraseña')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
    
    body('rol')
        .optional()
        .isIn(['usuario', 'admin']).withMessage('Rol inválido')
];

const validarLogin = [
    body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Email inválido')
        .normalizeEmail(),
    
    body('password')
        .notEmpty().withMessage('La contraseña es requerida')
];

// ==================================================
// RUTAS
// ==================================================

// POST /api/usuarios/registro - Registrar un nuevo usuario
router.post(
    '/registro',
    authLimiter,
    validarRegistro,
    verificarErrores,
    async (req, res) => {
        try {
            const { nombre, email, password, rol = 'usuario' } = req.body;
            
            // Hashear la contraseña
            const passwordHash = await bcrypt.hash(password, 10);
            
            const nuevoUsuario = {
                id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
                nombre,
                email,
                password: passwordHash,
                rol
            };
            
            usuarios.push(nuevoUsuario);
            
            // Generar token JWT
            const token = jwt.sign(
                { 
                    id: nuevoUsuario.id, 
                    email: nuevoUsuario.email,
                    rol: nuevoUsuario.rol
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            res.status(201).json({
                mensaje: 'Usuario registrado exitosamente',
                token,
                usuario: {
                    id: nuevoUsuario.id,
                    nombre: nuevoUsuario.nombre,
                    email: nuevoUsuario.email,
                    rol: nuevoUsuario.rol
                }
            });
        } catch (error) {
            res.status(500).json({ 
                error: 'Error al registrar el usuario' 
            });
        }
    }
);

// POST /api/usuarios/login - Iniciar sesión
router.post(
    '/login',
    authLimiter,
    validarLogin,
    verificarErrores,
    async (req, res) => {
        try {
            const { email, password } = req.body;
            
            // Buscar usuario
            const usuario = usuarios.find(u => u.email === email);
            
            if (!usuario) {
                return res.status(401).json({ 
                    error: 'Credenciales inválidas' 
                });
            }
            
            // Verificar contraseña
            const passwordValido = await bcrypt.compare(password, usuario.password);
            
            if (!passwordValido) {
                return res.status(401).json({ 
                    error: 'Credenciales inválidas' 
                });
            }
            
            // Generar token JWT
            const token = jwt.sign(
                { 
                    id: usuario.id, 
                    email: usuario.email,
                    rol: usuario.rol
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            res.json({
                mensaje: 'Login exitoso',
                token,
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    rol: usuario.rol
                }
            });
        } catch (error) {
            res.status(500).json({ 
                error: 'Error al iniciar sesión' 
            });
        }
    }
);

// GET /api/usuarios/perfil - Obtener perfil del usuario autenticado
router.get('/perfil', autenticar, (req, res) => {
    const usuario = usuarios.find(u => u.id === req.usuario.id);
    
    if (!usuario) {
        return res.status(404).json({ 
            error: 'Usuario no encontrado' 
        });
    }
    
    res.json({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
    });
});

// GET /api/usuarios - Obtener todos los usuarios (solo admin)
router.get('/', autenticar, (req, res) => {
    // Remover contraseñas de la respuesta
    const usuariosSinPassword = usuarios.map(({ password, ...usuario }) => usuario);
    
    res.json({
        total: usuariosSinPassword.length,
        usuarios: usuariosSinPassword
    });
});

module.exports = router;

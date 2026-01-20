const express = require('express');
const { body, param } = require('express-validator');
const { verificarErrores } = require('../middleware/validation');
const { autenticar, autorizarRol } = require('../middleware/auth');
const { createLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Base de datos simulada
let productos = [
    { id: 1, nombre: 'Laptop', precio: 1200, stock: 10, categoria: 'Electrónica' },
    { id: 2, nombre: 'Mouse', precio: 25, stock: 50, categoria: 'Accesorios' },
    { id: 3, nombre: 'Teclado', precio: 75, stock: 30, categoria: 'Accesorios' }
];

// ==================================================
// VALIDACIONES
// ==================================================

const validarProducto = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres')
        .matches(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/).withMessage('El nombre solo puede contener letras y números'),
    
    body('precio')
        .notEmpty().withMessage('El precio es requerido')
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0')
        .toFloat(),
    
    body('stock')
        .notEmpty().withMessage('El stock es requerido')
        .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0')
        .toInt(),
    
    body('categoria')
        .trim()
        .notEmpty().withMessage('La categoría es requerida')
        .isLength({ min: 3, max: 50 }).withMessage('La categoría debe tener entre 3 y 50 caracteres')
];

const validarActualizacionProducto = [
    body('nombre')
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
    
    body('precio')
        .optional()
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0')
        .toFloat(),
    
    body('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0')
        .toInt(),
    
    body('categoria')
        .optional()
        .trim()
        .isLength({ min: 3, max: 50 }).withMessage('La categoría debe tener entre 3 y 50 caracteres')
];

const validarId = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
        .toInt()
];

// ==================================================
// RUTAS
// ==================================================

// GET /api/productos - Obtener todos los productos
router.get('/', (req, res) => {
    res.json({
        total: productos.length,
        productos
    });
});

// GET /api/productos/:id - Obtener un producto por ID
router.get('/:id', validarId, verificarErrores, (req, res) => {
    const producto = productos.find(p => p.id === req.params.id);
    
    if (!producto) {
        return res.status(404).json({ 
            error: 'Producto no encontrado' 
        });
    }
    
    res.json(producto);
});

// POST /api/productos - Crear un nuevo producto
// Requiere autenticación y rol de administrador
// Aplica rate limiting para creación
router.post(
    '/',
    createLimiter,
    autenticar,
    autorizarRol('admin'),
    validarProducto,
    verificarErrores,
    (req, res) => {
        const { nombre, precio, stock, categoria } = req.body;
        
        // Verificar si ya existe un producto con el mismo nombre
        const productoExistente = productos.find(
            p => p.nombre.toLowerCase() === nombre.toLowerCase()
        );
        
        if (productoExistente) {
            return res.status(400).json({ 
                error: 'Ya existe un producto con ese nombre' 
            });
        }
        
        const nuevoProducto = {
            id: productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1,
            nombre,
            precio,
            stock,
            categoria
        };
        
        productos.push(nuevoProducto);
        
        res.status(201).json({
            mensaje: 'Producto creado exitosamente',
            producto: nuevoProducto
        });
    }
);

// PUT /api/productos/:id - Actualizar un producto
// Requiere autenticación y rol de administrador
router.put(
    '/:id',
    autenticar,
    autorizarRol('admin'),
    validarId,
    validarActualizacionProducto,
    verificarErrores,
    (req, res) => {
        const index = productos.findIndex(p => p.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ 
                error: 'Producto no encontrado' 
            });
        }
        
        // Actualizar solo los campos proporcionados
        productos[index] = {
            ...productos[index],
            ...req.body
        };
        
        res.json({
            mensaje: 'Producto actualizado exitosamente',
            producto: productos[index]
        });
    }
);

// DELETE /api/productos/:id - Eliminar un producto
// Requiere autenticación y rol de administrador
router.delete(
    '/:id',
    autenticar,
    autorizarRol('admin'),
    validarId,
    verificarErrores,
    (req, res) => {
        const index = productos.findIndex(p => p.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ 
                error: 'Producto no encontrado' 
            });
        }
        
        const productoEliminado = productos.splice(index, 1)[0];
        
        res.json({
            mensaje: 'Producto eliminado exitosamente',
            producto: productoEliminado
        });
    }
);

module.exports = router;

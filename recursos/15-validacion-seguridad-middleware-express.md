# Validación, Seguridad y Middleware en Express

## Índice
1. [Introducción](#introducción)
2. [Middleware en Express](#middleware-en-express)
3. [Validación de Datos](#validación-de-datos)
4. [Seguridad en Express](#seguridad-en-express)
5. [Mejores Prácticas](#mejores-prácticas)

---

## Introducción

Express es un framework minimalista que depende en gran medida del concepto de **middleware** para agregar funcionalidades a las aplicaciones. La validación de datos y la seguridad son aspectos críticos que deben implementarse mediante middleware para crear aplicaciones robustas y seguras.

---

## Middleware en Express

### ¿Qué es un Middleware?

Un middleware es una función que tiene acceso a:
- El objeto de solicitud (`req`)
- El objeto de respuesta (`res`)
- La siguiente función middleware en el ciclo de solicitud-respuesta (`next`)

### Estructura Básica de un Middleware

```javascript
function miMiddleware(req, res, next) {
    // Realizar operaciones
    console.log('Middleware ejecutado');
    
    // Llamar a next() para pasar al siguiente middleware
    next();
}

// Usar el middleware
app.use(miMiddleware);
```

### Tipos de Middleware

#### 1. **Middleware de Aplicación**
Se aplica a toda la aplicación o a rutas específicas.

```javascript
// Middleware global
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware para una ruta específica
app.use('/api', (req, res, next) => {
    console.log('Accediendo a la API');
    next();
});
```

#### 2. **Middleware de Router**
Se asocia a instancias de `express.Router()`.

```javascript
const router = express.Router();

router.use((req, res, next) => {
    console.log('Middleware del router');
    next();
});

router.get('/users', (req, res) => {
    res.json({ users: [] });
});

app.use('/api', router);
```

#### 3. **Middleware de Manejo de Errores**
Tiene cuatro parámetros: `(err, req, res, next)`.

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Algo salió mal',
        message: err.message
    });
});
```

#### 4. **Middleware de Terceros**
Paquetes npm que proporcionan funcionalidades específicas.

```javascript
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());
```

### Orden de Ejecución

El orden en que se declaran los middleware es **crucial**:

```javascript
// 1. Primero los middleware globales
app.use(express.json());
app.use(cors());

// 2. Luego los middleware específicos
app.use('/api', apiRouter);

// 3. Finalmente el middleware de manejo de errores
app.use(errorHandler);
```

---

## Validación de Datos

### ¿Por qué validar?

- **Seguridad**: Prevenir inyecciones SQL, XSS, etc.
- **Integridad**: Asegurar que los datos sean correctos
- **Experiencia de usuario**: Proporcionar mensajes de error claros

### Validación con express-validator

`express-validator` es una librería popular para validación en Express.

#### Instalación

```bash
npm install express-validator
```

#### Uso Básico

```javascript
const { body, validationResult } = require('express-validator');

// Middleware de validación
const validarUsuario = [
    body('email')
        .isEmail()
        .withMessage('Email inválido')
        .normalizeEmail(),
    
    body('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('La contraseña debe contener mayúsculas, minúsculas y números'),
    
    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre debe tener entre 2 y 50 caracteres')
];

// Middleware para verificar errores
const verificarErrores = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Usar en una ruta
app.post('/registro', validarUsuario, verificarErrores, (req, res) => {
    // Si llegamos aquí, los datos son válidos
    res.json({ mensaje: 'Usuario registrado correctamente' });
});
```

#### Validaciones Comunes

```javascript
const { body, param, query } = require('express-validator');

// Validar email
body('email').isEmail()

// Validar longitud
body('username').isLength({ min: 3, max: 20 })

// Validar números
body('edad').isInt({ min: 18, max: 120 })

// Validar URL
body('website').isURL()

// Validar fecha
body('fechaNacimiento').isISO8601()

// Validar parámetros de ruta
param('id').isMongoId()

// Validar query string
query('page').isInt({ min: 1 })

// Validación personalizada
body('username').custom(async (value) => {
    const user = await User.findOne({ username: value });
    if (user) {
        throw new Error('Usuario ya existe');
    }
    return true;
})
```

#### Sanitización

```javascript
body('email')
    .normalizeEmail()  // Normaliza el email
    .trim()            // Elimina espacios

body('nombre')
    .trim()            // Elimina espacios
    .escape()          // Escapa caracteres HTML
```

### Validación Personalizada con Middleware

```javascript
const validarProducto = (req, res, next) => {
    const { nombre, precio, stock } = req.body;
    const errores = [];
    
    if (!nombre || nombre.trim() === '') {
        errores.push({ campo: 'nombre', mensaje: 'El nombre es requerido' });
    }
    
    if (precio === undefined || precio < 0) {
        errores.push({ campo: 'precio', mensaje: 'El precio debe ser mayor o igual a 0' });
    }
    
    if (stock === undefined || !Number.isInteger(stock) || stock < 0) {
        errores.push({ campo: 'stock', mensaje: 'El stock debe ser un número entero positivo' });
    }
    
    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }
    
    next();
};

app.post('/productos', validarProducto, (req, res) => {
    res.json({ mensaje: 'Producto creado' });
});
```

---

## Seguridad en Express

### Helmet: Protección de Headers HTTP

`helmet` ayuda a proteger la aplicación estableciendo varios headers HTTP de seguridad.

#### Instalación y Uso

```bash
npm install helmet
```

```javascript
const helmet = require('helmet');

app.use(helmet());
```

#### Qué hace Helmet

- **Content Security Policy**: Previene XSS
- **X-DNS-Prefetch-Control**: Controla el prefetching DNS
- **X-Frame-Options**: Previene clickjacking
- **X-Powered-By**: Oculta información del servidor
- **Strict-Transport-Security**: Fuerza HTTPS

#### Configuración Personalizada

```javascript
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'", "trusted-cdn.com"]
            }
        }
    })
);
```

### CORS: Cross-Origin Resource Sharing

Controla qué dominios pueden acceder a tu API.

```bash
npm install cors
```

```javascript
const cors = require('cors');

// Permitir todos los orígenes (desarrollo)
app.use(cors());

// Configuración específica (producción)
const corsOptions = {
    origin: ['https://miapp.com', 'https://www.miapp.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 3600
};

app.use(cors(corsOptions));
```

### Rate Limiting: Limitar Peticiones

Previene ataques de fuerza bruta y DDoS.

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

// Limitar peticiones globales
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máximo 100 peticiones por ventana
    message: 'Demasiadas peticiones desde esta IP'
});

app.use('/api/', limiter);

// Limitar peticiones de login
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Demasiados intentos de login'
});

app.post('/login', loginLimiter, loginHandler);
```

### Express Mongo Sanitize

Previene inyecciones NoSQL en MongoDB.

```bash
npm install express-mongo-sanitize
```

```javascript
const mongoSanitize = require('express-mongo-sanitize');

app.use(mongoSanitize());
```

### XSS Protection

```bash
npm install xss-clean
```

```javascript
const xss = require('xss-clean');

app.use(xss());
```

### Autenticación con JWT

```javascript
const jwt = require('jsonwebtoken');

// Middleware de autenticación
const autenticar = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No autorizado' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

// Usar en rutas protegidas
app.get('/perfil', autenticar, (req, res) => {
    res.json({ usuario: req.usuario });
});
```

### Variables de Entorno

Nunca incluyas secretos en el código. Usa `dotenv`:

```bash
npm install dotenv
```

```javascript
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const DB_URL = process.env.DB_URL;
```

Archivo `.env`:
```
JWT_SECRET=tu_secreto_super_seguro
DB_URL=mongodb://localhost:27017/midb
PORT=3000
```

**Importante**: Añade `.env` a `.gitignore`.

---

## Mejores Prácticas

### 1. **Manejo de Errores Centralizado**

```javascript
// Middleware de manejo de errores
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // Error de validación
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Error de validación',
            detalles: err.message
        });
    }
    
    // Error de JWT
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Token inválido'
        });
    }
    
    // Error por defecto
    res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor'
    });
};

app.use(errorHandler);
```

### 2. **Middleware de Logging**

```javascript
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Crear stream de escritura
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
);

// Usar morgan
app.use(morgan('combined', { stream: accessLogStream }));
```

### 3. **Middleware Asíncrono**

Para manejar errores en funciones async:

```javascript
// Wrapper para funciones async
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Usar en rutas
app.get('/usuarios', asyncHandler(async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
}));
```

### 4. **Composición de Middleware**

```javascript
// Combinar múltiples validaciones
const validarYAutenticar = [
    autenticar,
    validarUsuario,
    verificarErrores
];

app.post('/actualizar-perfil', validarYAutenticar, actualizarPerfil);
```

### 5. **Estructura de Proyecto**

```
proyecto/
├── src/
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   └── index.js
│   ├── routes/
│   ├── controllers/
│   └── models/
├── .env
├── .gitignore
└── server.js
```

### 6. **Checklist de Seguridad**

- ✅ Usar `helmet` para headers de seguridad
- ✅ Implementar CORS correctamente
- ✅ Usar rate limiting
- ✅ Validar todas las entradas del usuario
- ✅ Sanitizar datos para prevenir inyecciones
- ✅ Usar HTTPS en producción
- ✅ Mantener dependencias actualizadas
- ✅ No exponer información sensible en errores
- ✅ Usar variables de entorno para secretos
- ✅ Implementar autenticación y autorización
- ✅ Registrar (log) eventos de seguridad
- ✅ Implementar timeouts para peticiones

---

## Ejemplo Completo

```javascript
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();

// Middleware de seguridad
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use('/api/', limiter);

// Parseo de body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Validación
const validarUsuario = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('nombre').trim().notEmpty()
];

const verificarErrores = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Rutas
app.post('/api/registro', validarUsuario, verificarErrores, (req, res) => {
    res.json({ mensaje: 'Usuario registrado' });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
```

---

## Recursos Adicionales

- [Documentación oficial de Express](https://expressjs.com/)
- [Express Validator](https://express-validator.github.io/docs/)
- [Helmet.js](https://helmetjs.github.io/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

---

## Conclusión

La validación, seguridad y el uso correcto de middleware son fundamentales para crear aplicaciones Express robustas y seguras. Implementar estas prácticas desde el inicio del proyecto te ayudará a:

- Prevenir vulnerabilidades comunes
- Mejorar la calidad del código
- Facilitar el mantenimiento
- Proporcionar mejor experiencia de usuario
- Proteger datos sensibles

Recuerda: **la seguridad es un proceso continuo**, no una tarea única.

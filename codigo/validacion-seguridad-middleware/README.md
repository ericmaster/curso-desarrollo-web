# Ejercicio Práctico: Validación, Seguridad y Middleware en Express

## 📋 Descripción

Este ejercicio práctico te permitirá aplicar conceptos de validación de datos, seguridad y middleware en una API REST construida con Express. Implementarás una API de gestión de productos y usuarios con autenticación, validación y múltiples capas de seguridad.

---

## 🎯 Objetivos de Aprendizaje

Al completar este ejercicio, serás capaz de:

- ✅ Implementar middleware personalizados en Express
- ✅ Validar datos de entrada usando express-validator
- ✅ Aplicar medidas de seguridad con Helmet, CORS y rate limiting
- ✅ Crear un sistema de autenticación con JWT
- ✅ Manejar errores de forma centralizada
- ✅ Proteger rutas con middleware de autenticación y autorización

---

## 📦 Requisitos Previos

- Node.js v14 o superior
- npm o yarn
- Conocimientos básicos de Express
- Herramienta para probar APIs (Postman, Insomnia, Thunder Client, etc.)

---

## 🚀 Instalación

### Paso 1: Instalar dependencias

```bash
npm install
```

### Paso 2: Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita el archivo `.env` y configura tus variables:

```env
PORT=3000
JWT_SECRET=tu_secreto_super_seguro_cambiar_en_produccion
NODE_ENV=development
```

⚠️ **Importante**: Cambia el `JWT_SECRET` por un valor único y seguro en producción.

### Paso 3: Iniciar el servidor

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor se iniciará en `http://localhost:3000`

---

## 🏗️ Estructura del Proyecto

```
validacion-seguridad-middleware/
├── middleware/
│   ├── auth.js           # Autenticación y autorización
│   ├── errorHandler.js   # Manejo de errores
│   ├── notFound.js       # Error 404
│   ├── rateLimiter.js    # Limitación de peticiones
│   └── validation.js     # Verificación de validaciones
├── routes/
│   ├── productos.js      # Rutas de productos
│   └── usuarios.js       # Rutas de usuarios
├── .env.example          # Plantilla de variables de entorno
├── .gitignore
├── package.json
├── README.md
└── server.js             # Punto de entrada
```

---

## 🔍 Funcionalidades Implementadas

### 1. **Middleware de Seguridad**

- **Helmet**: Protección de headers HTTP
- **CORS**: Control de acceso entre dominios
- **Rate Limiting**: Limitación de peticiones por IP
- **Sanitización**: Protección contra inyecciones XSS y NoSQL

### 2. **Sistema de Validación**

- Validación de datos de entrada con express-validator
- Mensajes de error descriptivos
- Sanitización automática de datos

### 3. **Autenticación y Autorización**

- Registro de usuarios con contraseñas hasheadas (bcrypt)
- Login con generación de tokens JWT
- Protección de rutas con middleware de autenticación
- Control de acceso basado en roles (usuario/admin)

### 4. **Manejo de Errores**

- Middleware centralizado de manejo de errores
- Respuestas consistentes
- Logging de errores

---

## 📡 Endpoints de la API

### **Usuarios**

#### Registrar Usuario
```http
POST /api/usuarios/registro
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "Pass123456",
  "confirmarPassword": "Pass123456",
  "rol": "usuario"
}
```

**Respuesta exitosa (201):**
```json
{
  "mensaje": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 2,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "rol": "usuario"
  }
}
```

#### Iniciar Sesión
```http
POST /api/usuarios/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Respuesta exitosa (200):**
```json
{
  "mensaje": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nombre": "Admin",
    "email": "admin@example.com",
    "rol": "admin"
  }
}
```

#### Obtener Perfil (Requiere autenticación)
```http
GET /api/usuarios/perfil
Authorization: Bearer <tu-token-jwt>
```

#### Listar Usuarios (Requiere autenticación)
```http
GET /api/usuarios
Authorization: Bearer <tu-token-jwt>
```

---

### **Productos**

#### Listar Productos
```http
GET /api/productos
```

**Respuesta exitosa (200):**
```json
{
  "total": 3,
  "productos": [
    {
      "id": 1,
      "nombre": "Laptop",
      "precio": 1200,
      "stock": 10,
      "categoria": "Electrónica"
    },
    ...
  ]
}
```

#### Obtener Producto por ID
```http
GET /api/productos/1
```

#### Crear Producto (Requiere autenticación y rol admin)
```http
POST /api/productos
Authorization: Bearer <tu-token-jwt>
Content-Type: application/json

{
  "nombre": "Monitor 24 pulgadas",
  "precio": 350,
  "stock": 15,
  "categoria": "Electrónica"
}
```

#### Actualizar Producto (Requiere autenticación y rol admin)
```http
PUT /api/productos/1
Authorization: Bearer <tu-token-jwt>
Content-Type: application/json

{
  "precio": 1150,
  "stock": 8
}
```

#### Eliminar Producto (Requiere autenticación y rol admin)
```http
DELETE /api/productos/1
Authorization: Bearer <tu-token-jwt>
```

---

## 🧪 Pruebas con Postman/Thunder Client

### Flujo de Prueba Recomendado

1. **Registrar un usuario nuevo**
   - POST `/api/usuarios/registro`
   - Guarda el token recibido

2. **Iniciar sesión con usuario admin**
   - POST `/api/usuarios/login`
   - Credenciales: `admin@example.com` / `admin123`
   - Guarda el token de admin

3. **Listar productos (sin autenticación)**
   - GET `/api/productos`

4. **Intentar crear producto sin autenticación**
   - POST `/api/productos`
   - Debería retornar error 401

5. **Crear producto con token de admin**
   - POST `/api/productos`
   - Agregar header: `Authorization: Bearer <token-admin>`

6. **Ver perfil de usuario**
   - GET `/api/usuarios/perfil`
   - Agregar header: `Authorization: Bearer <tu-token>`

---

## 💪 Ejercicios Prácticos

### **Ejercicio 1: Middleware Personalizado de Logging**

Crea un middleware que registre información detallada de cada petición.

**Tareas:**
1. Crear archivo `middleware/logger.js`
2. Registrar: timestamp, método, URL, IP, user-agent
3. Guardar logs en un archivo `logs/access.log`
4. Implementar en `server.js`

**Pista:**
```javascript
const fs = require('fs');
const path = require('path');

const logger = (req, res, next) => {
    const log = `${new Date().toISOString()} | ${req.method} | ${req.url} | ${req.ip}\n`;
    // Completar...
};
```

---

### **Ejercicio 2: Validación de Categorías**

Modifica la validación de productos para que solo acepte categorías predefinidas.

**Tareas:**
1. Definir lista de categorías permitidas: `['Electrónica', 'Accesorios', 'Ropa', 'Hogar']`
2. Actualizar validación en `routes/productos.js`
3. Retornar error si la categoría no es válida

**Pista:**
```javascript
body('categoria')
    .isIn(['Electrónica', 'Accesorios', 'Ropa', 'Hogar'])
    .withMessage('Categoría no válida')
```

---

### **Ejercicio 3: Paginación de Productos**

Implementa paginación en el endpoint GET `/api/productos`.

**Tareas:**
1. Aceptar query parameters: `page` y `limit`
2. Validar que sean números positivos
3. Retornar productos paginados con metadata

**Resultado esperado:**
```http
GET /api/productos?page=1&limit=2
```

```json
{
  "total": 5,
  "page": 1,
  "limit": 2,
  "totalPages": 3,
  "productos": [...]
}
```

---

### **Ejercicio 4: Búsqueda de Productos**

Implementa búsqueda por nombre o categoría.

**Tareas:**
1. Agregar endpoint GET `/api/productos/buscar`
2. Aceptar query parameter `q` (query)
3. Buscar en nombre y categoría (case-insensitive)
4. Validar que `q` tenga al menos 2 caracteres

---

### **Ejercicio 5: Sanitización Avanzada**

Implementa sanitización contra inyecciones NoSQL.

**Tareas:**
1. Instalar `express-mongo-sanitize`
2. Agregar middleware en `server.js`
3. Probar enviando `{"email": {"$gt": ""}}` en login
4. Verificar que sea sanitizado

---

### **Ejercicio 6: Rate Limiting por Endpoint**

Configura diferentes límites para distintos endpoints.

**Tareas:**
1. Crear rate limiter específico para búsqueda (100 req/min)
2. Crear rate limiter para eliminación (5 req/hora)
3. Aplicar en rutas correspondientes

---

### **Ejercicio 7: Middleware de Auditoría**

Crea un middleware que registre todas las acciones de modificación.

**Tareas:**
1. Crear `middleware/audit.js`
2. Registrar: usuario, acción (POST/PUT/DELETE), recurso, timestamp
3. Guardar en array o archivo
4. Crear endpoint GET `/api/audit` para ver logs (solo admin)

---

## 🐛 Errores Comunes y Soluciones

### Error: "No autorizado. Token no proporcionado"
**Causa**: No se envió el header Authorization  
**Solución**: Agregar header `Authorization: Bearer <tu-token>`

### Error: "Token inválido o expirado"
**Causa**: Token JWT inválido o expirado (24h)  
**Solución**: Hacer login nuevamente para obtener un nuevo token

### Error: "No tienes permisos para realizar esta acción"
**Causa**: Usuario sin rol de admin intentando acceder a ruta protegida  
**Solución**: Usar un usuario con rol 'admin'

### Error: "Demasiadas peticiones desde esta IP"
**Causa**: Se alcanzó el límite de rate limiting  
**Solución**: Esperar el tiempo especificado o ajustar límites en desarrollo

---

## 🔐 Mejores Prácticas Implementadas

### Seguridad
- ✅ Contraseñas hasheadas con bcrypt
- ✅ Tokens JWT con expiración
- ✅ Headers de seguridad con Helmet
- ✅ Rate limiting contra ataques de fuerza bruta
- ✅ Validación y sanitización de entradas
- ✅ Variables de entorno para secretos

### Código
- ✅ Middleware modularizados
- ✅ Manejo centralizado de errores
- ✅ Rutas organizadas por recurso
- ✅ Validaciones reutilizables
- ✅ Código comentado y documentado

---

## 📚 Recursos Adicionales

- [Express.js Docs](https://expressjs.com/)
- [Express Validator](https://express-validator.github.io/docs/)
- [JWT.io](https://jwt.io/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Helmet.js](https://helmetjs.github.io/)

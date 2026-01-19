# Ejercicio: Migración de PostgreSQL a MongoDB

## 📋 Objetivo

En este ejercicio práctico convertirás la aplicación de persistencia de datos que actualmente usa **PostgreSQL con Sequelize (ORM)** a una que utilice **MongoDB con Mongoose (ODM)**.

Este ejercicio te ayudará a comprender:
- Las diferencias entre bases de datos relacionales (SQL) y NoSQL
- Cómo trabajar con MongoDB y Mongoose
- Las ventajas de usar documentos en lugar de tablas relacionadas
- Cómo adaptar una aplicación existente a un nuevo paradigma de base de datos

---

## 📚 Contexto

La aplicación original (carpeta `persistencia_datos`) utiliza:
- **Backend**: Express + Sequelize + PostgreSQL
- **Frontend**: React + Vite
- **Funcionalidad**: CRUD de Usuarios y Posts con relación uno-a-muchos

Vamos a convertirla para usar MongoDB, que es una base de datos NoSQL basada en documentos.

---

## 🎯 Parte 1: Análisis de la Aplicación Actual

### 1.1 Revisar la estructura actual

Antes de empezar, revisa los archivos existentes en `../persistencia_datos/backend/`:

**models.js** - Modelos con Sequelize:
```javascript
// Modelo Usuario con Sequelize
const Usuario = sequelize.define('Usuario', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true }
});

// Modelo Post con Sequelize
const Post = sequelize.define('Post', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  contenido: { type: DataTypes.TEXT }
});

// Relación: Un usuario tiene muchos posts
Usuario.hasMany(Post, { as: 'posts', foreignKey: 'usuarioId' });
Post.belongsTo(Usuario, { as: 'autor', foreignKey: 'usuarioId' });
```

**index.js** - API REST con Express

### 1.2 Diferencias clave: SQL vs NoSQL

| Característica | PostgreSQL (SQL) | MongoDB (NoSQL) |
|----------------|------------------|-----------------|
| **Estructura** | Tablas con filas y columnas | Colecciones con documentos JSON |
| **Esquema** | Rígido, definido previamente | Flexible, puede cambiar |
| **Relaciones** | Foreign Keys y JOINs | Referencias o documentos embebidos |
| **ORM/ODM** | Sequelize (ORM) | Mongoose (ODM) |
| **IDs** | Integers secuenciales | ObjectId (strings hexadecimales) |
| **Consultas** | SQL | Métodos de Mongoose / MongoDB Query Language |

### 1.3 Estrategias de modelado en MongoDB

Para la relación Usuario-Posts, tienes dos opciones:

**Opción A: Referencias (similar a SQL)**
```javascript
// Usuario
{
  _id: ObjectId("..."),
  nombre: "Juan",
  email: "juan@ejemplo.com"
}

// Post (referencia al usuario)
{
  _id: ObjectId("..."),
  titulo: "Mi post",
  contenido: "...",
  autor: ObjectId("...") // Referencia al usuario
}
```

**Opción B: Documentos embebidos**
```javascript
// Usuario con posts embebidos
{
  _id: ObjectId("..."),
  nombre: "Juan",
  email: "juan@ejemplo.com",
  posts: [
    { titulo: "Post 1", contenido: "..." },
    { titulo: "Post 2", contenido: "..." }
  ]
}
```

**Para este ejercicio usaremos la Opción A (referencias)**, ya que es más similar a la estructura SQL y permite mejor escalabilidad.

---

## 🛠️ Parte 2: Configuración del Entorno

### 2.1 Crear la estructura de carpetas

```bash
cd codigo
mkdir persistencia_mongodb
cd persistencia_mongodb
mkdir backend frontend
```

### 2.2 Instalar MongoDB con Docker

Crea un archivo `backend/docker-compose.yaml`:

```yaml
services:
  mongodb:
    image: mongo:8.0
    container_name: mongodb_persistencia
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER:-admin}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD:-admin123}
    ports:
      - "${MONGO_PORT:-27017}:27017"
    volumes:
      - mongodb_data:/data/db

  mongo-express:
    image: mongo-express:latest
    container_name: mongo_express_persistencia
    restart: unless-stopped
    ports:
      - "${MONGO_EXPRESS_PORT:-8081}:8081"
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: ${MONGO_USER:-admin}
      ME_CONFIG_MONGODB_ADMINPASSWORD: ${MONGO_PASSWORD:-admin123}
      ME_CONFIG_MONGODB_URL: mongodb://${MONGO_USER:-admin}:${MONGO_PASSWORD:-admin123}@mongodb:27017/
      ME_CONFIG_BASICAUTH: false
    depends_on:
      - mongodb

volumes:
  mongodb_data:
```

### 2.3 Crear archivo de variables de entorno

Crea `backend/.env`:

```env
# MongoDB Configuration
MONGO_USER=admin
MONGO_PASSWORD=admin123
MONGO_PORT=27017
MONGO_DATABASE=persistencia_db

# MongoDB Connection String
MONGODB_URI=mongodb://admin:admin123@localhost:27017/persistencia_db?authSource=admin

# Mongo Express
MONGO_EXPRESS_PORT=8081

# Server
PORT=3000
```

Crea también `backend/.env.example` (sin valores sensibles):

```env
# MongoDB Configuration
MONGO_USER=
MONGO_PASSWORD=
MONGO_PORT=27017
MONGO_DATABASE=persistencia_db

# MongoDB Connection String
MONGODB_URI=mongodb://user:password@localhost:27017/persistencia_db?authSource=admin

# Mongo Express
MONGO_EXPRESS_PORT=8081

# Server
PORT=3000
```

### 2.4 Iniciar MongoDB

```bash
cd backend
docker compose up -d
```

Verifica que esté corriendo:
```bash
docker compose ps
```

Accede a Mongo Express en: `http://localhost:8081`

---

## 💻 Parte 3: Implementar el Backend con MongoDB

### 3.1 Inicializar el proyecto

```bash
cd backend
npm init -y
npm install express cors mongoose dotenv
```

Actualiza `package.json`:
```json
{
  "name": "ejemplo-persistencia-mongodb",
  "version": "1.0.0",
  "description": "Ejemplo de persistencia con MongoDB y Mongoose",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongoose": "^8.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

### 3.2 Crear los modelos con Mongoose

Crea `backend/models.js`:

```javascript
const mongoose = require('mongoose');
require('dotenv').config();

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

// Esquema de Usuario
const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido']
  }
}, {
  timestamps: true, // Crea createdAt y updatedAt automáticamente
  toJSON: { virtuals: true }, // Incluye campos virtuales en JSON
  toObject: { virtuals: true }
});

// Campo virtual para los posts del usuario (población)
usuarioSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'autor'
});

// Esquema de Post
const postSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true,
    minlength: [3, 'El título debe tener al menos 3 caracteres']
  },
  contenido: {
    type: String,
    trim: true
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El autor es requerido']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Modelos
const Usuario = mongoose.model('Usuario', usuarioSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = { connectDB, Usuario, Post };
```

### 3.3 Crear el servidor Express

Crea `backend/index.js`:

```javascript
const express = require('express');
const cors = require('cors');
const { connectDB, Usuario, Post } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// ==================== RUTAS DE USUARIOS ====================

// Crear usuario
app.post('/api/usuarios', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    // Manejo de errores de validación de Mongoose
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    // Error de duplicado (email único)
    if (err.code === 11000) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Listar usuarios con sus posts
app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find()
      .populate('posts') // Popula el campo virtual 'posts'
      .sort({ createdAt: -1 }); // Ordena por fecha de creación descendente
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un usuario específico
app.get('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).populate('posts');
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    // Error de ObjectId inválido
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Actualizar usuario
app.put('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, // Retorna el documento actualizado
        runValidators: true // Ejecuta las validaciones del esquema
      }
    );
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    if (err.code === 11000) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Eliminar usuario (y sus posts)
app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // Eliminar todos los posts del usuario
    await Post.deleteMany({ autor: req.params.id });
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== RUTAS DE POSTS ====================

// Crear post para un usuario
app.post('/api/usuarios/:usuarioId/posts', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    const post = await Post.create({
      ...req.body,
      autor: req.params.usuarioId
    });
    
    // Popula el autor antes de enviar la respuesta
    await post.populate('autor');
    res.status(201).json(post);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    res.status(500).json({ error: err.message });
  }
});

// Listar posts con información del autor
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('autor', 'nombre email') // Popula solo nombre y email del autor
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { titulo: req.body.titulo, contenido: req.body.contenido },
      { new: true, runValidators: true }
    ).populate('autor');
    
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json(post);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    res.status(500).json({ error: err.message });
  }
});

// Eliminar post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json({ mensaje: 'Post eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== SERVIDOR ====================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
```

---

## 🎨 Parte 4: Frontend

El frontend puede mantenerse exactamente igual porque:
- La API REST tiene los mismos endpoints
- Los datos JSON tienen la misma estructura básica
- React maneja los IDs como valores, no importa su tipo
- Los formularios envían los IDs como strings de todas formas
- Las comparaciones funcionan igual

---

## ▶️ Parte 5: Ejecutar la Aplicación

### 5.1 Iniciar MongoDB

```bash
cd codigo/persistencia_mongodb/backend
docker compose up -d
```

### 5.2 Iniciar el Backend

```bash
cd codigo/persistencia_mongodb/backend
npm start
```

Deberías ver:
```
✅ Conectado a MongoDB
🚀 Servidor escuchando en http://localhost:3000
```

### 5.3 Iniciar el Frontend

```bash
cd codigo/persistencia_mongodb/frontend
npm install  # Solo la primera vez
npm run dev
```

### 5.4 Probar la aplicación

1. Abre `http://localhost:5173` en tu navegador
2. Crea algunos usuarios
3. Crea posts para esos usuarios
4. Prueba editar y eliminar

### 5.5 Explorar los datos en Mongo Express

1. Abre `http://localhost:8081`
2. Selecciona la base de datos `persistencia_db`
3. Verás las colecciones `usuarios` y `posts`
4. Puedes ver los documentos almacenados

---

## 🔍 Parte 6: Comparación y Análisis

### 6.1 Ejercicios de Comparación

**Ejercicio A: Comparar estructuras de datos**

1. Crea un usuario en PostgreSQL y MongoDB
2. Observa cómo se almacenan en cada base de datos
3. ¿Qué diferencias notas en los IDs?
4. ¿Cómo se manejan los timestamps?

**Ejercicio B: Consultas**

Compara estas operaciones:

| Operación | Sequelize (PostgreSQL) | Mongoose (MongoDB) |
|-----------|------------------------|-------------------|
| Crear | `Usuario.create({...})` | `Usuario.create({...})` |
| Buscar todos | `Usuario.findAll()` | `Usuario.find()` |
| Buscar por ID | `Usuario.findByPk(id)` | `Usuario.findById(id)` |
| Con relaciones | `include: 'posts'` | `populate('posts')` |
| Actualizar | `usuario.update({...})` | `findByIdAndUpdate(...)` |
| Eliminar | `usuario.destroy()` | `findByIdAndDelete(id)` |

**Ejercicio C: Validaciones**

1. Intenta crear un usuario sin email en ambas versiones
2. Intenta crear dos usuarios con el mismo email
3. Observa cómo manejan los errores

### 6.2 Preguntas de Reflexión

1. **Flexibilidad del esquema**: ¿Qué pasa si quieres agregar un nuevo campo "edad" a Usuario? ¿Es más fácil en SQL o en MongoDB?

2. **Relaciones**: En SQL usamos foreign keys, en MongoDB usamos referencias. ¿Cuál es más eficiente para este caso?

3. **Consultas complejas**: Si necesitaras hacer un JOIN entre 4 tablas, ¿preferirías SQL o MongoDB?

4. **Escalabilidad**: MongoDB es más fácil de escalar horizontalmente. ¿En qué escenarios sería importante?

---

## 🚀 Parte 7: Extensiones y Mejoras

### 7.1 Agregar campo de fecha de publicación

Modifica el esquema de Post para agregar un campo `fechaPublicacion`:

```javascript
const postSchema = new mongoose.Schema({
  // ... campos existentes
  fechaPublicacion: {
    type: Date,
    default: null
  },
  publicado: {
    type: Boolean,
    default: false
  }
});
```

### 7.2 Agregar métodos personalizados

```javascript
// Método de instancia
usuarioSchema.methods.saludar = function() {
  return `Hola, soy ${this.nombre}`;
};

// Método estático
usuarioSchema.statics.buscarPorEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Uso:
const usuario = await Usuario.buscarPorEmail('juan@ejemplo.com');
console.log(usuario.saludar());
```

### 7.3 Agregar índices para mejorar rendimiento

```javascript
// Índice en el campo email para búsquedas más rápidas
usuarioSchema.index({ email: 1 });

// Índice compuesto
postSchema.index({ autor: 1, createdAt: -1 });
```

### 7.4 Implementar búsqueda de texto completo

```javascript
// En el esquema
postSchema.index({ titulo: 'text', contenido: 'text' });

// Ruta de búsqueda
app.get('/api/posts/buscar', async (req, res) => {
  try {
    const { q } = req.query;
    const posts = await Post.find({ $text: { $search: q } })
      .populate('autor')
      .sort({ score: { $meta: 'textScore' } });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

### 7.5 Agregar paginación

```javascript
app.get('/api/posts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('autor')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments();

    res.json({
      posts,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

---

## 📝 Parte 8: Checklist de Implementación

Usa este checklist para verificar tu progreso:

### Configuración
- [ ] MongoDB corriendo en Docker
- [ ] Mongo Express accesible
- [ ] Variables de entorno configuradas
- [ ] Dependencias instaladas

### Backend
- [ ] `models.js` con esquemas de Mongoose
- [ ] Conexión a MongoDB exitosa
- [ ] Todas las rutas implementadas:
  - [ ] POST /api/usuarios
  - [ ] GET /api/usuarios
  - [ ] GET /api/usuarios/:id
  - [ ] PUT /api/usuarios/:id
  - [ ] DELETE /api/usuarios/:id
  - [ ] POST /api/usuarios/:usuarioId/posts
  - [ ] GET /api/posts
  - [ ] PUT /api/posts/:id
  - [ ] DELETE /api/posts/:id
- [ ] Validaciones funcionando
- [ ] Manejo de errores implementado
- [ ] Populate (relaciones) funcionando

### Frontend
- [ ] Archivos copiados o creados
- [ ] Dependencias instaladas
- [ ] Proxy configurado en vite.config.js
- [ ] Aplicación corriendo en el navegador

### Pruebas
- [ ] Crear usuarios
- [ ] Listar usuarios
- [ ] Crear posts
- [ ] Editar usuarios y posts
- [ ] Eliminar usuarios y posts
- [ ] Verificar datos en Mongo Express

---

## 🎓 Parte 9: Preguntas de Evaluación 

Responde (EN TUS PROPIAS PALABRAS) estas preguntas para consolidar tu aprendizaje:

1. **¿Cuál es la principal diferencia entre un ORM y un ODM?**

2. **¿Por qué MongoDB usa ObjectIds en lugar de integers?**

3. **Explica qué hace el método `.populate()` en Mongoose**

4. **¿Cuándo usarías documentos embebidos en lugar de referencias?**

5. **¿Qué ventajas tiene MongoDB sobre PostgreSQL para este caso de uso?**

6. **¿Qué ventajas tiene PostgreSQL sobre MongoDB?**

7. **¿Cómo se manejan las transacciones en MongoDB?** (investiga)

8. **¿Qué es un índice y por qué es importante?**

---

## 📚 Recursos Adicionales

### Documentación
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [MongoDB University](https://university.mongodb.com/) - Cursos gratis

### Comparaciones
- [SQL vs NoSQL](https://www.mongodb.com/nosql-explained/nosql-vs-sql)
- [When to Use MongoDB](https://www.mongodb.com/compare/mongodb-postgresql)

### Tutoriales
- [Mongoose Getting Started](https://mongoosejs.com/docs/index.html)
- [MongoDB CRUD Operations](https://docs.mongodb.com/manual/crud/)

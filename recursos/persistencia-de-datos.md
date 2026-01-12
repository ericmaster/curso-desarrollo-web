# Persistencia de Datos

## Índice
1. [Introducción](#introducción)
2. [¿Qué es la Persistencia de Datos?](#qué-es-la-persistencia-de-datos)
3. [Tipos de Bases de Datos](#tipos-de-bases-de-datos)
   - [Bases de Datos Relacionales (SQL)](#bases-de-datos-relacionales-sql)
   - [Bases de Datos NoSQL](#bases-de-datos-nosql)
4. [ORM y ODM](#orm-y-odm)
   - [ORM (Object-Relational Mapping)](#orm-object-relational-mapping)
   - [ODM (Object-Document Mapping)](#odm-object-document-mapping)
5. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## Introducción

La persistencia de datos es un concepto fundamental en el desarrollo de aplicaciones modernas. Permite que la información generada y manipulada por una aplicación se mantenga disponible incluso después de que el programa se cierre o el sistema se reinicie.

## ¿Qué es la Persistencia de Datos?

La **persistencia de datos** se refiere a la característica de los datos de sobrevivir más allá de la ejecución del proceso que los creó. En otras palabras, es la capacidad de almacenar información de manera permanente para poder acceder a ella posteriormente.

### Características principales:
- **Durabilidad**: Los datos persisten en el tiempo
- **Consistencia**: Los datos mantienen su integridad
- **Disponibilidad**: Los datos pueden ser recuperados cuando se necesiten
- **Seguridad**: Los datos están protegidos contra pérdida o corrupción

### ¿Por qué es importante?
- Mantener el estado de la aplicación entre sesiones
- Almacenar información de usuarios
- Guardar transacciones y registros históricos
- Compartir datos entre diferentes sistemas
- Cumplir con requisitos legales y de auditoría

---

## Tipos de Bases de Datos

### Bases de Datos Relacionales (SQL)

Las bases de datos relacionales organizan los datos en **tablas** con filas y columnas. Utilizan el lenguaje SQL (Structured Query Language) para consultas y manipulación de datos.

#### Características:
- **Estructura rígida**: Esquema definido previamente
- **Relaciones**: Conexiones entre tablas mediante claves foráneas
- **ACID**: Garantizan Atomicidad, Consistencia, Aislamiento y Durabilidad
- **Normalización**: Reducción de redundancia de datos
- **Integridad referencial**: Mantiene la consistencia entre tablas relacionadas

#### Ventajas:
- ✅ Estructura clara y predecible
- ✅ Consultas complejas mediante JOINs
- ✅ Transacciones seguras
- ✅ Madurez y amplio soporte
- ✅ Herramientas robustas de gestión

#### Desventajas:
- ❌ Menos flexible para datos no estructurados
- ❌ Escalabilidad horizontal más compleja
- ❌ Requiere definir esquema antes de usar

#### Ejemplos de bases de datos relacionales:
- **PostgreSQL**: Base de datos open-source muy robusta
- **MySQL/MariaDB**: Popular en aplicaciones web
- **SQLite**: Base de datos ligera, ideal para aplicaciones móviles
- **Microsoft SQL Server**: Solución empresarial de Microsoft
- **Oracle Database**: Solución empresarial de alto rendimiento

#### Ejemplo de estructura:

```sql
-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de posts
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT,
    usuario_id INTEGER REFERENCES usuarios(id),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Consulta con JOIN
SELECT u.nombre, p.titulo, p.fecha_creacion
FROM usuarios u
INNER JOIN posts p ON u.id = p.usuario_id
WHERE u.email = 'usuario@ejemplo.com';
```

---

### Bases de Datos NoSQL

Las bases de datos NoSQL (Not Only SQL) están diseñadas para almacenar datos de manera más flexible que las bases de datos relacionales.

#### Tipos principales:

##### 1. **Bases de Datos de Documentos**
Almacenan datos en documentos similares a JSON.

**Ejemplos**: MongoDB, CouchDB, Firestore

**Casos de uso**:
- Aplicaciones web y móviles
- Gestión de contenido
- Catálogos de productos
- Perfiles de usuario

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "posts": [
    {
      "titulo": "Mi primer post",
      "contenido": "Contenido del post...",
      "fecha": "2024-01-15"
    }
  ]
}
```

##### 2. **Bases de Datos Clave-Valor**
Almacenan pares clave-valor simples.

**Ejemplos**: Redis, DynamoDB, Memcached

**Casos de uso**:
- Caché de datos
- Gestión de sesiones
- Colas de mensajes
- Configuraciones

```javascript
// Ejemplo conceptual
key: "usuario:12345"
value: { nombre: "Juan", edad: 30, ciudad: "Madrid" }
```

##### 3. **Bases de Datos de Grafos**
Optimizadas para datos altamente conectados.

**Ejemplos**: Neo4j, Amazon Neptune, ArangoDB

**Casos de uso**:
- Redes sociales
- Sistemas de recomendación
- Detección de fraude
- Gestión de conocimiento

##### 4. **Bases de Datos de Columnas**
Almacenan datos por columnas en lugar de filas.

**Ejemplos**: Cassandra, HBase, ClickHouse

**Casos de uso**:
- Analytics en tiempo real
- Big Data
- Series temporales
- Data warehousing

#### Ventajas de NoSQL:
- ✅ Flexibilidad en el esquema
- ✅ Escalabilidad horizontal (sharding)
- ✅ Alto rendimiento en lectura/escritura
- ✅ Ideal para datos no estructurados
- ✅ Desarrollo ágil

#### Desventajas de NoSQL:
- ❌ Eventual consistency (no siempre ACID)
- ❌ Menos estandarización
- ❌ Consultas complejas más difíciles
- ❌ Curva de aprendizaje diferente

---

## ORM y ODM

### ORM (Object-Relational Mapping)

Un **ORM** es una técnica de programación que permite convertir datos entre sistemas de tipos incompatibles usando programación orientada a objetos. Actúa como un puente entre el código de tu aplicación y la base de datos relacional.

#### ¿Qué hace un ORM?
- Mapea clases de tu código a tablas de base de datos
- Convierte objetos a registros de base de datos y viceversa
- Abstrae las consultas SQL
- Gestiona relaciones entre entidades
- Facilita migraciones de esquema

#### Ventajas:
- ✅ Código más limpio y mantenible
- ✅ Independencia de la base de datos específica
- ✅ Previene inyección SQL
- ✅ Validación de datos integrada
- ✅ Migraciones versionadas

#### Desventajas:
- ❌ Curva de aprendizaje inicial
- ❌ Puede generar consultas ineficientes
- ❌ Overhead de rendimiento en casos simples

#### ORMs populares por lenguaje:

**JavaScript/Node.js**:
- **Sequelize**: ORM maduro y completo
- **TypeORM**: TypeScript-first, soporta muchos motores
- **Prisma**: Moderno, type-safe, con excelente DX
- **Knex.js**: Query builder (no es ORM completo)

**Python**:
- **SQLAlchemy**: Muy potente y flexible
- **Django ORM**: Integrado en Django framework
- **Peewee**: Ligero y simple

**PHP**:
- **Eloquent**: ORM de Laravel
- **Doctrine**: ORM completo y maduro

**Ruby**:
- **Active Record**: ORM de Ruby on Rails

#### Ejemplo con Sequelize (Node.js):

```javascript
// Instalación
// npm install sequelize pg pg-hstore

const { Sequelize, DataTypes } = require('sequelize');

// Conexión a la base de datos
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

// Definición del modelo Usuario
const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  edad: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 120
    }
  }
}, {
  timestamps: true // createdAt, updatedAt automáticos
});

// Definición del modelo Post
const Post = sequelize.define('Post', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contenido: {
    type: DataTypes.TEXT
  },
  publicado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// Definir relaciones
Usuario.hasMany(Post, {
  foreignKey: 'usuarioId',
  as: 'posts'
});

Post.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'autor'
});

// Sincronizar con la base de datos
await sequelize.sync();

// Crear un usuario
const nuevoUsuario = await Usuario.create({
  nombre: 'María García',
  email: 'maria@ejemplo.com',
  edad: 28
});

// Crear un post asociado
const nuevoPost = await Post.create({
  titulo: 'Mi primer artículo',
  contenido: 'Este es el contenido de mi artículo...',
  usuarioId: nuevoUsuario.id
});

// Consultar con relaciones
const usuario = await Usuario.findOne({
  where: { email: 'maria@ejemplo.com' },
  include: [{
    model: Post,
    as: 'posts'
  }]
});

console.log(usuario.posts); // Array de posts del usuario

// Actualizar
await usuario.update({ edad: 29 });

// Eliminar
await usuario.destroy();
```

#### Ejemplo con Prisma (Node.js/TypeScript):

```javascript
// Instalación
// npm install @prisma/client
// npm install -D prisma

// schema.prisma
/*
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Usuario {
  id        Int      @id @default(autoincrement())
  nombre    String
  email     String   @unique
  edad      Int?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id         Int      @id @default(autoincrement())
  titulo     String
  contenido  String?
  publicado  Boolean  @default(false)
  autor      Usuario  @relation(fields: [autorId], references: [id])
  autorId    Int
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
*/

// Código TypeScript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Crear usuario con posts
const nuevoUsuario = await prisma.usuario.create({
  data: {
    nombre: 'Carlos Ruiz',
    email: 'carlos@ejemplo.com',
    edad: 32,
    posts: {
      create: [
        {
          titulo: 'Primer post',
          contenido: 'Contenido del primer post'
        },
        {
          titulo: 'Segundo post',
          contenido: 'Contenido del segundo post',
          publicado: true
        }
      ]
    }
  },
  include: {
    posts: true
  }
});

// Consultar con relaciones
const usuarios = await prisma.usuario.findMany({
  where: {
    posts: {
      some: {
        publicado: true
      }
    }
  },
  include: {
    posts: {
      where: {
        publicado: true
      }
    }
  }
});

// Actualizar
await prisma.usuario.update({
  where: { id: 1 },
  data: { edad: 33 }
});

// Eliminar
await prisma.post.delete({
  where: { id: 1 }
});
```

---

### ODM (Object-Document Mapping)

Un **ODM** es similar a un ORM, pero específicamente diseñado para bases de datos de documentos (NoSQL). Mapea objetos de tu código a documentos en la base de datos.

#### Diferencias con ORM:
- Trabaja con documentos en lugar de tablas
- Esquema más flexible
- No hay JOINs tradicionales
- Relaciones mediante referencias o embebido

#### ODMs populares:

**JavaScript/Node.js + MongoDB**:
- **Mongoose**: El más popular para MongoDB
- **Typegoose**: Mongoose con TypeScript
- **Prisma**: También soporta MongoDB

**Python + MongoDB**:
- **MongoEngine**: ODM robusto
- **PyMongo**: Driver oficial (no es ODM completo)

#### Ejemplo con Mongoose (Node.js + MongoDB):

```javascript
// Instalación
// npm install mongoose

const mongoose = require('mongoose');

// Conexión a MongoDB
await mongoose.connect('mongodb://localhost:27017/mi-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definir esquema de Usuario
const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Email inválido'
    }
  },
  edad: {
    type: Number,
    min: 0,
    max: 120
  },
  rol: {
    type: String,
    enum: ['usuario', 'admin', 'moderador'],
    default: 'usuario'
  },
  perfil: {
    avatar: String,
    bio: String,
    ubicacion: String
  },
  // Posts embebidos (enfoque 1)
  posts: [{
    titulo: String,
    contenido: String,
    fecha: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true // createdAt, updatedAt
});

// Métodos de instancia
usuarioSchema.methods.saludar = function() {
  return `Hola, soy ${this.nombre}`;
};

// Métodos estáticos
usuarioSchema.statics.buscarPorEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Middleware (hooks)
usuarioSchema.pre('save', function(next) {
  console.log('Guardando usuario...');
  next();
});

// Crear modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Esquema de Post (enfoque 2: referencia)
const postSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  contenido: String,
  publicado: {
    type: Boolean,
    default: false
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Referencia al modelo Usuario
    required: true
  },
  etiquetas: [String],
  comentarios: [{
    autor: String,
    texto: String,
    fecha: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

// --- OPERACIONES CRUD ---

// Crear usuario
const nuevoUsuario = new Usuario({
  nombre: 'Ana Martínez',
  email: 'ana@ejemplo.com',
  edad: 27,
  perfil: {
    bio: 'Desarrolladora web',
    ubicacion: 'Barcelona'
  }
});

await nuevoUsuario.save();
// O directamente:
const usuario2 = await Usuario.create({
  nombre: 'Luis Torres',
  email: 'luis@ejemplo.com',
  edad: 35
});

// Crear post con referencia
const nuevoPost = await Post.create({
  titulo: 'Introducción a MongoDB',
  contenido: 'MongoDB es una base de datos NoSQL...',
  autor: nuevoUsuario._id,
  etiquetas: ['mongodb', 'nosql', 'databases'],
  publicado: true
});

// Buscar
const usuario = await Usuario.findById(nuevoUsuario._id);
const usuarios = await Usuario.find({ edad: { $gte: 25 } });
const usuarioPorEmail = await Usuario.buscarPorEmail('ana@ejemplo.com');

// Buscar con población (populate) de referencias
const post = await Post.findById(nuevoPost._id).populate('autor');
console.log(post.autor.nombre); // 'Ana Martínez'

// Buscar posts de un usuario
const postsDeUsuario = await Post.find({ autor: nuevoUsuario._id });

// Actualizar
await Usuario.updateOne(
  { _id: nuevoUsuario._id },
  { $set: { edad: 28 } }
);

// O encontrar y actualizar
const usuarioActualizado = await Usuario.findByIdAndUpdate(
  nuevoUsuario._id,
  { edad: 28 },
  { new: true } // Retorna el documento actualizado
);

// Actualizar con operadores de MongoDB
await Post.updateOne(
  { _id: nuevoPost._id },
  { 
    $push: { 
      comentarios: {
        autor: 'Pedro',
        texto: '¡Excelente artículo!'
      }
    }
  }
);

// Eliminar
await Usuario.deleteOne({ _id: nuevoUsuario._id });
await Post.findByIdAndDelete(nuevoPost._id);

// Consultas avanzadas
const usuariosActivos = await Usuario.find({
  edad: { $gte: 18, $lte: 65 },
  rol: { $in: ['usuario', 'admin'] }
})
  .select('nombre email') // Solo estos campos
  .sort({ nombre: 1 }) // Ordenar ascendente
  .limit(10)
  .skip(0);

// Agregaciones
const estadisticas = await Post.aggregate([
  { $match: { publicado: true } },
  { 
    $group: {
      _id: '$autor',
      totalPosts: { $sum: 1 },
      ultimoPost: { $max: '$createdAt' }
    }
  }
]);
```

---

## Ejemplos Prácticos

### Ejemplo 1: Sistema de Blog con ORM (Sequelize + PostgreSQL)

```javascript
// models/index.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

// Modelo Usuario
const Usuario = sequelize.define('Usuario', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }
});

// Modelo Categoria
const Categoria = sequelize.define('Categoria', {
  nombre: { type: DataTypes.STRING, unique: true, allowNull: false },
  descripcion: DataTypes.TEXT
});

// Modelo Post
const Post = sequelize.define('Post', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  contenido: DataTypes.TEXT,
  publicado: { type: DataTypes.BOOLEAN, defaultValue: false },
  slug: { type: DataTypes.STRING, unique: true }
});

// Modelo Comentario
const Comentario = sequelize.define('Comentario', {
  contenido: { type: DataTypes.TEXT, allowNull: false }
});

// Relaciones
Usuario.hasMany(Post, { as: 'posts', foreignKey: 'autorId' });
Post.belongsTo(Usuario, { as: 'autor', foreignKey: 'autorId' });

Post.belongsToMany(Categoria, { through: 'PostCategorias' });
Categoria.belongsToMany(Post, { through: 'PostCategorias' });

Usuario.hasMany(Comentario, { foreignKey: 'autorId' });
Comentario.belongsTo(Usuario, { as: 'autor', foreignKey: 'autorId' });

Post.hasMany(Comentario, { foreignKey: 'postId' });
Comentario.belongsTo(Post, { foreignKey: 'postId' });

// routes/posts.js
const express = require('express');
const router = express.Router();
const { Post, Usuario, Categoria, Comentario } = require('../models');

// Obtener todos los posts publicados
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { publicado: true },
      include: [
        { model: Usuario, as: 'autor', attributes: ['nombre'] },
        { model: Categoria, attributes: ['nombre'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un post con comentarios
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: Usuario, as: 'autor' },
        { model: Categoria },
        { 
          model: Comentario,
          include: [{ model: Usuario, as: 'autor' }]
        }
      ]
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear post
router.post('/posts', async (req, res) => {
  try {
    const { titulo, contenido, categorias, autorId } = req.body;
    
    const post = await Post.create({
      titulo,
      contenido,
      autorId,
      slug: titulo.toLowerCase().replace(/\s+/g, '-')
    });
    
    if (categorias && categorias.length > 0) {
      const categoriasObj = await Categoria.findAll({
        where: { id: categorias }
      });
      await post.setCategoria(categoriasObj);
    }
    
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
```

### Ejemplo 2: E-commerce con ODM (Mongoose + MongoDB)

```javascript
// models/Producto.js
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: String,
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  categoria: {
    type: String,
    enum: ['Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Otros'],
    required: true
  },
  imagenes: [String],
  especificaciones: {
    marca: String,
    modelo: String,
    color: String,
    peso: Number
  },
  reviews: [{
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    },
    calificacion: {
      type: Number,
      min: 1,
      max: 5
    },
    comentario: String,
    fecha: {
      type: Date,
      default: Date.now
    }
  }],
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual para calificación promedio
productoSchema.virtual('calificacionPromedio').get(function() {
  if (this.reviews.length === 0) return 0;
  const suma = this.reviews.reduce((acc, review) => acc + review.calificacion, 0);
  return suma / this.reviews.length;
});

// Método para verificar disponibilidad
productoSchema.methods.estaDisponible = function(cantidad) {
  return this.activo && this.stock >= cantidad;
};

module.exports = mongoose.model('Producto', productoSchema);

// models/Pedido.js
const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  items: [{
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto'
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1
    },
    precioUnitario: Number
  }],
  total: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'],
    default: 'Pendiente'
  },
  direccionEnvio: {
    calle: String,
    ciudad: String,
    codigoPostal: String,
    pais: String
  }
}, {
  timestamps: true
});

// Middleware para calcular el total
pedidoSchema.pre('save', async function(next) {
  if (this.isModified('items')) {
    const Producto = mongoose.model('Producto');
    let total = 0;
    
    for (let item of this.items) {
      const producto = await Producto.findById(item.producto);
      item.precioUnitario = producto.precio;
      total += producto.precio * item.cantidad;
    }
    
    this.total = total;
  }
  next();
});

module.exports = mongoose.model('Pedido', pedidoSchema);

// routes/productos.js
const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');
const Pedido = require('../models/Pedido');

// Listar productos con filtros
router.get('/productos', async (req, res) => {
  try {
    const { categoria, precioMin, precioMax, busqueda } = req.query;
    
    const filtros = { activo: true };
    
    if (categoria) filtros.categoria = categoria;
    if (precioMin || precioMax) {
      filtros.precio = {};
      if (precioMin) filtros.precio.$gte = Number(precioMin);
      if (precioMax) filtros.precio.$lte = Number(precioMax);
    }
    if (busqueda) {
      filtros.$or = [
        { nombre: new RegExp(busqueda, 'i') },
        { descripcion: new RegExp(busqueda, 'i') }
      ];
    }
    
    const productos = await Producto.find(filtros)
      .sort({ createdAt: -1 })
      .limit(20);
    
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener producto con reviews poblados
router.get('/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id)
      .populate('reviews.usuario', 'nombre');
    
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json({
      ...producto.toObject(),
      calificacionPromedio: producto.calificacionPromedio
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear pedido
router.post('/pedidos', async (req, res) => {
  try {
    const { usuarioId, items, direccionEnvio } = req.body;
    
    // Verificar stock
    for (let item of items) {
      const producto = await Producto.findById(item.producto);
      if (!producto.estaDisponible(item.cantidad)) {
        return res.status(400).json({
          error: `Producto ${producto.nombre} no disponible`
        });
      }
    }
    
    // Crear pedido
    const pedido = await Pedido.create({
      usuario: usuarioId,
      items,
      direccionEnvio
    });
    
    // Reducir stock
    for (let item of items) {
      await Producto.updateOne(
        { _id: item.producto },
        { $inc: { stock: -item.cantidad } }
      );
    }
    
    await pedido.populate('items.producto');
    
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
```

---

## Comparación: ¿Cuándo usar cada tipo?

### Usa SQL/ORM cuando:
- Necesitas transacciones complejas
- Los datos tienen relaciones claras y estructuradas
- Requieres consultas complejas con JOINs
- La integridad de datos es crítica
- Aplicaciones financieras, ERP, CRM

### Usa NoSQL/ODM cuando:
- Necesitas escalabilidad horizontal
- Los datos son flexibles o cambian frecuentemente
- Requieres alto rendimiento en lectura/escritura
- Trabajas con grandes volúmenes de datos
- Aplicaciones en tiempo real, IoT, redes sociales

### Enfoque híbrido:
Muchas aplicaciones modernas combinan ambos tipos:
- SQL para datos transaccionales críticos
- NoSQL para caché, logs, datos analíticos

---

## Recursos Adicionales

### Documentación Oficial:
- **Sequelize**: https://sequelize.org/
- **Prisma**: https://www.prisma.io/
- **Mongoose**: https://mongoosejs.com/
- **TypeORM**: https://typeorm.io/

### Bases de datos:
- **PostgreSQL**: https://www.postgresql.org/
- **MongoDB**: https://www.mongodb.com/
- **Redis**: https://redis.io/
- **SQLite**: https://www.sqlite.org/

### Tutoriales y cursos:
- freeCodeCamp Database courses
- MongoDB University
- PostgreSQL Tutorial
- Prisma Getting Started Guide

---

## Conclusión

La persistencia de datos es fundamental en el desarrollo de aplicaciones modernas. Elegir entre bases de datos relacionales (SQL) y NoSQL depende de tus necesidades específicas:

- **SQL/ORM**: Estructura, relaciones, transacciones, integridad
- **NoSQL/ODM**: Flexibilidad, escalabilidad, rendimiento, datos no estructurados

Las herramientas ORM y ODM facilitan enormemente el trabajo con bases de datos al proporcionar una capa de abstracción que permite trabajar con objetos en lugar de escribir SQL o consultas nativas directamente.

La clave es entender los requisitos de tu aplicación y elegir la tecnología que mejor se adapte a tus necesidades.

const mongoose = require('mongoose');
require('dotenv').config();

// 1. Configuración de la conexión a MongoDB
const connectDB = async () => {
  try {
    // Usa la URI de tu archivo .env
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error(' Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

// 2. Definición del Esquema de Usuario (NoSQL)
const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido']
  }
}, {
  timestamps: true, // Crea createdAt y updatedAt automáticamente
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Relación Virtual: permite ver los posts desde el usuario sin guardarlos físicamente ahí
usuarioSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'autor'
});

// 3. Definición del Esquema de Post
const postSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true
  },
  contenido: {
    type: String,
    trim: true
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId, // Referencia al ID de MongoDB del Usuario
    ref: 'Usuario',
    required: [true, 'El autor es requerido']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// 4. Exportar modelos y la función de conexión
const Usuario = mongoose.model('Usuario', usuarioSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = { connectDB, Usuario, Post };
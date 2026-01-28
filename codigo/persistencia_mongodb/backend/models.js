const mongoose = require('mongoose');
require('dotenv').config();

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
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
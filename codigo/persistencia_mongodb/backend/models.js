const mongoose = require('mongoose');

// 1. Definición del Esquema de Usuario
const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true }); // Agrega automáticamente fecha de creación y actualización

// 2. Definición del Esquema de Post (con relación al Usuario)
const postSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  contenido: {
    type: String
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId, // Referencia al ID de MongoDB del usuario
    ref: 'Usuario',
    required: true
  }
}, { timestamps: true });

// 3. Creación de los Modelos
const Usuario = mongoose.model('Usuario', usuarioSchema);
const Post = mongoose.model('Post', postSchema);

// Exportamos solo los modelos creados
module.exports = { Usuario, Post };
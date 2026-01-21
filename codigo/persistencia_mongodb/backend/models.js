const mongoose = require('mongoose');
require('dotenv').config();

// Función para conectar a MongoDB usando la URI de Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

// Esquema de Usuario (Equivalente al modelo Usuario de Sequelize)
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
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Relación virtual: Un usuario tiene muchos posts (Simula el hasMany)
usuarioSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'autor'
});

// Esquema de Post (Equivalente al modelo Post de Sequelize)
const postSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es requerido'],
    minlength: [3, 'El título debe tener al menos 3 caracteres']
  },
  contenido: {
    type: String
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId, // Referencia al ID del Usuario
    ref: 'Usuario',
    required: [true, 'El autor es requerido']
  }
}, { timestamps: true });

// Exportar los Modelos y la función de conexión
const Usuario = mongoose.model('Usuario', usuarioSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = { connectDB, Usuario, Post };
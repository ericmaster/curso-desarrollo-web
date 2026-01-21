const mongoose = require('mongoose');
require('dotenv').config();

// 1. Configuración de la conexión (Reemplaza a Sequelize)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

// 2. Modelo Usuario con Mongoose
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
    lowercase: true 
  }
}, { 
  timestamps: true, // Crea createdAt y updatedAt automáticamente
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true } 
});

// Relación Virtual: Permite al usuario "ver" sus posts sin guardarlos físicamente en su documento
usuarioSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'autor'
});

// 3. Modelo Post con Mongoose
const postSchema = new mongoose.Schema({
  titulo: { 
    type: String, 
    required: [true, 'El título es requerido'],
    minlength: [3, 'El título debe tener al menos 3 caracteres'] 
  },
  contenido: { 
    type: String, 
    trim: true 
  },
  autor: { 
    type: mongoose.Schema.Types.ObjectId, // Referencia al ID del usuario
    ref: 'Usuario', 
    required: [true, 'El autor es requerido'] 
  }
}, { 
  timestamps: true 
});

// 4. Exportación de modelos y la función de conexión
const Usuario = mongoose.model('Usuario', usuarioSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = { connectDB, Usuario, Post };
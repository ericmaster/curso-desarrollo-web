const mongoose = require('mongoose');
require('dotenv').config();

// =======================
// Conexión a MongoDB
// =======================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

// =======================
// Esquema de Usuario
// =======================
const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    }
  },
  { timestamps: true }
);

// 🔹 Virtual (relación)
usuarioSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'autor'
});

// 🔹 Método de instancia (7.2)
usuarioSchema.methods.saludar = function () {
  return `Hola, soy ${this.nombre}`;
};

// 🔹 Método estático (7.2)
usuarioSchema.statics.buscarPorEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

// 🔹 Índice (7.3)
usuarioSchema.index({ email: 1 });

// =======================
// Esquema de Post (7.1)
// =======================
const postSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true
    },
    contenido: {
      type: String
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    },
    fechaPublicacion: {
      type: Date,
      default: null
    },
    publicado: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// 🔹 Índices (7.3)
postSchema.index({ autor: 1, createdAt: -1 });

// 🔹 Índice texto completo (7.4)
postSchema.index({ titulo: 'text', contenido: 'text' });

// =======================
// Modelos
// =======================
const Usuario = mongoose.model('Usuario', usuarioSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = { connectDB, Usuario, Post };

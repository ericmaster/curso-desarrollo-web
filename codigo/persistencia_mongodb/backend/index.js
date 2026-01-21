const express = require('express');
const cors = require('cors');
const { connectDB, Usuario, Post } = require('./models'); // Importa desde models.js
const app = express();

app.use(cors());
app.use(express.json());

// Conectar a MongoDB Atlas
connectDB();

// ==================== RUTAS DE USUARIOS ====================

// Crear usuario
app.post('/api/usuarios', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: 'El email ya existe' });
    res.status(400).json({ error: err.message });
  }
});

// Listar usuarios con sus posts (usando populate)
app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate('posts');
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar usuario y sus posts asociados
app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ autor: req.params.id });
    res.json({ mensaje: 'Usuario y sus posts eliminados' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== RUTAS DE POSTS ====================

// Crear post para un usuario específico
app.post('/api/usuarios/:usuarioId/posts', async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      autor: req.params.usuarioId
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todos los posts con info del autor
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('autor', 'nombre email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
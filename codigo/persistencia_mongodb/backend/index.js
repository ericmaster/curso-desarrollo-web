const express = require('express');
const cors = require('cors');
// Importamos connectDB y los modelos de Mongoose
const { connectDB, Usuario, Post } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Conectamos a MongoDB (reemplaza la sincronización de Sequelize)
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

// Listar usuarios con sus posts (Usamos populate en lugar de include)
app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate('posts');
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un usuario específico
app.get('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).populate('posts');
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: 'ID de usuario inválido' });
  }
});

// Actualizar usuario
app.put('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar usuario
app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    // Limpieza: eliminamos sus posts al borrar al usuario
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
    const post = await Post.create({ 
      ...req.body, 
      autor: req.params.usuarioId // Usamos 'autor' como definimos en el esquema
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar posts con info del autor
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('autor', 'nombre email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json({ mensaje: 'Post eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
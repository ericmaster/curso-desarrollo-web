const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Cambio: Usamos Mongoose en lugar de Sequelize
require('dotenv').config();
const { Usuario, Post } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Conexión a MongoDB 
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado correctamente'))
  .catch(err => console.error(' X Error de conexión:', err));

// --- RUTAS DE USUARIOS ---

// Crear usuario 
app.post('/api/usuarios', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar usuarios
app.get('/api/usuarios', async (req, res) => {
  const usuarios = await Usuario.find(); // En Mongo se usa find()
  res.json(usuarios);
});

// Obtener un usuario específico por ID
app.get('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- RUTAS DE POSTS ---

// Crear post para un usuario 
app.post('/api/usuarios/:usuarioId/posts', async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, usuarioId: req.params.usuarioId });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar posts 
app.get('/api/posts', async (req, res) => {
  const posts = await Post.find().populate('usuarioId', 'nombre email'); 
  res.json(posts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
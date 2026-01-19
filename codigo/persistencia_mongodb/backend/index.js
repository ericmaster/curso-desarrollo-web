const express = require('express');
const cors = require('cors');
const { sequelize, Usuario, Post } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Sincronizar modelos y base de datos
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
});

// Crear usuario
app.post('/api/usuarios', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar usuarios con sus posts
app.get('/api/usuarios', async (req, res) => {
  const usuarios = await Usuario.findAll({ include: 'posts' });
  res.json(usuarios);
});

// Crear post para un usuario
app.post('/api/usuarios/:usuarioId/posts', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.usuarioId);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    const post = await Post.create({ ...req.body, usuarioId: usuario.id });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar posts
app.get('/api/posts', async (req, res) => {
  const posts = await Post.findAll({ include: { model: Usuario, as: 'autor' } });
  res.json(posts);
});

// Obtener un usuario específico
app.get('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, { include: 'posts' });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar usuario
app.put('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.update(req.body);
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar usuario
app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.destroy();
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    await post.update(req.body);
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    await post.destroy();
    res.json({ mensaje: 'Post eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

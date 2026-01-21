const express = require('express');
const cors = require('cors');
const { connectDB, Usuario, Post } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// ==================== RUTAS DE USUARIOS ====================

// (Tus rutas de POST, GET usuarios, etc., se mantienen igual...)
app.post('/api/usuarios', async (req, res) => { /* ... código anterior ... */ });
app.get('/api/usuarios', async (req, res) => { /* ... código anterior ... */ });
app.get('/api/usuarios/:id', async (req, res) => { /* ... código anterior ... */ });
app.put('/api/usuarios/:id', async (req, res) => { /* ... código anterior ... */ });
app.delete('/api/usuarios/:id', async (req, res) => { /* ... código anterior ... */ });


// ==================== RUTAS DE POSTS ====================

//  Implementar búsqueda de texto completo 
app.get('/api/posts/buscar', async (req, res) => {
  try {
    const { q } = req.query;
    const posts = await Post.find({ $text: { $search: q } })
      .populate('autor')
      .sort({ score: { $meta: 'textScore' } });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Listar posts con PAGINACIÓN (ACTUALIZADA)
app.get('/api/posts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('autor', 'nombre email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments();

    res.json({
      posts,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear post para un usuario
app.post('/api/usuarios/:usuarioId/posts', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    const post = await Post.create({
      ...req.body,
      autor: req.params.usuarioId
    });
    
    await post.populate('autor');
    res.status(201).json(post);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    res.status(500).json({ error: err.message });
  }
});

// Actualizar post
app.put('/api/posts/:id', async (req, res) => {  });

// Eliminar post
app.delete('/api/posts/:id', async (req, res) => {  });

// ==================== SERVIDOR ====================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});

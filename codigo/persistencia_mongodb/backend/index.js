const express = require('express');
const cors = require('cors');
const { connectDB, ObjectId } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let db;

// Conectar a MongoDB antes de iniciar el servidor
connectDB().then(collections => {
    db = collections;
    console.log('Conectado a MongoDB y colecciones listas');
}).catch(err => console.error('Error al conectar a MongoDB:', err));

// --- RUTAS DE USUARIOS ---

// Crear usuario
app.post('/api/usuarios', async (req, res) => {
    try {
        const resultado = await db.usuarios.insertOne(req.body);
        res.status(201).json({ _id: resultado.insertedId, ...req.body });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar usuarios
app.get('/api/usuarios', async (req, res) => {
    const usuarios = await db.usuarios.find().toArray();
    res.json(usuarios);
});

// Obtener un usuario específico
app.get('/api/usuarios/:id', async (req, res) => {
    try {
        const usuario = await db.usuarios.findOne({ _id: new ObjectId(req.params.id) });
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (err) {
        res.status(400).json({ error: 'ID no válido' });
    }
});

// Actualizar usuario
app.put('/api/usuarios/:id', async (req, res) => {
    try {
        await db.usuarios.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        res.json({ mensaje: 'Usuario actualizado' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Eliminar usuario
app.delete('/api/usuarios/:id', async (req, res) => {
    try {
        await db.usuarios.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({ mensaje: 'Usuario eliminado' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- RUTAS DE POSTS ---

// Crear post para un usuario
app.post('/api/usuarios/:usuarioId/posts', async (req, res) => {
    try {
        const post = { 
            ...req.body, 
            usuarioId: new ObjectId(req.params.usuarioId),
            fecha: new Date()
        };
        const resultado = await db.posts.insertOne(post);
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar todos los posts
app.get('/api/posts', async (req, res) => {
    const posts = await db.posts.find().toArray();
    res.json(posts);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor MongoDB escuchando en http://localhost:${PORT}`);
});
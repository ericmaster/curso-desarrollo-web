const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb'); // Importamos herramientas de MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de MongoDB
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'curso_db';
let db;

// Conectar a la base de datos
async function connectDB() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log('Conectado exitosamente a MongoDB');
    } catch (err) {
        console.error('Error al conectar a MongoDB:', err);
    }
}
connectDB();

// --- RUTAS DE USUARIOS ---

// Crear usuario
app.post('/api/usuarios', async (req, res) => {
    try {
        const resultado = await db.collection('usuarios').insertOne(req.body);
        const usuarioCreado = await db.collection('usuarios').findOne({ _id: resultado.insertedId });
        res.status(201).json(usuarioCreado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar usuarios (Simulando el include: 'posts')
app.get('/api/usuarios', async (req, res) => {
    try {
        const usuarios = await db.collection('usuarios').aggregate([
            {
                $lookup: {
                    from: 'posts',
                    localField: '_id',
                    foreignField: 'usuarioId',
                    as: 'posts'
                }
            }
        ]).toArray();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener un usuario específico
app.get('/api/usuarios/:id', async (req, res) => {
    try {
        const usuario = await db.collection('usuarios').findOne({ _id: new ObjectId(req.params.id) });
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        
        // Buscamos sus posts manualmente para mantener la lógica original
        usuario.posts = await db.collection('posts').find({ usuarioId: new ObjectId(req.params.id) }).toArray();
        res.json(usuario);
    } catch (err) {
        res.status(400).json({ error: 'ID no válido o error de servidor' });
    }
});

// Actualizar usuario
app.put('/api/usuarios/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const actualizacion = { $set: req.body };
        const resultado = await db.collection('usuarios').findOneAndUpdate(
            query, 
            actualizacion, 
            { returnDocument: 'after' }
        );
        if (!resultado) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(resultado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Eliminar usuario
app.delete('/api/usuarios/:id', async (req, res) => {
    try {
        const resultado = await db.collection('usuarios').deleteOne({ _id: new ObjectId(req.params.id) });
        if (resultado.deletedCount === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ mensaje: 'Usuario eliminado' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- RUTAS DE POSTS ---

// Crear post para un usuario
app.post('/api/usuarios/:usuarioId/posts', async (req, res) => {
    try {
        const usuarioId = new ObjectId(req.params.usuarioId);
        const usuario = await db.collection('usuarios').findOne({ _id: usuarioId });
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        const nuevoPost = { ...req.body, usuarioId: usuarioId };
        const resultado = await db.collection('posts').insertOne(nuevoPost);
        const postCreado = await db.collection('posts').findOne({ _id: resultado.insertedId });
        res.status(201).json(postCreado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar posts (Simulando include autor)
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await db.collection('posts').aggregate([
            {
                $lookup: {
                    from: 'usuarios',
                    localField: 'usuarioId',
                    foreignField: '_id',
                    as: 'autor'
                }
            },
            { $unwind: '$autor' }
        ]).toArray();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar post
app.put('/api/posts/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const resultado = await db.collection('posts').findOneAndUpdate(
            query,
            { $set: req.body },
            { returnDocument: 'after' }
        );
        if (!resultado) return res.status(404).json({ error: 'Post no encontrado' });
        res.json(resultado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Eliminar post
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const resultado = await db.collection('posts').deleteOne({ _id: new ObjectId(req.params.id) });
        if (resultado.deletedCount === 0) return res.status(404).json({ error: 'Post no encontrado' });
        res.json({ mensaje: 'Post eliminado' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
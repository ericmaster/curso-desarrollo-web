const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());   // Parsea JSON en el cuerpo de las solicitudes
app.use(cors());           // Permite solicitudes desde otros orígenes (ej. React en localhost:5173)

// Datos en memoria (simula una base de datos simple)
let posts = [
  { id: 1, nombre: "Tutorial de React", tipo: "post" },
  { id: 2, nombre: "Propuesta Temporal de TC39", tipo: "post" },
  { id: 3, nombre: "Nuevo Post", tipo: "post" }
];
let nextId = 4;

// GET /api/post → listar todos
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// POST /api/posts → crear nuevo
app.post('/api/posts', (req, res) => {
  const { nombre, tipo } = req.body;
  if (!nombre || !tipo) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  const nuevo = { id: nextId++, nombre, tipo };
  posts.push(nuevo);
  res.status(201).json(nuevo); // 201 = Created
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
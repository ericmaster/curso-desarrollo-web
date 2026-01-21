require("dotenv").config(); // <--- ESTA DEBE SER LA PRIMERA LÍNEA
const express = require("express");
const cors = require("cors");
const { connectDB, Usuario, Post } = require("./models");
// ... resto del código

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// RUTAS DE USUARIOS
app.post("/api/usuarios", async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate("posts");
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RUTAS DE POSTS
app.post("/api/usuarios/:usuarioId/posts", async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      autor: req.params.usuarioId,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("autor", "nombre email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));

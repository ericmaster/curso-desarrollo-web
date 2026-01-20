require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { Usuario, Post } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
    process.exit(1);
  });

// Crear usuario
app.post("/api/usuarios", async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar usuarios con sus posts
app.get("/api/usuarios", async (req, res) => {
  const usuarios = await Usuario.find().populate("posts");
  res.json(usuarios);
});

// Crear post para un usuario
app.post("/api/usuarios/:usuarioId/posts", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.usuarioId);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    const post = new Post({
      ...req.body,
      autor: usuario._id,
    });

    await post.save();

    usuario.posts.push(post._id);
    await usuario.save();

    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar posts
app.get("/api/posts", async (req, res) => {
  const posts = await Post.find().populate("autor");
  res.json(posts);
});

// Obtener un usuario específico
app.get("/api/usuarios/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).populate("posts");
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar usuario
app.put("/api/usuarios/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar usuario
app.delete("/api/usuarios/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    await Post.deleteMany({ autor: usuario._id });
    await usuario.deleteOne();

    res.json({ mensaje: "Usuario eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar post
app.put("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!post)
      return res.status(404).json({ error: "Post no encontrado" });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar post
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ error: "Post no encontrado" });

    await post.deleteOne();
    res.json({ mensaje: "Post eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

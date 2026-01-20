const express = require("express");
const cors = require("cors");
const { connectDB, Usuario, Post } = require("./models");
const app = express();

app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// ==================== RUTAS DE USUARIOS ====================
app.post("/api/usuarios", async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: errors.join(", ") });
    }
    if (err.code === 11000)
      return res.status(400).json({ error: "El email ya está registrado" });
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find()
      .populate("posts")
      .sort({ createdAt: -1 });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/usuarios/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).populate("posts");
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (err) {
    if (err.name === "CastError")
      return res.status(400).json({ error: "ID de usuario inválido" });
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/usuarios/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: errors.join(", ") });
    }
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/usuarios/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    await Post.deleteMany({ autor: req.params.id });
    res.json({ mensaje: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== RUTAS DE POSTS ====================
app.post("/api/usuarios/:usuarioId/posts", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.usuarioId);
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    const post = await Post.create({
      ...req.body,
      autor: req.params.usuarioId,
    });
    await post.populate("autor");
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("autor", "nombre email")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { titulo: req.body.titulo, contenido: req.body.contenido },
      { new: true, runValidators: true },
    ).populate("autor");
    if (!post) return res.status(404).json({ error: "Post no encontrado" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: "Post no encontrado" });
    res.json({ mensaje: "Post eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});

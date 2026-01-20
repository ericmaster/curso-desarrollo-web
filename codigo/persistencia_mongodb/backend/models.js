const mongoose = require("mongoose");

// ----- Schema Post -----
const PostSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    contenido: {
      type: String,
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  { timestamps: true }
);

// ----- Schema Usuario -----
const UsuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

// ----- Modelos -----
const Usuario = mongoose.model("Usuario", UsuarioSchema);
const Post = mongoose.model("Post", PostSchema);

module.exports = { Usuario, Post };

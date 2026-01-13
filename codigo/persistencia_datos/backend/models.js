// Configuración de Sequelize para conectar a PostgreSQL
const { Sequelize, DataTypes } = require('sequelize');

// Cambia estos valores según tu entorno
const sequelize = new Sequelize('ejemplo_db', 'usuario', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

// Definición del modelo Usuario
const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

// Definición del modelo Post
const Post = sequelize.define('Post', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contenido: {
    type: DataTypes.TEXT
  }
});

// Relaciones
Usuario.hasMany(Post, { as: 'posts', foreignKey: 'usuarioId' });
Post.belongsTo(Usuario, { as: 'autor', foreignKey: 'usuarioId' });

module.exports = { sequelize, Usuario, Post };
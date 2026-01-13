# Backend - API REST con Sequelize

Backend de la aplicación de ejemplo de persistencia de datos con PostgreSQL y Sequelize.

## 📁 Estructura
- **index.js**: Servidor Express con API REST completa (CRUD)
- **models.js**: Modelos Sequelize (Usuario, Post) y relaciones
- **crear_db.sql**: Script SQL para crear la base de datos

## 🚀 Instalación

1. Crea la base de datos ejecutando `crear_db.sql`:
   ```bash
   sudo -u postgres psql -f crear_db.sql
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ajusta las credenciales en `models.js` si es necesario

4. Inicia el servidor:
   ```bash
   npm start
   ```

El servidor estará disponible en `http://localhost:3000`

## 📚 API Endpoints

### Usuarios
- `POST /usuarios` - Crear usuario
- `GET /usuarios` - Listar todos los usuarios con sus posts
- `GET /usuarios/:id` - Obtener un usuario específico
- `PUT /usuarios/:id` - Actualizar usuario
- `DELETE /usuarios/:id` - Eliminar usuario

### Posts
- `POST /usuarios/:usuarioId/posts` - Crear post para un usuario
- `GET /posts` - Listar todos los posts con autor
- `PUT /posts/:id` - Actualizar post
- `DELETE /posts/:id` - Eliminar post

## 🔧 Tecnologías
- Express.js
- Sequelize ORM
- PostgreSQL
- CORS

# Backend - API REST con Sequelize

Backend de la aplicación de ejemplo de persistencia de datos con PostgreSQL y Sequelize.

## 📁 Estructura
- **index.js**: Servidor Express con API REST completa (CRUD)
- **models.js**: Modelos Sequelize (Usuario, Post) y relaciones
- **crear_db.sql**: Script SQL para crear la base de datos

## 🚀 Instalación

### 1. Instalar PostgreSQL

Si aún no tienes PostgreSQL instalado:

**En Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

**En Fedora/RHEL:**
```bash
sudo dnf install postgresql-server postgresql-contrib
sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**En Arch Linux:**
```bash
sudo pacman -S postgresql
sudo -u postgres initdb -D /var/lib/postgres/data
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

Verifica que PostgreSQL esté corriendo:
```bash
sudo systemctl status postgresql
```

### 2. Crear la base de datos

Crea la base de datos ejecutando `crear_db.sql`:
   ```bash
   sudo -u postgres psql -f crear_db.sql
   ```

### 3. Instalar dependencias

Instala las dependencias:
   ```bash
   npm install
   ```

### 4. Configurar credenciales

Ajusta las credenciales en `models.js` si es necesario

### 5. Iniciar el servidor

Inicia el servidor:
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

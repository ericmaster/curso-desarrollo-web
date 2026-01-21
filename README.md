# Backend - API REST con Sequelize

Backend de la aplicación de ejemplo de persistencia de datos con PostgreSQL y Sequelize.

## 📁 Estructura
- **index.js**: Servidor Express con API REST completa (CRUD)
- **models.js**: Modelos Sequelize (Usuario, Post) y relaciones
- **.env**: Variables de entorno para configuración de base de datos
- **docker-compose.yaml**: Configuración de PostgreSQL y Adminer con Docker

## 🚀 Instalación

### Opción 1: Usar Docker Compose (Recomendado)

La forma más rápida de empezar es usando Docker Compose, que configura PostgreSQL y Adminer automáticamente:

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**
   
   Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```
   
   Las credenciales por defecto ya están configuradas para funcionar con docker-compose.

3. **Iniciar PostgreSQL con Docker Compose**
   ```bash
   docker-compose up -d
   ```
   
   Esto iniciará:
   - PostgreSQL en `http://localhost:5432`
   - Adminer (interfaz web) en `http://localhost:8080`

4. **Iniciar el servidor**
   ```bash
   npm start
   ```

   El servidor estará disponible en `http://localhost:3000`

### Opción 2: Instalar PostgreSQL localmente

Si prefieres instalar PostgreSQL directamente en tu sistema:

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

**Crear la base de datos y usuario:**

```bash
sudo -u postgres psql
```

Luego ejecuta en el prompt de PostgreSQL:
```sql
CREATE USER admin WITH PASSWORD 'admin123';
CREATE DATABASE mydb OWNER admin;
GRANT ALL PRIVILEGES ON DATABASE mydb TO admin;
\q
```

**Instalar dependencias:**
```bash
npm install
```

**Configurar variables de entorno:**

Copia el archivo de ejemplo y ajusta si es necesario:
```bash
cp .env.example .env
```

**Iniciar el servidor:**
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

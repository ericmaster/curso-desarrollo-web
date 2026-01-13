# Ejemplo Completo de Persistencia de Datos

Este es un ejemplo completo de una aplicación full-stack que demuestra persistencia de datos con PostgreSQL, Sequelize (ORM), Express (backend) y React (frontend).

## 🏗️ Estructura del Proyecto

```
persistencia_datos/
├── backend/          # Servidor Express con Sequelize
│   ├── index.js      # Servidor y rutas API
│   ├── models.js     # Modelos de datos (Usuario, Post)
│   ├── crear_db.sql  # Script SQL para crear la BD
│   └── package.json
└── frontend/         # Aplicación React con Vite
    ├── src/
    │   ├── App.jsx   # Componente principal
    │   ├── main.jsx  # Entry point
    │   └── index.css # Estilos
    ├── index.html
    └── package.json
```

## 🚀 Instalación y Configuración

### 0. Instalar PostgreSQL

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

### 1. Configurar PostgreSQL

Primero, crea la base de datos ejecutando el script SQL:

```bash
# Entra a psql como superusuario
sudo -u postgres psql

# Ejecuta el script
\i codigo/persistencia_datos/backend/crear_db.sql

# O manualmente:
CREATE USER usuario WITH PASSWORD 'password';
CREATE DATABASE ejemplo_db OWNER usuario;
GRANT ALL PRIVILEGES ON DATABASE ejemplo_db TO usuario;
\q
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

Edita `models.js` si necesitas cambiar las credenciales de la base de datos.

### 3. Configurar Frontend

```bash
cd ../frontend
npm install
```

## ▶️ Ejecución

### Iniciar Backend (Terminal 1)

```bash
cd backend
npm start
```

El servidor se ejecutará en `http://localhost:3000`

### Iniciar Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`

## 🎯 Características

### Backend (API REST)

- **Usuarios**
  - `POST /usuarios` - Crear usuario
  - `GET /usuarios` - Listar usuarios con sus posts
  - `GET /usuarios/:id` - Obtener un usuario específico
  - `PUT /usuarios/:id` - Actualizar usuario
  - `DELETE /usuarios/:id` - Eliminar usuario

- **Posts**
  - `POST /usuarios/:usuarioId/posts` - Crear post
  - `GET /posts` - Listar posts con autor
  - `PUT /posts/:id` - Actualizar post
  - `DELETE /posts/:id` - Eliminar post

### Frontend (React)

- ✅ Interfaz moderna y responsive
- ✅ CRUD completo de usuarios y posts
- ✅ Validación de formularios
- ✅ Mensajes de éxito y error
- ✅ Edición en línea
- ✅ Confirmación de eliminación
- ✅ Vista de relaciones (posts por usuario)

## 💡 Conceptos Demostrados

Este ejemplo ilustra:

1. **Persistencia de Datos**: Los datos se almacenan en PostgreSQL y persisten entre sesiones
2. **ORM (Sequelize)**: Mapeo objeto-relacional para trabajar con la BD
3. **Relaciones**: Relación uno-a-muchos entre Usuario y Post
4. **API REST**: Backend con endpoints RESTful
5. **CRUD Completo**: Crear, Leer, Actualizar, Eliminar
6. **Full-Stack**: Integración frontend-backend
7. **Estado Asíncrono**: Manejo de loading y errores
8. **UX**: Feedback visual de operaciones

## 🔧 Tecnologías Utilizadas

### Backend
- **Node.js** + **Express**: Framework web
- **Sequelize**: ORM para PostgreSQL
- **PostgreSQL**: Base de datos relacional
- **CORS**: Habilitar peticiones cross-origin

### Frontend
- **React 18**: Biblioteca UI
- **Vite**: Build tool y dev server
- **Fetch API**: Peticiones HTTP
- **CSS3**: Estilos personalizados

## 📝 Notas

- Este ejemplo es educativo y no incluye autenticación ni validaciones avanzadas
- En producción, considera agregar:
  - Autenticación JWT
  - Validación de datos más robusta
  - Paginación
  - Variables de entorno
  - Manejo de errores más completo
  - Tests unitarios

## 🎓 Recursos de Aprendizaje

- [Documentación de Sequelize](https://sequelize.org/)
- [Guía de PostgreSQL](https://www.postgresql.org/docs/)
- [React Docs](https://react.dev/)
- Ver `recursos/persistencia-de-datos.md` para más teoría

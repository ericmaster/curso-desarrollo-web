# 🔐 Autenticación en Aplicaciones React  

---

## 🎯 Objetivo
Implementar un **sistema de autenticación completo** en aplicaciones React con backend Node.js/Express, incluyendo registro, login, protección de rutas, manejo de tokens JWT y gestión del estado de autenticación mediante Context API.

---

## 📚 Índice
1. [Conceptos fundamentales](#conceptos-fundamentales)
2. [Flujo de autenticación](#flujo-de-autenticación)
3. [Implementación en el backend](#implementación-en-el-backend)
4. [Implementación en el frontend](#implementación-en-el-frontend)
5. [Context API para autenticación](#context-api-para-autenticación)
6. [Protección de rutas](#protección-de-rutas)
7. [Mejores prácticas](#mejores-prácticas)

---

## 🔑 Conceptos fundamentales

### 1. Autenticación vs Autorización

| Concepto | Definición | Ejemplo |
|----------|------------|---------|
| **Autenticación** | Verificar la identidad del usuario | Login con email y contraseña |
| **Autorización** | Verificar permisos del usuario | Acceso a rutas de administrador |

### 2. JSON Web Tokens (JWT)

Un **JWT** es un estándar (RFC 7519) para transmitir información de forma segura entre el cliente y el servidor.

**Estructura de un JWT**:
```
header.payload.signature
```

Ejemplo:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTYzMjEyMzQ1Nn0.XYZ123abc...
```

**Partes del JWT**:
- **Header**: algoritmo de encriptación
- **Payload**: datos del usuario (no sensibles)
- **Signature**: firma digital para verificar integridad

### 3. Almacenamiento de tokens

| Método | Ventajas | Desventajas |
|--------|----------|-------------|
| **localStorage** | Persistente, fácil de usar | Vulnerable a XSS |
| **sessionStorage** | Solo durante la sesión | Se pierde al cerrar pestaña |
| **Cookies (httpOnly)** | Más seguro contra XSS | Vulnerable a CSRF |
| **Memory (estado)** | Más seguro | Se pierde al recargar |

> **Recomendación**: Usar `localStorage` para aplicaciones educativas. En producción, considerar cookies `httpOnly` con tokens de refresco.

---

## 🔄 Flujo de autenticación

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend (React)
    participant B as Backend (Express)
    participant DB as Base de Datos

    U->>F: 1. Ingresa credenciales
    F->>B: 2. POST /api/auth/login
    B->>DB: 3. Verifica usuario
    DB-->>B: 4. Usuario encontrado
    B->>B: 5. Genera JWT
    B-->>F: 6. Retorna { token, user }
    F->>F: 7. Guarda token en localStorage
    F->>F: 8. Actualiza contexto de autenticación
    F-->>U: 9. Redirige a dashboard

    Note over F,B: Peticiones subsiguientes
    U->>F: 10. Accede a ruta protegida
    F->>B: 11. GET /api/protected (Header: Authorization: Bearer <token>)
    B->>B: 12. Verifica JWT
    B-->>F: 13. Retorna datos protegidos
    F-->>U: 14. Muestra contenido
```

---

## 🛠️ Implementación en el backend

### 1. Instalación de dependencias

```bash
npm install express cors jsonwebtoken bcryptjs dotenv
```

### 2. Estructura del proyecto backend

```
api-auth/
├── package.json
├── .env
├── server.js
├── middleware/
│   └── auth.js
└── routes/
    └── auth.js
```

### 3. Modelo de usuario (simulado)

```js
// users.js - Simulación de base de datos
let users = [
  {
    id: 1,
    email: "admin@example.com",
    password: "$2a$10$...", // hash de "admin123"
    name: "Administrador",
    role: "admin"
  }
];

module.exports = { users };
```

### 4. Rutas de autenticación

```js
// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Simulación de base de datos
let users = [];
let nextId = 1;

// POST /api/auth/register - Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validación
    if (!email || !password || !name) {
      return res.status(400).json({ 
        error: "Todos los campos son obligatorios" 
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        error: "El email ya está registrado" 
      });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = {
      id: nextId++,
      email,
      password: hashedPassword,
      name,
      role: 'user',
      createdAt: new Date()
    };

    users.push(newUser);

    // Generar token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || 'secreto-super-seguro',
      { expiresIn: '24h' }
    );

    // No enviar la contraseña al cliente
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// POST /api/auth/login - Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación
    if (!email || !password) {
      return res.status(400).json({ 
        error: "Email y contraseña son obligatorios" 
      });
    }

    // Buscar usuario
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ 
        error: "Credenciales inválidas" 
      });
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: "Credenciales inválidas" 
      });
    }

    // Generar token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secreto-super-seguro',
      { expiresIn: '24h' }
    );

    // No enviar la contraseña al cliente
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: "Login exitoso",
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// GET /api/auth/me - Obtener usuario actual
router.get('/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Middleware de autenticación
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secreto-super-seguro', (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido o expirado" });
    }
    req.user = user;
    next();
  });
}

module.exports = router;
```

### 5. Middleware de autenticación

```js
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido o expirado" });
  }
};

module.exports = { authenticateToken };
```

### 6. Servidor principal

```js
// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Ruta protegida de ejemplo
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ 
    message: "Acceso concedido a contenido protegido",
    user: req.user 
  });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const jwt = require('jsonwebtoken');
  jwt.verify(token, process.env.JWT_SECRET || 'secreto-super-seguro', (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }
    req.user = user;
    next();
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
```

### 7. Variables de entorno

```env
# .env
JWT_SECRET=tu-secreto-super-seguro-cambialo-en-produccion
PORT=3000
```

---

## ⚛️ Implementación en el frontend

### 1. Estructura del proyecto React

```
auth-app/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── Navbar.jsx
│   └── services/
│       └── authService.js
```

### 2. Servicio de autenticación

```jsx
// services/authService.js
const API_URL = 'http://localhost:3000/api/auth';

export const authService = {
  // Registrar nuevo usuario
  register: async (email, password, name) => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al registrar usuario');
    }

    return response.json();
  },

  // Iniciar sesión
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al iniciar sesión');
    }

    const data = await response.json();
    
    // Guardar token en localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Obtener token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Obtener perfil del servidor
  getProfile: async () => {
    const token = authService.getToken();
    
    const response = await fetch(`${API_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener perfil');
    }

    return response.json();
  }
};
```

---

## 🌐 Context API para autenticación

### Creación del AuthContext

```jsx
// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay un usuario en localStorage al cargar
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  // Función de login
  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Función de registro
  const register = async (email, password, name) => {
    try {
      const data = await authService.register(email, password, name);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Función de logout
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Verificar si está autenticado
  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
```

---

## 🛡️ Protección de rutas

### Componente PrivateRoute

```jsx
// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
```

### Uso en React Router

```jsx
// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
```

---

## 📝 Componentes de UI

### Componente de Login

```jsx
// components/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-center">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
```

### Componente de Registro

```jsx
// components/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación de contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    const result = await register(formData.email, formData.password, formData.name);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Crear Cuenta</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-center">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
```

### Dashboard protegido

```jsx
// components/Dashboard.jsx
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <h1>Bienvenido, {user?.name}!</h1>
      <div className="user-info">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Rol:</strong> {user?.role}</p>
        <p><strong>ID:</strong> {user?.id}</p>
      </div>
      
      <div className="dashboard-content">
        <h2>Contenido Protegido</h2>
        <p>Solo los usuarios autenticados pueden ver esta información.</p>
      </div>
    </div>
  );
};

export default Dashboard;
```

### Navbar con estado de autenticación

```jsx
// components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🔐 Auth App</Link>
      </div>
      
      <div className="nav-links">
        {isAuthenticated() ? (
          <>
            <span className="user-greeting">Hola, {user?.name}</span>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="btn-logout">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
```

---

## 🔒 Mejores prácticas

### 1. Seguridad

✅ **Hacer**:
- Usar HTTPS en producción
- Validar datos en frontend y backend
- Hash de contraseñas con bcrypt (salt rounds ≥ 10)
- Tokens con tiempo de expiración
- Limpiar tokens al cerrar sesión
- No almacenar información sensible en el token

❌ **Evitar**:
- Contraseñas en texto plano
- Tokens sin expiración
- Información sensible en localStorage
- Confiar solo en validación del frontend

### 2. Manejo de errores

```jsx
// Interceptor para manejar errores de autenticación
const fetchWithAuth = async (url, options = {}) => {
  const token = authService.getToken();
  
  const config = {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await fetch(url, config);
    
    if (response.status === 401) {
      // Token expirado o inválido
      authService.logout();
      window.location.href = '/login';
      throw new Error('Sesión expirada');
    }

    return response;
  } catch (error) {
    throw error;
  }
};
```

### 3. Refresh tokens

Para sesiones de larga duración, implementar refresh tokens:

```js
// Backend - Generar dos tokens
const accessToken = jwt.sign(payload, SECRET, { expiresIn: '15m' });
const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });

// Frontend - Renovar token antes de que expire
useEffect(() => {
  const interval = setInterval(() => {
    refreshAccessToken();
  }, 14 * 60 * 1000); // 14 minutos

  return () => clearInterval(interval);
}, []);
```

### 4. Validación de formularios

```jsx
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
};
```

### 5. Loading y estados de UI

```jsx
const [authState, setAuthState] = useState({
  loading: false,
  error: null,
  success: false
});

// Mostrar feedback visual apropiado
{authState.loading && <Spinner />}
{authState.error && <ErrorAlert message={authState.error} />}
{authState.success && <SuccessAlert message="Login exitoso" />}
```

---

## 📊 Diagrama completo del flujo

```mermaid
graph TD
    A[Usuario] -->|Ingresa credenciales| B[Login Component]
    B -->|Llama a login| C[AuthContext]
    C -->|POST /api/auth/login| D[Backend Express]
    D -->|Verifica credenciales| E[Base de Datos]
    E -->|Usuario válido| D
    D -->|Genera JWT| F[Token]
    D -->|Retorna token + user| C
    C -->|Guarda en localStorage| G[localStorage]
    C -->|Actualiza estado| H[user state]
    H -->|Renderiza| I[Dashboard]
    I -->|Solicita datos| J[API con token]
    J -->|Authorization: Bearer token| D
    D -->|Verifica JWT| K{Token válido?}
    K -->|Sí| L[Retorna datos]
    K -->|No| M[401 Unauthorized]
    M -->|Logout| C
```

---

## 🧪 Pruebas con Postman/Thunder Client

### 1. Registro
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User"
}
```

### 2. Login
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 3. Acceso a ruta protegida
```http
GET http://localhost:3000/api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🎓 Ejercicios propuestos

1. **Básico**: Agregar validación de formato de email en tiempo real
2. **Intermedio**: Implementar "Recordar sesión" con checkbox
3. **Avanzado**: Agregar roles de usuario (admin, user) y permisos
4. **Desafío**: Implementar recuperación de contraseña por email

---

## 📚 Recursos adicionales

- [JWT.io](https://jwt.io/) - Decodificar y debuggear JWTs
- [React Router v6 - Authentication](https://reactrouter.com/en/main/start/overview#authentication)
- [OWASP - Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [bcrypt vs bcryptjs](https://www.npmjs.com/package/bcryptjs)

---

## 🏁 Conclusión

La autenticación es un componente **crítico** en aplicaciones web modernas. Este flujo con JWT, Context API y rutas protegidas es el estándar de la industria y proporciona una base sólida para aplicaciones escalables y seguras.

**Puntos clave**:
- JWT para autenticación stateless
- Context API para gestión global del estado
- Protección de rutas con componentes wrapper
- Almacenamiento seguro de tokens
- Validación en cliente y servidor

> **Nota**: Este ejemplo es educativo. En producción, considera implementar refresh tokens, cookies httpOnly, y servicios de autenticación como Auth0, Firebase Auth, o AWS Cognito.

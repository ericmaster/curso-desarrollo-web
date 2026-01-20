
# 🛠️ Implementación de una API RESTful con Express.js  
**Asignatura**: Desarrollo Web – PUCE-TEC  
**Unidad**: 3 – Desarrollo Web Back-End  
**RA3 (Nivel Alto)**: *Aplica lenguajes y frameworks en el desarrollo de aplicaciones web...*

---

## 🎯 Objetivo
Crear una **API RESTful funcional** con **Node.js y Express.js** que exponga recursos mediante rutas HTTP estándar (`GET`, `POST`, `PUT`, `DELETE`) y devuelva datos en formato **JSON**, conforme a los principios de arquitectura cliente-servidor y buenas prácticas profesionales.

---

## 📁 Estructura del proyecto

```
mi-api/
├── package.json
├── server.js
└── (opcional) routes/, controllers/, models/
```

---

## 🛠️ Paso 1: Inicializar el proyecto

```bash
mkdir mi-api
cd mi-api
npm init -y
npm install express cors
```

---

## 💻 Paso 2: Código mínimo de la API (`server.js`)

```js
// server.js
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());   // Parsea JSON en el cuerpo de las solicitudes
app.use(cors());           // Permite solicitudes desde otros orígenes (ej. React en localhost:5173)

// Datos en memoria (simula una base de datos simple)
let recursos = [
  { id: 1, nombre: "Tutorial de React", tipo: "post" },
  { id: 2, nombre: "Propuesta Temporal de TC39", tipo: "post" }
];
let nextId = 3;

// Rutas RESTful
// GET /api/recursos → listar todos
app.get('/api/recursos', (req, res) => {
  res.json(recursos);
});

// GET /api/recursos/:id → obtener uno
app.get('/api/recursos/:id', (req, res) => {
  const recurso = recursos.find(r => r.id === parseInt(req.params.id));
  if (!recurso) {
    return res.status(404).json({ error: "Recurso no encontrado" });
  }
  res.json(recurso);
});

// POST /api/recursos → crear nuevo
app.post('/api/recursos', (req, res) => {
  const { nombre, tipo } = req.body;
  if (!nombre || !tipo) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  const nuevo = { id: nextId++, nombre, tipo };
  recursos.push(nuevo);
  res.status(201).json(nuevo); // 201 = Created
});

// PUT /api/recursos/:id → actualizar
app.put('/api/recursos/:id', (req, res) => {
  const index = recursos.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Recurso no encontrado" });
  }
  const { nombre, tipo } = req.body;
  recursos[index] = { id: recursos[index].id, nombre, tipo };
  res.json(recursos[index]);
});

// DELETE /api/recursos/:id → eliminar
app.delete('/api/recursos/:id', (req, res) => {
  const index = recursos.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Recurso no encontrado" });
  }
  recursos.splice(index, 1);
  res.status(204).send(); // 204 = No Content
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

---

## 🌐 Paso 3: Probar la API

Usa **Thunder Client** (extensión de VS Code) o **Postman**:

| Método | URL | Cuerpo (JSON) |
|-------|-----|----------------|
| `GET` | `http://localhost:3001/api/recursos` | — |
| `POST` | `http://localhost:3001/api/recursos` | `{ "nombre": "...", "tipo": "post" }` |
| `PUT` | `http://localhost:3001/api/recursos/1` | `{ "nombre": "Nuevo título", "tipo": "post" }` |
| `DELETE` | `http://localhost:3001/api/recursos/1` | — |

---

## 🔒 Buenas prácticas implementadas

| Práctica | Aplicación |
|--------|-----------|
| **Códigos HTTP adecuados** | `200`, `201`, `204`, `400`, `404` |
| **Validación de entrada** | Rechaza solicitudes sin campos obligatorios |
| **Separación de responsabilidades** | Cada ruta tiene una única función |
| **CORS habilitado** | Compatible con frontend en otro puerto |
| **Mensajes de error claros** | JSON con campo `error` |

---

## 🔜 Próximos pasos (Semanas 11–12)

- Reemplazar datos en memoria por una **base de datos real** (MongoDB o PostgreSQL) → **3.01**
- Agregar **autenticación** y **gestión de usuarios**
- Implementar **Swagger/OpenAPI** para documentar la API → **3.04**
- Desplegar en la nube (Render, Railway) → **3.05**

---

## 📚 Recursos recomendados

- **Bibliografía básica del programa**:  
  - *Full-Stack React Projects* (Shu, 2019), Capítulo 2  
- **Documentación oficial**:  
  - [Express.js Guide](https://expressjs.com/)  
  - [MDN HTTP Response codes](https://developer.mozilla.org/es/docs/Web/HTTP/Status)

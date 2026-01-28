# 🧪 Pruebas, Depuración y Documentación de APIs  

---

## 🎯 Objetivo
Aprender a **probar, depurar y documentar** una API RESTful de forma profesional, garantizando su **calidad, usabilidad y mantenibilidad**, conforme a los estándares de la industria del desarrollo de software.

---

## 🔍 ¿Por qué son importantes las pruebas?

Las pruebas permiten:
- Detectar errores antes de que lleguen a producción
- Garantizar que nuevas funcionalidades no rompen el código existente
- Documentar el comportamiento esperado de la API
- Facilitar la colaboración en equipo

> 💡 **En el mundo real**, una API sin pruebas se considera **incompleta**.

---

## 🧩 Tipos de pruebas en APIs

| Tipo | Alcance | Herramientas comunes |
|------|--------|---------------------|
| **Pruebas unitarias** | Una función o método aislado | Jest, Mocha |
| **Pruebas de integración** | Interacción entre módulos (ej. ruta + base de datos) | Supertest, Jest |
| **Pruebas end-to-end (E2E)** | Flujo completo del usuario | Postman, Cypress (frontend) |

> ✅ En este curso, nos enfocamos en **pruebas de integración** para APIs.

---

## 🧪 Ejemplo: Pruebas con Jest + Supertest

### Instalación
```bash
npm install --save-dev jest supertest mongodb-memory-server
```

### Archivo de prueba: `tests/posts.test.js`
```js
const request = require('supertest');
const app = require('../server'); // tu servidor Express

describe('API de Posts', () => {
  test('GET /api/posts debe devolver 200 y un arreglo', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/posts con datos válidos debe crear un post', async () => {
    const nuevoPost = { title: "Test", body: "Contenido", userId: 1 };
    const res = await request(app)
      .post('/api/posts')
      .send(nuevoPost)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(nuevoPost.title);
  });

  test('POST /api/posts sin título debe devolver 400', async () => {
    const res = await request(app).post('/api/posts').send({ body: "Sin título" });
    expect(res.statusCode).toBe(400);
  });
});
```

### Ejecutar pruebas
```bash
npx jest
```

> 🔗 **Relación con el programa**:  
> - **3.06**: Herramientas de pruebas y depuración  
> - **RA3**: Aplicación profesional de frameworks

---

## 🔄 TDD (Test-Driven Development) en desarrollo web

### ¿Qué es TDD?
Es una metodología donde **primero se escriben las pruebas**, luego se escribe el código mínimo para que pasen, y finalmente se refina.

### Ciclo de TDD:
1. **Escribir una prueba que falla** (red)
2. **Escribir código mínimo para que pase** (green)
3. **Refactorizar** (manteniendo las pruebas verdes)

### Ejemplo en contexto web:
Quieres añadir validación de email en `/api/users`.

1. **Escribe la prueba**:
   ```js
   test('POST /api/users con email inválido debe fallar', async () => {
     const res = await request(app).post('/api/users').send({ email: "no-es-email" });
     expect(res.statusCode).toBe(400);
   });
   ```
2. **Ejecuta → falla** (porque aún no hay validación)
3. **Añade validación con `express-validator`**
4. **Vuelve a ejecutar → pasa**

> ✅ **Ventaja**: El código nace **probado y con propósito claro**.

---

## 🐞 Depuración de APIs

### Herramientas y técnicas:
- **`console.log`** (básico, pero útil)
- **Puntos de interrupción** en VS Code (con `debugger`)
- **Logs estructurados** con `winston` o `morgan`
- **Monitoreo de errores** con Sentry (avanzado)

### Ejemplo con `morgan` (middleware de logs):
```js
const morgan = require('morgan');
app.use(morgan('combined')); // registra cada solicitud
```

---

## 📚 Documentación de APIs

### ¿Por qué documentar?
- Permite que otros (o tú mismo en el futuro) entiendan cómo usar la API
- Es esencial para integraciones con frontend o servicios externos

### Opción recomendada: **Swagger/OpenAPI**

#### Instalación:
```bash
npm install swagger-jsdoc swagger-ui-express
```

#### Configuración básica (`docs/swagger.js`):
```js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'API de Portafolio', version: '1.0.0' },
  },
  apis: ['./routes/*.js'], // rutas con comentarios JSDoc
};

const specs = swaggerJsdoc(options);
module.exports = { swaggerUi, specs };
```

#### En `server.js`:
```js
const { swaggerUi, specs } = require('./docs/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
```

#### Comentario JSDoc en ruta:
```js
/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Lista todos los posts
 *     responses:
 *       200:
 *         description: Arreglo de posts
 */
app.get('/api/posts', ...);
```

> ✅ Accede a `http://localhost:3001/api-docs` para ver la documentación interactiva.

> 🔗 **Relación con el programa**:  
> - **3.04**: Gestión y documentación de la API RESTful

---

## 📊 Buenas prácticas profesionales

| Área | Práctica |
|------|---------|
| **Pruebas** | Cubrir casos de éxito y error |
| **TDD** | Escribir pruebas antes del código |
| **Depuración** | Usar logs estructurados, no solo `console.log` |
| **Documentación** | Mantenerla actualizada junto con el código |

---

## 💡 Conclusión pedagógica

> Un desarrollador profesional no solo **escribe código**, sino que **garantiza su calidad** mediante pruebas, depuración y documentación.
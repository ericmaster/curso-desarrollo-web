# JavaScript: Interactividad y Programación Web

## Historia de JavaScript

### Los Orígenes (1995)
- **JavaScript** fue creado en **mayo de 1995** por **Brendan Eich** mientras trabajaba en Netscape Communications.
- Desarrollado en **solo 10 días** bajo el nombre inicial de "Mocha", luego renombrado a "LiveScript" y finalmente a "JavaScript".
- El nombre "JavaScript" fue una estrategia de marketing para aprovechar la popularidad de Java en ese momento, aunque los lenguajes son fundamentalmente diferentes.

**Objetivo inicial:**
- Crear un lenguaje de scripting ligero para hacer páginas web dinámicas
- Permitir a diseñadores web (no necesariamente programadores) agregar interactividad
- Ejecutarse directamente en el navegador del cliente

### La Guerra de los Navegadores (1995-2000)

**JavaScript 1.0 (Netscape Navigator 2.0, 1995)**
- Capacidades básicas de scripting
- Manipulación del DOM limitada
- Validación de formularios

**JScript (Microsoft Internet Explorer 3.0, 1996)**
- Implementación propia de Microsoft
- Incompatibilidades con JavaScript de Netscape
- Inicio de la fragmentación del lenguaje

### Estandarización: ECMAScript

**ECMAScript 1 (1997)**
- Primera especificación estándar por ECMA International
- Intentó unificar JavaScript y JScript
- Estableció las bases del lenguaje

**ECMAScript 2 (1998)**
- Cambios editoriales menores

**ECMAScript 3 (1999)**
- Expresiones regulares
- Mejor manejo de strings
- Try/catch para manejo de excepciones
- Se convirtió en el estándar dominante por muchos años

**ECMAScript 4 (Abandonado)**
- Propuestas demasiado ambiciosas
- Desacuerdos entre fabricantes de navegadores
- Nunca fue lanzado oficialmente

**ECMAScript 5 (2009)**
- Strict mode
- Métodos de array: `forEach`, `map`, `filter`, `reduce`
- JSON nativo
- Getters y setters
- Mejor manejo de objetos

### La Revolución: ECMAScript 6 / ES2015

**ECMAScript 2015 (ES6)** - Junio 2015
El cambio más significativo en la historia de JavaScript, introduciendo:

**Nuevas Formas de Declarar Variables**
```javascript
let variable = "puede cambiar";
const constante = "no puede cambiar";
// Adiós al problemático 'var'
```

**Funciones Flecha**
```javascript
// Sintaxis tradicional
function suma(a, b) {
  return a + b;
}

// Función flecha
const suma = (a, b) => a + b;
```

**Clases**
```javascript
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
  
  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
}
```

**Template Literals**
```javascript
const nombre = "Juan";
const edad = 25;
console.log(`Mi nombre es ${nombre} y tengo ${edad} años`);
```

**Destructuring**
```javascript
const persona = { nombre: "Ana", edad: 30 };
const { nombre, edad } = persona;

const numeros = [1, 2, 3];
const [primero, segundo] = numeros;
```

**Módulos**
```javascript
// exportar
export const PI = 3.14159;
export function calcular() { }

// importar
import { PI, calcular } from './modulo.js';
```

**Promesas**
```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

**Otras características clave:**
- Spread operator (`...`)
- Default parameters
- Rest parameters
- Iteradores y generadores
- Map, Set, WeakMap, WeakSet
- Symbols

### Evolución Anual (2016 en adelante)

A partir de ES2015, se adoptó un ciclo de lanzamiento anual:

**ES2016 (ES7)**
- `Array.prototype.includes()`
- Operador de exponenciación (`**`)

**ES2017 (ES8)**
- Async/Await
- Object.entries(), Object.values()
- String padding

**ES2018 (ES9)**
- Rest/Spread properties para objetos
- Asynchronous iteration
- Promise.finally()

**ES2019 (ES10)**
- Array.flat(), Array.flatMap()
- Object.fromEntries()
- Optional catch binding

**ES2020 (ES11)**
- Optional chaining (`?.`)
- Nullish coalescing operator (`??`)
- BigInt
- Dynamic import

**ES2021 (ES12)**
- String.replaceAll()
- Logical assignment operators
- Numeric separators

**ES2022 (ES13)**
- Top-level await
- Class fields
- Private methods and fields

---

## JavaScript Moderno en la Web

### Manipulación del DOM (Document Object Model)

El DOM es una representación estructurada del documento HTML que JavaScript puede manipular:

**Seleccionar elementos**
```javascript
// Por ID
const elemento = document.getElementById('miId');

// Por clase
const elementos = document.getElementsByClassName('miClase');

// Por selector CSS (más moderno)
const elemento = document.querySelector('.miClase');
const elementos = document.querySelectorAll('div.miClase');
```

**Modificar contenido**
```javascript
elemento.textContent = 'Nuevo texto';
elemento.innerHTML = '<strong>Texto en negrita</strong>';
```

**Modificar estilos**
```javascript
elemento.style.color = 'blue';
elemento.style.fontSize = '20px';
elemento.classList.add('activo');
elemento.classList.remove('inactivo');
elemento.classList.toggle('visible');
```

**Crear y agregar elementos**
```javascript
const nuevoDiv = document.createElement('div');
nuevoDiv.textContent = 'Contenido nuevo';
nuevoDiv.classList.add('mi-clase');
document.body.appendChild(nuevoDiv);
```

### Manejo de Eventos

Los eventos permiten que JavaScript responda a las acciones del usuario:

**addEventListener - La forma moderna**
```javascript
const boton = document.querySelector('#miBoton');

boton.addEventListener('click', () => {
  console.log('¡Botón clickeado!');
});

// Con función nombrada
function manejarClick(event) {
  console.log('Evento:', event);
  console.log('Elemento:', event.target);
}

boton.addEventListener('click', manejarClick);
```

**Eventos comunes**
```javascript
// Click
elemento.addEventListener('click', funcionManejadora);

// Eventos de teclado
input.addEventListener('keydown', (e) => console.log(e.key));
input.addEventListener('keyup', (e) => console.log(e.key));

// Eventos de formulario
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevenir envío
  console.log('Formulario enviado');
});

input.addEventListener('input', (e) => {
  console.log('Valor actual:', e.target.value);
});

// Eventos de mouse
elemento.addEventListener('mouseenter', () => console.log('Mouse entró'));
elemento.addEventListener('mouseleave', () => console.log('Mouse salió'));

// Eventos de ventana
window.addEventListener('load', () => console.log('Página cargada'));
window.addEventListener('resize', () => console.log('Ventana redimensionada'));
```

**Event delegation (delegación de eventos)**
```javascript
// En lugar de agregar un listener a cada elemento hijo
document.querySelector('#lista').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('Click en:', e.target.textContent);
  }
});
```

### Programación Asíncrona

**Callbacks (estilo antiguo)**
```javascript
function obtenerDatos(callback) {
  setTimeout(() => {
    callback({ nombre: 'Juan', edad: 30 });
  }, 1000);
}

obtenerDatos((datos) => {
  console.log(datos);
});
```

**Promesas (ES6)**
```javascript
function obtenerDatos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ nombre: 'Juan', edad: 30 });
    }, 1000);
  });
}

obtenerDatos()
  .then(datos => console.log(datos))
  .catch(error => console.error(error));
```

**Async/Await (ES2017) - La forma más moderna**
```javascript
async function cargarDatos() {
  try {
    const respuesta = await fetch('https://api.example.com/datos');
    const datos = await respuesta.json();
    console.log(datos);
  } catch (error) {
    console.error('Error:', error);
  }
}

cargarDatos();
```

### Fetch API - Peticiones HTTP

```javascript
// GET request
fetch('https://api.example.com/usuarios')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// POST request
fetch('https://api.example.com/usuarios', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nombre: 'Ana',
    email: 'ana@example.com'
  })
})
  .then(response => response.json())
  .then(data => console.log('Éxito:', data))
  .catch(error => console.error('Error:', error));

// Con async/await
async function obtenerUsuarios() {
  try {
    const response = await fetch('https://api.example.com/usuarios');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
}
```

---

## Impacto de JavaScript en el Desarrollo Moderno

### De Script Simple a Lenguaje Universal

JavaScript evolucionó de un simple lenguaje de scripting a:

**Frontend Frameworks y Libraries**
- React (Facebook/Meta)
- Vue.js
- Angular (Google)
- Svelte

**Backend con Node.js (2009)**
- JavaScript en el servidor
- npm: el ecosistema de paquetes más grande
- Express.js, Nest.js, Next.js

**Mobile**
- React Native
- Ionic
- NativeScript

**Desktop**
- Electron (VS Code, Slack, Discord)
- Tauri

**IoT y Embebidos**
- Johnny-Five
- Tessel

### JavaScript Hoy

- **Lenguaje más popular** según encuestas de desarrolladores
- **Ecosistema más grande** con millones de paquetes en npm
- **Versatilidad única**: mismo lenguaje para frontend, backend, mobile, desktop
- **Evolución continua** con nuevas características cada año
- **TypeScript**: superset que agrega tipado estático

---

## Recursos Recomendados

### Documentación
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [ECMAScript Language Specification](https://tc39.es/ecma262/)
- [JavaScript.info](https://javascript.info/)

### Libros
- Haverbeke, M. *Eloquent JavaScript* (disponible gratis online)
- Simpson, K. *You Don't Know JS* series
- Flanagan, D. *JavaScript: The Definitive Guide*

### Práctica
- [freeCodeCamp](https://www.freecodecamp.org/)
- [Exercism - JavaScript Track](https://exercism.org/tracks/javascript)
- [JavaScript30](https://javascript30.com/) - 30 proyectos en 30 días

---

## Características Clave de JavaScript Moderno (ES6+)

### Resumen para el Curso

1. **Declaración de variables con `let` y `const`**
   - `let`: para variables que pueden cambiar
   - `const`: para constantes
   - Evitar `var` en código moderno

2. **Funciones flecha (`=>`)**
   - Sintaxis más concisa
   - Contexto léxico del `this`

3. **Manipulación del DOM (Document Object Model)**
   - `querySelector`, `querySelectorAll`
   - Modificación de contenido y estilos
   - Creación dinámica de elementos

4. **Manejo de eventos (`addEventListener`)**
   - Responder a interacciones del usuario
   - Eventos de click, teclado, formularios
   - Event delegation para mejor rendimiento

5. **Programación asíncrona**
   - Promesas y async/await
   - Fetch API para peticiones HTTP

6. **Módulos ES6**
   - `import` y `export`
   - Organización modular del código

7. **Template literals**
   - Strings con interpolación
   - Strings multilínea

8. **Destructuring**
   - Extraer valores de objetos y arrays
   - Sintaxis más limpia y expresiva

---

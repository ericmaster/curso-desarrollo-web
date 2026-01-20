# Introducción a React  

---

## 1. ¿Qué es React?

**React** es una **biblioteca de JavaScript** de código abierto, creada por **Meta (Facebook)**, para construir **interfaces de usuario (UI)** interactivas, modulares y eficientes.

### ¿Por qué React?
- **Componentes reutilizables**: divide tu UI en bloques independientes.
- **Rendimiento**: usa el **Virtual DOM** para actualizaciones rápidas.
- **Ecosistema robusto**: millones de desarrolladores, herramientas y librerías.
- **Demanda industrial**: es la biblioteca frontend más usada en el mundo.

---

## 2. Conceptos fundamentales

### 2.1. Componentes
Un **componente** es una función de JavaScript que devuelve **JSX** (Javascript XML > HTML dentro de JS).

```jsx
function Saludo() {
  return <h1>¡Hola desde React!</h1>;
}
```

> Cada componente encapsula su propia **estructura, estilo y lógica**.

---

### 2.2. JSX (JavaScript + XML)
JSX permite escribir código similar a HTML dentro de JavaScript.

```jsx
const elemento = <div className="card">Contenido</div>;
```

por debajo esto se convierte a

```js
const elemento = React.createElement("div", {classname: "card"}, "Contenido");
```

> **Nota**:  
> - Usa `className` en lugar de `class`  
> - Las propiedades deben estar entre llaves: `{variable}`

---

### 2.3. Props (propiedades)
Los **props** permiten pasar datos a un componente, como atributos.

```jsx
function Perfil({ nombre, edad }) {
  return (
    <div>
      <h2>{nombre}</h2>
      <p>Edad: {edad}</p>
    </div>
  );
}

// Uso:
<Perfil nombre="Ana" edad={25} />
```

> Los props hacen a los componentes **reutilizables y dinámicos**.

---

### 2.4. Estado con `useState`
El **estado** son datos que cambian con el tiempo. React los gestiona con el *hook* `useState`.

```jsx
import { useState } from 'react';

function Contador() {
  const [valor, setValor] = useState(0);

  return (
    <div>
      <p>Contador: {valor}</p>
      <button onClick={() => setValor(valor + 1)}>
        Incrementar
      </button>
    </div>
  );
}
```

> Cuando el estado cambia, **React actualiza automáticamente la UI**.

---

### 2.5. Eventos
React maneja eventos con sintaxis similar a HTML, pero en camelCase.

```jsx
<button onClick={() => console.log("Clic")}>
  Haz clic
</button>
```

> Usa funciones flecha para evitar pérdida de contexto.

---

## 3. Guía paso a paso: Crear tu primera app con React

### Paso 1: Instalar Node.js
Asegúrate de tener [Node.js](https://nodejs.org/) instalado (versión 18+).

```bash
node -v  # debe mostrar v18.x o superior
```

---

### Paso 2: Crear un proyecto con Vite
Vite es una herramienta de construcción moderna, rápida y ligera.

```bash
npm create vite@latest mi-app-react -- --template react
cd mi-app-react
npm install
npm run dev
```

> Abre el enlace que muestra la terminal (ej. `http://localhost:5173`).

---

### Paso 3: Estructura del proyecto
```
mi-app-react/
├── public/
├── src/
│   ├── main.jsx
│   └── App.jsx
├── index.html
└── package.json
```

- **`App.jsx`**: componente principal
- **`main.jsx`**: punto de entrada

---

### Paso 4: Crear tu primer componente personalizado

1. Crea la carpeta `src/components`
2. Crea `src/components/Encabezado.jsx`:
```jsx
export default function Encabezado({ titulo }) {
  return <header><h1>{titulo}</h1></header>;
}
```

3. Úsalo en `App.jsx`:
```jsx
import Encabezado from './components/Encabezado';

function App() {
  return (
    <div>
      <Encabezado titulo="Mi Aplicación React" />
    </div>
  );
}
```

---

### Paso 5: Añadir estado interactivo

```jsx
import { useState } from 'react';

function Tema() {
  const [modoOscuro, setModoOscuro] = useState(false);

  return (
    <div className={modoOscuro ? 'oscuro' : 'claro'}>
      <button onClick={() => setModoOscuro(!modoOscuro)}>
        {modoOscuro ? 'Modo claro' : 'Modo oscuro'}
      </button>
    </div>
  );
}
```

> Añade estilos en `App.css` para ver el cambio visual.


---

## 6. Recursos recomendados

- **Documentación oficial**: https://react.dev/learn  


> **Consejo final**: React no es solo una herramienta, es una forma de pensar en la UI como un conjunto de componentes vivos, reactivos y reutilizables.
```
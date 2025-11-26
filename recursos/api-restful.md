
# APIs RESTful con React  
**Asignatura**: Desarrollo Web  
**Carrera**: Tecnología Superior en Desarrollo de Software – PUCE-TEC  

---

## ¿Qué es una API RESTful?

Una **API RESTful** (Application Programming Interface) es un conjunto de reglas y protocolos que permite a aplicaciones comunicarse entre sí mediante el protocolo **HTTP**.

- **REST** = *Representational State Transfer*  
- Usa **métodos HTTP estándar**: `GET`, `POST`, `PUT`, `DELETE`  
- Intercambia datos en formato **JSON** (JavaScript Object Notation)  
- Sigue principios de **arquitectura cliente-servidor**

---

## ¿Cómo interactúa React con una API?

React actúa como el **cliente** (frontend). Cuando necesita datos (ej. lista de usuarios), hace una **solicitud HTTP** a un **servidor** (backend o API pública).

### Flujo típico:
1. El componente se monta  
2. Se llama a `fetch()` o `axios` dentro de `useEffect`  
3. Se espera la respuesta (`await`)  
4. Se actualiza el estado con los datos recibidos  
5. La UI se re-renderiza con los nuevos datos

---

## Consumo básico de API con `fetch` y `useEffect`

### Ejemplo: Cargar lista de usuarios

```jsx
// App.jsx
import { useState, useEffect } from 'react';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!respuesta.ok) throw new Error('Error en la red');
        const datos = await respuesta.json();
        setUsuarios(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarUsuarios();
  }, []); // Solo al montar

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {usuarios.map(usuario => (
        <li key={usuario.id}>{usuario.name} – {usuario.email}</li>
      ))}
    </ul>
  );
}

export default App;
```

> **Patrón recomendado**: Tres estados → `datos`, `cargando`, `error`

---

## Métodos HTTP comunes en REST

| Método | Acción | Ejemplo en React |
|-------|--------|------------------|
| `GET` | Obtener datos | `fetch('/api/usuarios')` |
| `POST` | Crear recurso | `fetch('/api/usuarios', { method: 'POST', body: JSON.stringify(nuevo) })` |
| `PUT` | Actualizar completo | `fetch('/api/usuarios/1', { method: 'PUT', body: JSON.stringify(actualizado) })` |
| `DELETE` | Eliminar recurso | `fetch('/api/usuarios/1', { method: 'DELETE' })` |

> ⚠️ **Importante**: Siempre incluir encabezados para `POST/PUT`:
> ```js
> headers: { 'Content-Type': 'application/json' }
> ```

---

## Buenas prácticas al consumir APIs en React

1. **Usar `useEffect` con array de dependencias vacío** para cargas iniciales  
2. **Manejar estados de carga y error** para mejorar la UX  
3. **Validar la respuesta**: `if (!respuesta.ok) throw...`  
4. **Evitar fugas de memoria**: cancelar solicitudes si el componente se desmonta (opcional en nivel medio)  
5. **Encapsular lógica en custom hooks** (ej. `useFetch`) para reutilización

---

## Ejemplo completo: CRUD de tareas

### Crear una tarea (POST)

```jsx
const crearTarea = async (nuevaTarea) => {
  try {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaTarea)
    });
    
    if (!respuesta.ok) throw new Error('No se pudo crear la tarea');
    const datos = await respuesta.json();
    console.log('Tarea creada:', datos);
    return datos;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Uso en componente
function FormularioTarea() {
  const [titulo, setTitulo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearTarea({ 
      title: titulo, 
      completed: false, 
      userId: 1 
    });
    setTitulo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={titulo} 
        onChange={(e) => setTitulo(e.target.value)} 
        placeholder="Nueva tarea"
      />
      <button type="submit">Crear</button>
    </form>
  );
}
```

### Actualizar una tarea (PUT)

```jsx
const actualizarTarea = async (id, tareaActualizada) => {
  try {
    const respuesta = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tareaActualizada)
    });
    
    if (!respuesta.ok) throw new Error('No se pudo actualizar');
    return await respuesta.json();
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Eliminar una tarea (DELETE)

```jsx
const eliminarTarea = async (id) => {
  try {
    const respuesta = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE'
    });
    
    if (!respuesta.ok) throw new Error('No se pudo eliminar');
    console.log('Tarea eliminada:', id);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Uso en componente
function ItemTarea({ tarea, onEliminar }) {
  const handleEliminar = async () => {
    await eliminarTarea(tarea.id);
    onEliminar(tarea.id);
  };

  return (
    <div>
      <span>{tarea.title}</span>
      <button onClick={handleEliminar}>Eliminar</button>
    </div>
  );
}
```

---

## Custom Hook: `useFetch`

Para reutilizar la lógica de consumo de APIs, puedes crear un custom hook:

```jsx
// hooks/useFetch.js
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCargando(true);
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
          throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        const resultado = await respuesta.json();
        setDatos(resultado);
        setError(null);
      } catch (err) {
        setError(err.message);
        setDatos(null);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, [url]);

  return { datos, cargando, error };
}

// Uso del hook
function App() {
  const { datos: usuarios, cargando, error } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  );

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {usuarios?.map(usuario => (
        <li key={usuario.id}>{usuario.name}</li>
      ))}
    </ul>
  );
}
```

---

## Axios vs Fetch

**Axios** es una alternativa popular a `fetch` con características adicionales:

### Instalación
```bash
npm install axios
```

### Comparación

| Característica | fetch | axios |
|---------------|-------|-------|
| Incluido en navegador | ✅ Sí | ❌ No (requiere instalación) |
| Transformación automática JSON | ❌ Manual | ✅ Automática |
| Timeout | ❌ Requiere AbortController | ✅ Configuración simple |
| Interceptores | ❌ No | ✅ Sí |
| Manejo de errores HTTP | Manual (verificar `ok`) | Automático |

### Ejemplo con Axios

```jsx
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(respuesta => {
        setUsuarios(respuesta.data); // No necesita .json()
        setCargando(false);
      })
      .catch(err => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  // ... resto del componente
}

// Crear con axios
const crearUsuario = async (nuevoUsuario) => {
  try {
    const respuesta = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      nuevoUsuario // Headers automáticos
    );
    return respuesta.data;
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## Autenticación con APIs

Muchas APIs requieren autenticación mediante tokens:

### Ejemplo con Token Bearer

```jsx
const API_URL = 'https://api.ejemplo.com';
const TOKEN = 'tu-token-aqui'; // Idealmente desde variables de entorno

// GET con autenticación
const obtenerDatosProtegidos = async () => {
  try {
    const respuesta = await fetch(`${API_URL}/datos`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!respuesta.ok) throw new Error('No autorizado');
    return await respuesta.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

// Con Axios (configuración global)
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.ejemplo.com',
  headers: {
    'Authorization': `Bearer ${TOKEN}`
  }
});

// Usar el cliente configurado
const obtenerDatos = async () => {
  const respuesta = await apiClient.get('/datos');
  return respuesta.data;
};
```

---

## Manejo de estados de carga avanzado

### Componente con estados detallados

```jsx
function ListaConEstados() {
  const [datos, setDatos] = useState([]);
  const [estado, setEstado] = useState('idle'); // idle, loading, success, error
  const [error, setError] = useState(null);

  const cargarDatos = async () => {
    setEstado('loading');
    try {
      const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!respuesta.ok) throw new Error('Error al cargar');
      const resultado = await respuesta.json();
      setDatos(resultado);
      setEstado('success');
    } catch (err) {
      setError(err.message);
      setEstado('error');
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  if (estado === 'idle' || estado === 'loading') {
    return <div className="spinner">Cargando...</div>;
  }

  if (estado === 'error') {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={cargarDatos}>Reintentar</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Posts ({datos.length})</h2>
      {datos.map(post => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}
```

---

## Paginación de resultados

```jsx
function ListaPaginada() {
  const [posts, setPosts] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargarPagina = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${pagina}&_limit=10`
        );
        const datos = await respuesta.json();
        setPosts(datos);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarPagina();
  }, [pagina]);

  return (
    <div>
      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <>
          <ul>
            {posts.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
          <div>
            <button 
              onClick={() => setPagina(p => Math.max(1, p - 1))}
              disabled={pagina === 1}
            >
              Anterior
            </button>
            <span>Página {pagina}</span>
            <button onClick={() => setPagina(p => p + 1)}>
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}
```

---

## Búsqueda y filtrado

```jsx
function BuscadorUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtrados, setFiltrados] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(datos => {
        setUsuarios(datos);
        setFiltrados(datos);
      });
  }, []);

  useEffect(() => {
    const resultados = usuarios.filter(usuario =>
      usuario.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busqueda.toLowerCase())
    );
    setFiltrados(resultados);
  }, [busqueda, usuarios]);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por nombre o email..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <p>Resultados: {filtrados.length}</p>
      <ul>
        {filtrados.map(usuario => (
          <li key={usuario.id}>
            {usuario.name} - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Variables de entorno para URLs de API

En proyectos reales, usa variables de entorno para manejar diferentes URLs:

### En Vite (React)

Crear archivo `.env`:
```env
VITE_API_URL=https://api.ejemplo.com
VITE_API_KEY=tu-clave-api
```

Usar en código:
```jsx
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const obtenerDatos = async () => {
  const respuesta = await fetch(`${API_URL}/endpoint`, {
    headers: {
      'X-API-Key': API_KEY
    }
  });
  return await respuesta.json();
};
```

> ⚠️ **Importante**: No incluir `.env` en git. Agregar a `.gitignore`

---

## Códigos de estado HTTP comunes

| Código | Significado | Ejemplo |
|--------|-------------|---------|
| 200 | OK | Solicitud exitosa |
| 201 | Created | Recurso creado exitosamente |
| 204 | No Content | Eliminación exitosa sin contenido |
| 400 | Bad Request | Datos inválidos enviados |
| 401 | Unauthorized | Falta autenticación |
| 403 | Forbidden | Sin permisos |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error del servidor |

### Manejo de códigos de estado

```jsx
const manejarRespuesta = async (respuesta) => {
  if (respuesta.status === 200) {
    return await respuesta.json();
  } else if (respuesta.status === 404) {
    throw new Error('Recurso no encontrado');
  } else if (respuesta.status === 401) {
    throw new Error('No autorizado - verifica tus credenciales');
  } else if (respuesta.status >= 500) {
    throw new Error('Error del servidor - intenta más tarde');
  } else {
    throw new Error(`Error desconocido: ${respuesta.status}`);
  }
};
```

---

## APIs públicas para práctica

- **JSONPlaceholder**: https://jsonplaceholder.typicode.com/ (posts, users, comments)
- **ReqRes**: https://reqres.in/ (usuarios simulados)
- **The Cat API**: https://thecatapi.com/ (imágenes de gatos)
- **OpenWeatherMap**: https://openweathermap.org/api (clima)
- **PokeAPI**: https://pokeapi.co/ (Pokémon)
- **Rick and Morty API**: https://rickandmortyapi.com/ (personajes)
- **REST Countries**: https://restcountries.com/ (información de países)

---

## Recursos recomendados

- **Documentación de fetch**: https://developer.mozilla.org/es/docs/Web/API/Fetch_API  
- **JSONPlaceholder**: https://jsonplaceholder.typicode.com/ (API de prueba gratuita)  
- **Axios**: https://axios-http.com/docs/intro
- **React Query**: https://tanstack.com/query/latest (librería avanzada para manejo de datos)
- **Libro del programa**: *Full-Stack React Projects* (Shu, 2019) – Capítulo 1  
- **MDN Web Docs – HTTP**: https://developer.mozilla.org/es/docs/Web/HTTP
- **REST API Tutorial**: https://restfulapi.net/

---


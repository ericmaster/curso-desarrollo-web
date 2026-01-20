# Semana 7: Gestión de Estado Avanzado y Custom Hooks en React  

---

### 1. El problema del estado distribuido
En semanas anteriores, los estudiantes usaron `useState` y `useEffect` directamente en componentes. Sin embargo, al escalar:

- La **lógica se duplica** (ej. `fetch` en varios componentes)
- El **prop drilling** complica la jerarquía
- El **código se vuelve difícil de mantener y probar**

---

### 2. Custom hooks: definición y principios
Un **custom hook** es una función JavaScript que:
- **Comienza con `use`** (convención obligatoria)
- **Puede invocar otros hooks** (`useState`, `useEffect`, etc.)
- **No devuelve JSX**, solo lógica reutilizable

---

### 3. Patrón 1: `useFetch` – consumo de APIs
Este hook abstrae toda la lógica de carga de datos:

```jsx
// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};
```

---

### 4. Patrón 2: `useLocalStorage` – persistencia en el cliente
Permite que el estado sobreviva al recargar la página:

```jsx
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Falló al leer ${key} de localStorage.`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Falló al guardar ${key} en localStorage.`, error);
    }
  }, [key, value]);

  return [value, setValue];
};
```

---

### 5. Composición de hooks
Los hooks pueden **combinarse** para crear lógica de alto nivel:

```jsx
// src/hooks/usePosts.js
import { useFetch } from './useFetch';

export const usePosts = () => {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  return { posts: data || [], loading, error };
};
```

Esto permite:
- **Ocultar detalles técnicos** (URL, manejo de errores)
- **Exponer una API limpia** al componente

---

### 6. Buenas prácticas y errores comunes
- **✅ Haz**: nombrar hooks con prefijo `use`, documentar con JSDoc
- **❌ No hagas**: llamar hooks condicionalmente, retornar JSX
- **⚠️ Cuidado con**: ciclos infinitos en `useEffect` (dependencias mal gestionadas)

---


##  Trabajo autónomo

1. **Extender `useLocalStorage`** para gestionar un arreglo (ej. lista de hobbies que el usuario puede añadir/eliminar).
2. **Leer**:
   - *Full-Stack React Projects* (Shu, 2019), Capítulo 1 – disponible en bibliografía básica
   - Documentación oficial: [Reusing Logic with Custom Hooks – React.dev](https://react.dev/learn/reusing-logic-with-custom-hooks)

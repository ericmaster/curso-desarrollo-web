# Ejemplo de Prop Drilling

Este proyecto demuestra el patrón de **Prop Drilling** en React.

## ¿Qué es Prop Drilling?

Prop Drilling es el proceso de pasar datos de un componente padre a componentes hijos profundamente anidados a través de props, incluso cuando los componentes intermedios no necesitan esos datos.

## Estructura del ejemplo

```
App (estado: modoOscuro, toggleTema)
  └── Layout (recibe: modoOscuro, toggleTema) ← No los usa, solo los pasa
        └── Sidebar (recibe: modoOscuro, toggleTema) ← No los usa, solo los pasa
              └── ThemeToggler (recibe: modoOscuro, toggleTema) ← ¡Los usa!
```

## Problema

- Los componentes `Layout` y `Sidebar` no necesitan `modoOscuro` ni `toggleTema`
- Solo los reciben para pasarlos al siguiente nivel
- Esto hace el código más difícil de mantener
- Si cambian las props, hay que actualizar múltiples componentes

## Solución

Para evitar el prop drilling, se puede usar:
- **Context API** de React
- **Estado global** (Redux, Zustand, etc.)

## Ejecutar el proyecto

```bash
npm install
npm run dev
```

## Archivos principales

- `src/App.jsx` - Componente principal con el estado
- `src/components/Layout.jsx` - Primer nivel de drilling
- `src/components/Sidebar.jsx` - Segundo nivel de drilling
- `src/components/ThemeToggler.jsx` - Componente que realmente usa las props

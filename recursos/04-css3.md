# CSS3

CSS (Cascading Style Sheets) permite definir la presentación visual de una página web, separando completamente el contenido (HTML) del diseño y la apariencia.

## Historia y Evolución de CSS

**CSS1 (1996)**
- Propiedades básicas: colores, fuentes, márgenes
- Posicionamiento limitado

**CSS2 (1998)**
- Posicionamiento absoluto y relativo
- Z-index para capas
- Media types básicos (print, screen)

**CSS3 (1999-presente)**
CSS3 introdujo un enfoque modular con características revolucionarias:

## Características adicionales

### Selectores Avanzados
```css
/* Selector de atributo */
input[type="email"] { border: 2px solid blue; }

/* Pseudo-clases estructurales */
tr:nth-child(odd) { background: #f9f9f9; }
li:first-of-type { font-weight: bold; }

/* Pseudo-elementos */
p::before { content: "→ "; }
p::first-line { font-weight: bold; }
```

### Flexbox - Layout Unidimensional (2009)
```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.item {
  flex: 1 1 300px; /* grow, shrink, basis */
}
```
**Ventajas:**
- Alineación vertical sencilla
- Distribución de espacio flexible
- Orden visual independiente del HTML

### CSS Grid - Layout Bidimensional (2017)
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
```
**Revolucionó:**
- Layouts complejos sin frameworks
- Control preciso sobre filas y columnas
- Responsive design nativo

### Media Queries - Diseño Responsive
```css
/* Mobile first approach */
.container {
  width: 100%;
  padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    max-width: 750px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
}

/* Print styles */
@media print {
  .no-print { display: none; }
}
```

### Animaciones y Transiciones
```css
/* Transiciones suaves */
.button {
  background: #3498db;
  transition: all 0.3s ease;
}

.button:hover {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* Animaciones complejas */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-element {
  animation: slideIn 0.5s ease-out;
}
```

### Transformaciones 2D y 3D
```css
.card {
  transform: perspective(1000px) rotateY(45deg);
  transform-style: preserve-3d;
}

.flip-card:hover {
  transform: rotateY(180deg);
}
```

### Variables CSS (Custom Properties)
- Variables reutilizables en CSS
- Temas dinámicos y mantenimiento simplificado

```css
:root {
  --primary-color: #3498db;
  --secondary-color: #2c3e50;
  --border-radius: 8px;
  --font-family: 'Helvetica Neue', sans-serif;
}

.card {
  background: var(--primary-color);
  border-radius: var(--border-radius);
  color: var(--secondary-color);
}

/* Responsive variables */
@media (min-width: 768px) {
  :root {
    --border-radius: 12px;
  }
}
```

### CSS Logical Properties (2017)
```css
/* En lugar de margin-left/right */
margin-inline-start: 10px;
margin-inline-end: 10px;
```
- Soporte para escritura internacional (RTL/LTR)
- Propiedades lógicas en lugar de físicas

**CSS Container Queries (2021-2022)**
```css
@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
```
- Responsive design basado en el contenedor, no en el viewport
- Mayor control granular del layout

### Metodologías de Organización CSS

**BEM (Block Element Modifier)**
```css
/* Block */
.card { }

/* Element */
.card__title { }
.card__content { }

/* Modifier */
.card--featured { }
.card__title--large { }
```

**CSS Modules / Scoped Styles**
- Evita conflictos de nombres
- Estilos encapsulados por componente

### Características Modernas Importantes

**Box Model Mejorado**
```css
* {
  box-sizing: border-box; /* Incluye padding y border en el width */
}
```

**Funciones CSS Avanzadas**
```css
.responsive-font {
  font-size: clamp(1rem, 2.5vw, 2rem); /* min, preferred, max */
}

.dynamic-grid {
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
}

.modern-colors {
  background: hsl(200, 50%, 50%);
  color: oklch(0.7 0.15 180); /* Perceptually uniform */
}
```

### Impacto en el Desarrollo Web Moderno

El diseño **responsive** y **mobile-first** se convirtió en estándar, asegurando que las interfaces se adapten fluidamente a:
- **Smartphones** (320px - 768px)
- **Tablets** (768px - 1024px) 
- **Desktop** (1024px+)
- **TV/Large screens** (1440px+)
# Curso de Desarrollo Web

## Índice

### Recursos Teóricos

1. [Fundamentos de Javascript](recursos/01-Fundamentos-de-Javascript.jsnb)
2. [DOM](recursos/02-DOM.jsnb)
3. [Introducción](recursos/03-intro.md)
4. [Hojas de Estilo (CSS3)](recursos/04-css3.md)
5. [Fundamentos de Git](recursos/05-fundamentos-git.md)
6. [Autenticación en React](recursos/06-autenticacion-react.md)
7. [API RESTful](recursos/07-api-restful.md)
8. [React](recursos/08-react.md)
9. [React Hooks](recursos/09-react-hooks.md)
10. [React Hooks 2](recursos/10-react-hooks-2.md)
11. [Javascript Avanzado](recursos/11-js.md)
12. [API RESTful con Express](recursos/12-api-restful-express.md)
13. [Persistencia de Datos](recursos/13-persistencia-de-datos.md)
14. [Docker y Containers](recursos/14-docker-containers.md)
15. [Validación, Seguridad y Middleware en Express](recursos/15-validacion-seguridad-middleware-express.md)

---

## Generación de Presentaciones

Este proyecto utiliza [reveal-md](https://github.com/webpro/reveal-md) para convertir los archivos Markdown en presentaciones interactivas.

### Instalación

Primero, instala las dependencias del proyecto:

```bash
npm install
```

### Visualización de Presentaciones

Para ver las presentaciones en modo interactivo (servidor local):

```bash
# Ver todas las presentaciones
npm run slides

# Ver una presentación específica
npm run slides:intro    # Presentación de Introducción
npm run slides:css3     # Presentación de CSS3
```

Esto abrirá un servidor local en `http://localhost:1948` donde podrás navegar por las presentaciones usando las flechas del teclado.

### Exportación de Presentaciones

Para generar archivos HTML estáticos de las presentaciones:

```bash
# Exportar todas las presentaciones
npm run export:all

# Exportar una presentación específica
npm run export:intro    # Exporta a presentaciones/intro
npm run export:css3     # Exporta a presentaciones/css3
```

Las presentaciones exportadas se guardarán en la carpeta `presentaciones/` y podrás abrirlas directamente en tu navegador sin necesidad de un servidor.

### Uso Avanzado de reveal-md

También puedes usar reveal-md directamente con más opciones:

```bash
# Ver con un tema diferente
npx reveal-md recursos/intro.md --theme night

# Exportar a PDF (requiere Chrome/Chromium instalado)
npx reveal-md recursos/intro.md --print presentaciones/intro.pdf

# Ver con configuración personalizada
npx reveal-md recursos/intro.md --theme solarized --highlight-theme atom-one-dark
```

**Temas disponibles:** `black`, `white`, `league`, `beige`, `sky`, `night`, `serif`, `simple`, `solarized`, `blood`, `moon`

### Personalización

El proyecto incluye un archivo `reveal-md.json` con la configuración por defecto de las presentaciones. Puedes modificar este archivo para cambiar:

- **theme:** Tema visual de la presentación
- **highlightTheme:** Tema de resaltado de código
- **transition:** Tipo de transición entre diapositivas (`slide`, `fade`, `convex`, etc.)
- **slideNumber:** Mostrar u ocultar numeración de diapositivas
- Y muchas más opciones...

### Navegación en las Presentaciones

- **Flechas izquierda/derecha:** Navegar entre secciones principales
- **Flechas arriba/abajo:** Navegar entre sub-secciones
- **ESC:** Vista general de todas las diapositivas
- **F:** Pantalla completa
- **S:** Modo presentador (con notas)

---

## Archivos del Proyecto

- `package.json`: Configuración del proyecto y scripts npm
- `reveal-md.json`: Configuración de las presentaciones
- `REVEAL-MD-GUIA.md`: Guía completa sobre cómo usar reveal-md y personalizar presentaciones
- `.gitignore`: Archivos y carpetas excluidos del control de versiones

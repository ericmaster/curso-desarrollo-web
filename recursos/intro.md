# Introducción al Desarrollo Web

## Objetivo de la semana
Comprender los fundamentos del desarrollo web mediante el uso de tecnologías esenciales del lado del cliente: **HTML5**, **CSS3** y **JavaScript moderno (ES6+)**, y aplicarlos en la creación de una primera aplicación web estática y responsive.

---

## Contenido

### 1. Historia de la Web

#### Los Orígenes (1989-1991)
- La **World Wide Web** fue inventada en 1989 por **Tim Berners-Lee** mientras trabajaba en el CERN (Organización Europea para la Investigación Nuclear) en Suiza.
- Objetivo: crear un sistema de información global que permitiera a los científicos compartir datos y documentos de manera eficiente.

Los tres pilares fundamentales que estableció fueron:
- **HTML** (HyperText Markup Language): Para estructurar documentos
- **HTTP** (HyperText Transfer Protocol): Para transferir información
- **URLs** (Uniform Resource Locators): Para identificar recursos únicamente

El primer sitio web fue puesto en línea el **6 de agosto de 1991** en `http://info.cern.ch/hypertext/WWW/TheProject.html`

#### La Evolución de HTTP

**HTTP/0.9 (1991)**
- Versión inicial extremadamente simple
- Solo soportaba el método GET
- Sin headers, sin códigos de estado
- Solo transfería documentos HTML

**HTTP/1.0 (1996)**
- Introducción de headers de solicitud y respuesta
- Códigos de estado (200, 404, 500, etc.)
- Soporte para diferentes tipos de contenido (imágenes, videos)
- Métodos POST, HEAD además de GET

**HTTP/1.1 (1997)**
- Conexiones persistentes (keep-alive)
- Chunked transfer encoding
- Host header obligatorio (permitió hosting virtual)
- Nuevos métodos: PUT, DELETE, OPTIONS, TRACE

**HTTP/2 (2015)**
- Multiplexación de streams
- Compresión de headers
- Server push
- Protocolo binario en lugar de texto

**HTTP/3 (2022)**
- Mejor rendimiento en redes con pérdida de paquetes
- Conexiones más rápidas

#### La Evolución del HTML

**HTML 1.0 (1991)**
- 18 etiquetas básicas: `<h1>`, `<p>`, `<a>`, `<ul>`, `<li>`, etc.
- Enfoque puramente en estructura de documentos

**HTML 2.0 (1995)**
- Formularios básicos con `<form>`, `<input>`, `<textarea>`
- Primera especificación oficial del W3C

**HTML 3.2 (1997)**
- Tablas para layout (`<table>`, `<tr>`, `<td>`)
- Applets de Java
- Mejor soporte para formularios

**HTML 4.0/4.01 (1997-1999)**
- Separación de contenido y presentación
- Introducción de CSS
- Frames para dividir ventanas
- Mejor accesibilidad

**XHTML (2000)**
- HTML reformulado como XML
- Sintaxis más estricta
- Documentos bien formados obligatorios

### 2. La Revolución de HTML5

HTML5 representó un cambio paradigmático en el desarrollo web (2008), introduciendo:

**Semántica Mejorada**
```html
<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>
```
- Estructura más clara y significativa (tanto para humanos como para máquinas!)
- Mejor SEO y accesibilidad
- Facilita el mantenimiento del código

**Multimedia Nativa**
```html
<video controls>
  <source src="movie.mp4" type="video/mp4">
</video>
<audio controls>
  <source src="song.mp3" type="audio/mp3">
</audio>
```
- Eliminó la dependencia de plugins como Flash
- Reproducción nativa en navegadores

**APIs JavaScript Avanzadas**
- **Canvas**: Gráficos 2D/3D dinámicos
- **Geolocation**: Ubicación del usuario
- **Local Storage**: Almacenamiento local persistente
- **Web Workers**: Procesamiento en segundo plano
- **WebSockets**: Comunicación bidireccional en tiempo real

**Formularios Mejorados**
```html
<input type="email" required>
<input type="date">
<input type="range" min="0" max="100">
```
- Validación nativa del navegador
- Nuevos tipos de input especializados
- Mejor experiencia de usuario

**Diseño Responsive**
- Meta viewport para dispositivos móviles
- Media queries en CSS3
- Layouts flexibles con Flexbox y Grid

#### Impacto en el Desarrollo Moderno

HTML5, junto con CSS3 y JavaScript ES6+, estableció las bases para:
- **Single Page Applications (SPAs)**
- **Progressive Web Apps (PWAs)**
- **Aplicaciones web que rivalizan con apps nativas**
- **Desarrollo mobile-first**
- **Experiencias multimedia ricas sin plugins**

Esta evolución transformó la web de un conjunto de documentos estáticos a una plataforma de aplicaciones completa y dinámica.

---

### 3. Estilización con CSS3

CSS (Cascading Style Sheets) permite definir la presentación visual de una página web.  
**CSS3** incluye:
- Selectores avanzados
- Diseño flexible con **Flexbox** y **Grid**
- **Media queries** para diseño responsive
- Transiciones, transformaciones y animaciones

CSS3 permitió:
- Eliminación de dependencias de JavaScript para layouts
- Diseños complejos sin frameworks externos
- Mejor rendimiento y accesibilidad
- Mantenimiento simplificado del código
- Experiencias visuales ricas y fluidas

---

### 4. Interactividad con JavaScript (ES6+)
JavaScript es el lenguaje de programación del lado del cliente que permite hacer páginas web interactivas.
Características clave de **JavaScript moderno (ES6+)**:
- Declaración de variables con `let` y `const`
- Funciones flecha (`=>`)
- Manipulación del DOM (Document Object Model)
- Manejo de eventos (`addEventListener`)


---

### 5. Creación de una primera aplicación web
Una aplicación web básica debe:
- Tener una estructura HTML semántica
- Incluir estilos CSS internos o externos
- Usar JavaScript para añadir interacción mínima
- Ser autocontenida (un solo archivo o pocos archivos)
- Funcionar localmente sin servidor

---

## Recursos recomendados
- Duckett, J. (2014). *HTML & CSS: Design and Build Websites*.  
  [https://sites.math.duke.edu/courses/math_everywhere/assets/techRefs/HTML%20and%20CSS-%20Design%20and%20Build%20Websites_Jon%20Duckett_2011.pdf](https://sites.math.duke.edu/courses/math_everywhere/assets/techRefs/HTML%20and%20CSS-%20Design%20and%20Build%20Websites_Jon%20Duckett_2011.pdf)
- Documentación oficial de MDN Web Docs:  
  - [HTML](https://developer.mozilla.org/es/docs/Web/HTML)  
  - [CSS](https://developer.mozilla.org/es/docs/Web/CSS)  
  - [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)

---
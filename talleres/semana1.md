# Ejercicio Semana 1: Hoja de Vida Digital Responsiva

## Objetivo
Crear una **hoja de vida digital estática** utilizando únicamente **HTML5**, **CSS3** y un toque de **JavaScript (opcional)**, aplicando principios básicos de **diseño UI/UX** y **responsive design**.

---

## Contenido requerido

La hoja de vida debe incluir las siguientes secciones, organizadas en **dos columnas**:

### **Columna izquierda** (≈35% del ancho)
- **Datos personales**:  
  - Nombre completo  
  - Foto (puede ser un placeholder)  
  - Teléfono  
  - Correo electrónico  
  - Ciudad / País  
- **Hobbies o intereses**  
- **Otros datos relevantes**:  
  - Idiomas  
  - Disponibilidad  
  - Perfil profesional breve (1–2 líneas)

### **Columna derecha** (≈65% del ancho)
- **Formación académica**:  
  - Título, institución, fechas, ubicación  
- **Experiencia laboral o proyectos relevantes**:  
  - Cargo/rol, empresa/proyecto, fechas, descripción breve  
- **Habilidades técnicas**:  
  - Lenguajes, herramientas, frameworks (pueden ser íconos o listas)

> **Nota**: El contenido puede ser ficticio o personal. Se valora la claridad y organización, no la veracidad.

---

## Requerimientos de UI/UX

1. **Diseño limpio y profesional**  
   - Paleta de colores coherente (máximo 3 colores principales)  
   - Tipografía legible (sans-serif recomendada)  
   - Espaciado adecuado (uso de `padding` y `margin`)

2. **Responsive design**  
   - En pantallas **anchas** (≥768 px): dos columnas lado a lado  
   - En pantallas **estrechas** (<768 px): una sola columna (izquierda arriba, derecha abajo)  
   - Usar **media queries** (no frameworks externos)

3. **Accesibilidad básica**  
   - Etiquetas semánticas (`<header>`, `<section>`, `<aside>`, `<main>`)  
   - Atributo `alt` en imágenes  
   - Contraste adecuado entre texto y fondo

4. **Interactividad mínima (opcional pero valorada)**  
   - Un botón que muestre/oculte un dato adicional (ej. “Mostrar más sobre mí”)  
   - Cambio de color al pasar el mouse sobre enlaces o botones

5. **Autocontenido**  
   - El código puede estar en **un solo archivo HTML** (CSS interno en `<style>`, JS en `<script>`) o máximo en 3 archivos (`.html`, `.css` y `.js`)  
   - Sin dependencias externas (ni Bootstrap, ni enlaces a CDN)

---

## Entregable

- Archivo `hoja-de-vida.html`  
- Funcional en cualquier navegador moderno  
- Código bien indentado y comentado (mínimo)

---

## 💡 Consejo para estudiantes

> Usa esta hoja de vida como base para tu portafolio personal. En semanas posteriores, la podrás convertir en una app React, conectarla a una API o desplegarla en la nube.
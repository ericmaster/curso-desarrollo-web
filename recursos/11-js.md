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

**Spread Operator (`...`)**
```javascript
// Copiar arrays
const numeros = [1, 2, 3];
const copiaNumeros = [...numeros];
const combinados = [...numeros, 4, 5, 6]; // [1, 2, 3, 4, 5, 6]

// Combinar arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const combinado = [...arr1, ...arr2]; // [1, 2, 3, 4]

// Copiar y modificar objetos
const persona = { nombre: 'Ana', edad: 25 };
const personaActualizada = { ...persona, edad: 26 };
// { nombre: 'Ana', edad: 26 }

// Pasar elementos de un array como argumentos
const numeros = [5, 10, 15];
console.log(Math.max(...numeros)); // 15
```

**Default Parameters (Parámetros por defecto)**
```javascript
// Antes de ES6
function saludar(nombre) {
  nombre = nombre || 'Usuario';
  return 'Hola ' + nombre;
}

// Con ES6
function saludar(nombre = 'Usuario') {
  return `Hola ${nombre}`;
}

saludar(); // "Hola Usuario"
saludar('Carlos'); // "Hola Carlos"

// Con múltiples parámetros
function crearUsuario(nombre, edad = 18, activo = true) {
  return { nombre, edad, activo };
}

crearUsuario('Ana'); // { nombre: 'Ana', edad: 18, activo: true }
crearUsuario('Luis', 25); // { nombre: 'Luis', edad: 25, activo: true }
```

**Rest Parameters (Parámetros rest)**
```javascript
// Capturar número variable de argumentos
function sumar(...numeros) {
  return numeros.reduce((total, num) => total + num, 0);
}

sumar(1, 2, 3); // 6
sumar(1, 2, 3, 4, 5); // 15

// Combinar con parámetros normales
function presentar(saludo, ...nombres) {
  return `${saludo} ${nombres.join(', ')}`;
}

presentar('Hola', 'Ana', 'Luis', 'Pedro');
// "Hola Ana, Luis, Pedro"

// Diferencia entre rest y spread
function ejemplo(a, b, ...resto) {
  console.log(a);      // 1
  console.log(b);      // 2
  console.log(resto);  // [3, 4, 5]
}

ejemplo(1, 2, 3, 4, 5);
```

**Iteradores y Generadores**
```javascript
// Generador simple
function* contadorGenerador() {
  yield 1;
  yield 2;
  yield 3;
}

const contador = contadorGenerador();
console.log(contador.next()); // { value: 1, done: false }
console.log(contador.next()); // { value: 2, done: false }
console.log(contador.next()); // { value: 3, done: false }
console.log(contador.next()); // { value: undefined, done: true }

// Generador con bucle infinito
function* generadorInfinito() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const gen = generadorInfinito();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2

// Iterable personalizado
const rango = {
  inicio: 1,
  fin: 5,
  
  [Symbol.iterator]() {
    let actual = this.inicio;
    const fin = this.fin;
    
    return {
      next() {
        if (actual <= fin) {
          return { value: actual++, done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const num of rango) {
  console.log(num); // 1, 2, 3, 4, 5
}
```

**Map y Set**
```javascript
// Map - Colección de pares clave-valor
const mapa = new Map();

// Agregar elementos
mapa.set('nombre', 'Ana');
mapa.set('edad', 25);
mapa.set(1, 'uno');
mapa.set(true, 'verdadero');

// Obtener valores
console.log(mapa.get('nombre')); // 'Ana'
console.log(mapa.has('edad')); // true
console.log(mapa.size); // 4

// Iterar sobre Map
mapa.forEach((valor, clave) => {
  console.log(`${clave}: ${valor}`);
});

for (const [clave, valor] of mapa) {
  console.log(`${clave} => ${valor}`);
}

// Set - Colección de valores únicos
const conjunto = new Set();

conjunto.add(1);
conjunto.add(2);
conjunto.add(2); // No se agrega (duplicado)
conjunto.add(3);

console.log(conjunto.size); // 3
console.log(conjunto.has(2)); // true

// Eliminar duplicados de un array
const numeros = [1, 2, 2, 3, 4, 4, 5];
const unicos = [...new Set(numeros)]; // [1, 2, 3, 4, 5]

// Iterar sobre Set
conjunto.forEach(valor => console.log(valor));

for (const valor of conjunto) {
  console.log(valor);
}
```

**WeakMap y WeakSet**
```javascript
// WeakMap - Map con referencias débiles (claves solo objetos)
const weakMap = new WeakMap();
let obj = { nombre: 'Ana' };

weakMap.set(obj, 'información adicional');
console.log(weakMap.get(obj)); // 'información adicional'

// Cuando obj se elimina, la entrada en WeakMap también
obj = null; // Ahora puede ser recolectado por el GC

// Uso común: datos privados
const datosPrivados = new WeakMap();

class Usuario {
  constructor(nombre, password) {
    this.nombre = nombre;
    datosPrivados.set(this, { password });
  }
  
  verificarPassword(password) {
    return datosPrivados.get(this).password === password;
  }
}

// WeakSet - Set con referencias débiles
const visitados = new WeakSet();

function marcarVisitado(elemento) {
  visitados.add(elemento);
}

function fueVisitado(elemento) {
  return visitados.has(elemento);
}
```

**Symbols**
```javascript
// Crear símbolos únicos
const sym1 = Symbol();
const sym2 = Symbol('descripcion');
const sym3 = Symbol('descripcion');

console.log(sym2 === sym3); // false (cada Symbol es único)

// Uso como propiedades de objetos
const ID = Symbol('id');

const usuario = {
  nombre: 'Ana',
  [ID]: 12345
};

console.log(usuario[ID]); // 12345
console.log(Object.keys(usuario)); // ['nombre'] - Symbol no aparece

// Símbolos bien conocidos (well-known symbols)
const coleccion = {
  items: [1, 2, 3],
  
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => ({
        value: this.items[index++],
        done: index > this.items.length
      })
    };
  }
};

for (const item of coleccion) {
  console.log(item); // 1, 2, 3
}

// Symbol.toStringTag
class MiClase {
  get [Symbol.toStringTag]() {
    return 'MiClase';
  }
}

const instancia = new MiClase();
console.log(instancia.toString()); // [object MiClase]

// Symbol.for() - Símbolos globales
const globalSym1 = Symbol.for('app.id');
const globalSym2 = Symbol.for('app.id');
console.log(globalSym1 === globalSym2); // true
```

### Evolución Anual (2016 en adelante)

A partir de ES2015, se adoptó un ciclo de lanzamiento anual:

**ES2016 (ES7)**

*Array.prototype.includes()*
```javascript
// Antes
const frutas = ['manzana', 'banana', 'naranja'];
console.log(frutas.indexOf('banana') !== -1); // true

// Con ES2016
console.log(frutas.includes('banana')); // true
console.log(frutas.includes('uva')); // false

// Funciona con NaN (a diferencia de indexOf)
const numeros = [1, 2, NaN, 4];
console.log(numeros.includes(NaN)); // true
console.log(numeros.indexOf(NaN)); // -1
```

*Operador de exponenciación (`**`)*
```javascript
// Antes
Math.pow(2, 3); // 8

// Con ES2016
2 ** 3; // 8
2 ** 10; // 1024

// Se puede combinar con asignación
let num = 2;
num **= 3; // num = 8
```

**ES2017 (ES8)**

*Async/Await*
```javascript
// Antes con Promesas
function obtenerUsuario() {
  return fetch('/api/usuario')
    .then(response => response.json())
    .then(usuario => {
      return fetch(`/api/posts/${usuario.id}`);
    })
    .then(response => response.json())
    .catch(error => console.error(error));
}

// Con async/await
async function obtenerUsuario() {
  try {
    const responseUsuario = await fetch('/api/usuario');
    const usuario = await responseUsuario.json();
    
    const responsePosts = await fetch(`/api/posts/${usuario.id}`);
    const posts = await responsePosts.json();
    
    return posts;
  } catch (error) {
    console.error(error);
  }
}
```

*Object.entries() y Object.values()*
```javascript
const persona = {
  nombre: 'Ana',
  edad: 30,
  ciudad: 'Madrid'
};

// Object.entries() - Array de pares [clave, valor]
console.log(Object.entries(persona));
// [['nombre', 'Ana'], ['edad', 30], ['ciudad', 'Madrid']]

// Iterar sobre objeto
for (const [clave, valor] of Object.entries(persona)) {
  console.log(`${clave}: ${valor}`);
}

// Object.values() - Array solo de valores
console.log(Object.values(persona));
// ['Ana', 30, 'Madrid']

// Convertir objeto a Map
const map = new Map(Object.entries(persona));
```

*String padding*
```javascript
// padStart - Rellenar al inicio
'5'.padStart(3, '0'); // '005'
'abc'.padStart(10, '123'); // '1231231abc'

// padEnd - Rellenar al final
'5'.padEnd(3, '0'); // '500'
'abc'.padEnd(10, '.'); // 'abc.......'

// Útil para formatear
const precio = '42.50';
console.log(precio.padStart(10, ' ')); // '     42.50'
```

**ES2018 (ES9)**

*Rest/Spread properties para objetos*
```javascript
// Rest properties
const persona = {
  nombre: 'Ana',
  edad: 30,
  ciudad: 'Madrid',
  pais: 'España'
};

const { nombre, ...resto } = persona;
console.log(nombre); // 'Ana'
console.log(resto); // { edad: 30, ciudad: 'Madrid', pais: 'España' }

// Spread properties
const datosBasicos = { nombre: 'Juan', edad: 25 };
const datosCompletos = {
  ...datosBasicos,
  ciudad: 'Barcelona',
  profesion: 'Desarrollador'
};
// { nombre: 'Juan', edad: 25, ciudad: 'Barcelona', profesion: 'Desarrollador' }

// Clonar objetos
const clon = { ...persona };
```

*Asynchronous iteration*
```javascript
// Iterar sobre promesas de forma asíncrona
async function* generadorAsync() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

async function ejecutar() {
  for await (const num of generadorAsync()) {
    console.log(num); // 1, 2, 3
  }
}

// Ejemplo práctico: procesar stream de datos
async function procesarArchivos(archivos) {
  for await (const archivo of archivos) {
    const contenido = await archivo.text();
    console.log(contenido);
  }
}
```

*Promise.finally()*
```javascript
let cargando = true;

fetch('/api/datos')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
  .finally(() => {
    cargando = false; // Se ejecuta siempre
    console.log('Petición completada');
  });

// Con async/await
async function cargarDatos() {
  try {
    const response = await fetch('/api/datos');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  } finally {
    cargando = false;
  }
}
```

**ES2019 (ES10)**

*Array.flat() y Array.flatMap()*
```javascript
// flat() - Aplanar arrays anidados
const anidado = [1, 2, [3, 4, [5, 6]]];
console.log(anidado.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(anidado.flat(2)); // [1, 2, 3, 4, 5, 6]
console.log(anidado.flat(Infinity)); // Aplanar completamente

// Eliminar elementos vacíos
const conHuecos = [1, 2, , 4, 5];
console.log(conHuecos.flat()); // [1, 2, 4, 5]

// flatMap() - map + flat en uno
const frases = ['Hola mundo', 'JavaScript ES2019'];
const palabras = frases.flatMap(frase => frase.split(' '));
console.log(palabras); // ['Hola', 'mundo', 'JavaScript', 'ES2019']

// Ejemplo práctico
const usuarios = [
  { nombre: 'Ana', hobbies: ['leer', 'nadar'] },
  { nombre: 'Luis', hobbies: ['correr', 'cocinar'] }
];
const todosHobbies = usuarios.flatMap(u => u.hobbies);
// ['leer', 'nadar', 'correr', 'cocinar']
```

*Object.fromEntries()*
```javascript
// Convertir array de pares a objeto (opuesto a Object.entries)
const entradas = [['nombre', 'Ana'], ['edad', 30]];
const objeto = Object.fromEntries(entradas);
console.log(objeto); // { nombre: 'Ana', edad: 30 }

// Convertir Map a objeto
const mapa = new Map([
  ['a', 1],
  ['b', 2]
]);
const obj = Object.fromEntries(mapa);
console.log(obj); // { a: 1, b: 2 }

// Transformar objeto
const precios = { manzana: 500, banana: 300, naranja: 400 };
const preciosConDescuento = Object.fromEntries(
  Object.entries(precios).map(([fruta, precio]) => [fruta, precio * 0.9])
);
// { manzana: 450, banana: 270, naranja: 360 }
```

*Optional catch binding*
```javascript
// Antes - parámetro obligatorio
try {
  JSON.parse('invalid');
} catch (error) {
  console.log('Error de parseo');
}

// ES2019 - parámetro opcional
try {
  JSON.parse('invalid');
} catch {
  console.log('Error de parseo');
}
```

**ES2020 (ES11)**

*Optional chaining (`?.`)*
```javascript
const usuario = {
  nombre: 'Ana',
  direccion: {
    ciudad: 'Madrid'
  }
};

// Antes
const codigoPostal = usuario.direccion && usuario.direccion.codigoPostal;

// Con optional chaining
const codigoPostal = usuario.direccion?.codigoPostal; // undefined
const ciudad = usuario.direccion?.ciudad; // 'Madrid'

// Con métodos
const resultado = usuario.metodoOpcional?.(); // undefined si no existe

// Con arrays
const primerHobby = usuario.hobbies?.[0];

// Cadena de optional chaining
const valor = obj?.prop1?.prop2?.prop3;
```

*Nullish coalescing operator (`??`)*
```javascript
// Diferencia con OR (||)
const valor1 = 0 || 'default'; // 'default' (0 es falsy)
const valor2 = 0 ?? 'default'; // 0 (solo null/undefined son nullish)

const cantidad = '' || 'sin valor'; // 'sin valor'
const cantidad2 = '' ?? 'sin valor'; // ''

// Uso común
const config = {
  timeout: opciones?.timeout ?? 3000,
  retries: opciones?.retries ?? 3
};

// Asignación con ??=
let usuario;
usuario ??= 'Invitado'; // 'Invitado'
usuario ??= 'Otro'; // 'Invitado' (no cambia)
```

*BigInt*
```javascript
// Para números enteros muy grandes
const numeroGrande = 9007199254740991n; // Notar la 'n'
const otroGrande = BigInt('9007199254740991');

// Operaciones
const suma = 100n + 50n; // 150n
const multiplicacion = 100n * 2n; // 200n

// NO se puede mezclar con Number
// 100n + 50; // Error!
100n + BigInt(50); // 150n

// Comparaciones
100n === 100; // false
100n == 100; // true
100n < 101; // true

// Uso práctico: IDs grandes
const userId = 1234567890123456789n;
```

*Dynamic import*
```javascript
// Importación dinámica (en tiempo de ejecución)
const boton = document.querySelector('#cargar');

boton.addEventListener('click', async () => {
  const modulo = await import('./mi-modulo.js');
  modulo.hacerAlgo();
});

// Importación condicional
async function cargarModulo(condicion) {
  if (condicion) {
    const { funcionalidad } = await import('./modulo-especial.js');
    funcionalidad();
  } else {
    const { funcionalidad } = await import('./modulo-basico.js');
    funcionalidad();
  }
}

// Code splitting - cargar solo cuando se necesita
async function mostrarGrafico(datos) {
  const { Chart } = await import('chart.js');
  new Chart(datos);
}
```

**ES2021 (ES12)**

*String.replaceAll()*
```javascript
// Antes - con regex y flag global
const texto = 'Hola mundo, mundo hermoso';
texto.replace(/mundo/g, 'JavaScript'); // 'Hola JavaScript, JavaScript hermoso'

// Con replaceAll
texto.replaceAll('mundo', 'JavaScript'); // 'Hola JavaScript, JavaScript hermoso'

// Ejemplo práctico
const html = '<div>Texto con <span>etiquetas</span></div>';
const textoLimpio = html.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
```

*Logical assignment operators*
```javascript
// AND assignment (&&=)
let usuario = { nombre: 'Ana' };
usuario.nombre &&= usuario.nombre.toUpperCase(); // 'ANA'

// OR assignment (||=)
let config = {};
config.timeout ||= 3000; // config.timeout = 3000
config.timeout ||= 5000; // config.timeout sigue siendo 3000

// Nullish assignment (??=)
let opciones = { retries: 0 };
opciones.retries ??= 3; // opciones.retries = 0 (no cambia)
opciones.timeout ??= 3000; // opciones.timeout = 3000

// Equivalencias
// a ||= b  ===  a || (a = b)
// a &&= b  ===  a && (a = b)
// a ??= b  ===  a ?? (a = b)
```

*Numeric separators*
```javascript
// Mejorar legibilidad de números grandes
const mil = 1_000;
const millon = 1_000_000;
const billonEuropeo = 1_000_000_000_000;

// Con decimales
const precio = 1_499.99;

// Binario, octal, hexadecimal
const binario = 0b1010_0001_1000_0101;
const hex = 0xFF_FF_FF_FF;

// BigInt
const grande = 1_000_000_000_000n;

// No afecta el valor
console.log(1_000 === 1000); // true
```

**ES2022 (ES13)**

*Top-level await*
```javascript
// Antes - necesitaba estar en función async
async function init() {
  const datos = await fetch('/api/config');
  const config = await datos.json();
  console.log(config);
}
init();

// ES2022 - await directo en módulos
// archivo: config.js
const response = await fetch('/api/config');
const config = await response.json();
export default config;

// Importación dinámica condicional
const idioma = await fetch('/api/idioma').then(r => r.json());
const traducciones = await import(`./i18n/${idioma}.js`);
```

*Class fields*
```javascript
// Campos públicos de clase
class Contador {
  // Campo público (antes solo en constructor)
  cuenta = 0;
  nombre = 'Mi Contador';
  
  incrementar() {
    this.cuenta++;
  }
}

const c = new Contador();
console.log(c.cuenta); // 0
c.incrementar();
console.log(c.cuenta); // 1

// Campos estáticos
class Configuracion {
  static version = '1.0.0';
  static entorno = 'produccion';
  
  static obtenerInfo() {
    return `${this.version} - ${this.entorno}`;
  }
}

console.log(Configuracion.version); // '1.0.0'
```

*Private methods and fields*
```javascript
class CuentaBancaria {
  // Campo privado (con #)
  #saldo = 0;
  #pin;
  
  constructor(saldoInicial, pin) {
    this.#saldo = saldoInicial;
    this.#pin = pin;
  }
  
  // Método privado
  #validarPin(pin) {
    return pin === this.#pin;
  }
  
  // Método público que usa privados
  retirar(cantidad, pin) {
    if (!this.#validarPin(pin)) {
      throw new Error('PIN incorrecto');
    }
    if (cantidad > this.#saldo) {
      throw new Error('Saldo insuficiente');
    }
    this.#saldo -= cantidad;
    return this.#saldo;
  }
  
  obtenerSaldo(pin) {
    if (!this.#validarPin(pin)) {
      throw new Error('PIN incorrecto');
    }
    return this.#saldo;
  }
}

const cuenta = new CuentaBancaria(1000, '1234');
console.log(cuenta.obtenerSaldo('1234')); // 1000
// console.log(cuenta.#saldo); // Error: campo privado
```

**ES2023 (ES14)**

*Array immutable methods*
```javascript
const numeros = [3, 1, 4, 1, 5, 9];

// toSorted() - Ordenar sin modificar original
const ordenados = numeros.toSorted();
console.log(ordenados); // [1, 1, 3, 4, 5, 9]
console.log(numeros); // [3, 1, 4, 1, 5, 9] (sin cambios)

// toReversed() - Revertir sin modificar
const revertido = numeros.toReversed();
console.log(revertido); // [9, 5, 1, 4, 1, 3]
console.log(numeros); // [3, 1, 4, 1, 5, 9]

// toSpliced() - Splice sin modificar
const modificado = numeros.toSpliced(2, 2, 99, 88);
console.log(modificado); // [3, 1, 99, 88, 5, 9]
console.log(numeros); // [3, 1, 4, 1, 5, 9]

// with() - Reemplazar elemento por índice
const reemplazado = numeros.with(0, 999);
console.log(reemplazado); // [999, 1, 4, 1, 5, 9]
console.log(numeros); // [3, 1, 4, 1, 5, 9]
```

*findLast() y findLastIndex()*
```javascript
const usuarios = [
  { id: 1, nombre: 'Ana', activo: true },
  { id: 2, nombre: 'Luis', activo: false },
  { id: 3, nombre: 'María', activo: true },
  { id: 4, nombre: 'Carlos', activo: true }
];

// findLast() - Buscar desde el final
const ultimoActivo = usuarios.findLast(u => u.activo);
console.log(ultimoActivo); // { id: 4, nombre: 'Carlos', activo: true }

// findLastIndex() - Índice desde el final
const indice = usuarios.findLastIndex(u => u.activo);
console.log(indice); // 3

// Comparación con find()
const primero = usuarios.find(u => u.activo); // Ana
const ultimo = usuarios.findLast(u => u.activo); // Carlos
```

*Hashbang Grammar (Shebang)*
```javascript
#!/usr/bin/env node
// Ahora es parte oficial del estándar
// Permite ejecutar archivos JS directamente

console.log('Script ejecutable');

// En terminal: ./script.js (con permisos de ejecución)
```

*Symbols como claves en WeakMaps*
```javascript
// Ahora se pueden usar Symbols registrados
const sym1 = Symbol.for('clave');
const sym2 = Symbol.for('clave');

const weakMap = new WeakMap();
weakMap.set(sym1, 'valor');

console.log(weakMap.get(sym2)); // 'valor' (mismo Symbol registrado)

// Útil para metadatos privados
const metadatos = new WeakMap();
const claveMeta = Symbol.for('app.metadata');

function agregarMetadata(obj, data) {
  metadatos.set(claveMeta, { obj, data });
}
```

**ES2024 (ES15)**

*Object.groupBy() y Map.groupBy()*
```javascript
const productos = [
  { nombre: 'Manzana', categoria: 'Fruta', precio: 100 },
  { nombre: 'Banana', categoria: 'Fruta', precio: 80 },
  { nombre: 'Zanahoria', categoria: 'Verdura', precio: 60 },
  { nombre: 'Lechuga', categoria: 'Verdura', precio: 70 }
];

// Object.groupBy() - Agrupar en objeto
const porCategoria = Object.groupBy(productos, p => p.categoria);
console.log(porCategoria);
/* {
  Fruta: [
    { nombre: 'Manzana', categoria: 'Fruta', precio: 100 },
    { nombre: 'Banana', categoria: 'Fruta', precio: 80 }
  ],
  Verdura: [
    { nombre: 'Zanahoria', categoria: 'Verdura', precio: 60 },
    { nombre: 'Lechuga', categoria: 'Verdura', precio: 70 }
  ]
} */

// Map.groupBy() - Agrupar en Map
const porRango = Map.groupBy(productos, p => {
  if (p.precio < 70) return 'barato';
  if (p.precio < 90) return 'medio';
  return 'caro';
});

console.log(porRango.get('caro')); // [{ nombre: 'Manzana', ... }]
console.log(porRango.get('barato')); // [{ nombre: 'Zanahoria', ... }]

// Ejemplo práctico: agrupar usuarios por edad
const usuarios = [
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Luis', edad: 35 },
  { nombre: 'María', edad: 25 },
  { nombre: 'Carlos', edad: 35 }
];

const porEdad = Object.groupBy(usuarios, u => u.edad);
// { 25: [...], 35: [...] }
```

**ES2025 (ES16) - Características en desarrollo**

*Iterator Helpers*
```javascript
// Métodos funcionales para iteradores con evaluación perezosa
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map, filter, take sobre iteradores
const resultado = numeros.values()
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .take(3)
  .toArray();

console.log(resultado); // [4, 8, 12]

// drop - saltar elementos
const sinPrimeros = numeros.values()
  .drop(3)
  .toArray(); // [4, 5, 6, 7, 8, 9, 10]

// flatMap para iteradores
function* generador() {
  yield [1, 2];
  yield [3, 4];
}

const plano = generador().flatMap(x => x).toArray();
console.log(plano); // [1, 2, 3, 4]
```

*Promise.withResolvers()*
```javascript
// Antes - crear promise con resolver externo
let resolver, rechazar;
const promesa = new Promise((res, rej) => {
  resolver = res;
  rechazar = rej;
});

// Con ES2025
const { promise, resolve, reject } = Promise.withResolvers();

// Uso práctico: control manual de promesa
class ProcesadorTareas {
  #tareas = new Map();
  
  crearTarea(id) {
    const { promise, resolve, reject } = Promise.withResolvers();
    this.#tareas.set(id, { resolve, reject });
    return promise;
  }
  
  completarTarea(id, resultado) {
    const tarea = this.#tareas.get(id);
    tarea.resolve(resultado);
    this.#tareas.delete(id);
  }
  
  fallarTarea(id, error) {
    const tarea = this.#tareas.get(id);
    tarea.reject(error);
    this.#tareas.delete(id);
  }
}
```

*Duplicate Named Capturing Groups in RegExp*
```javascript
// Permitir mismo nombre en diferentes alternativas
const patron = /(?<year>\d{4})-(?<month>\d{2})|(?<month>\d{2})-(?<year>\d{4})/;

// Formato YYYY-MM
const match1 = patron.exec('2025-01');
console.log(match1.groups); // { year: '2025', month: '01' }

// Formato MM-YYYY
const match2 = patron.exec('01-2025');
console.log(match2.groups); // { month: '01', year: '2025' }

// Ejemplo práctico: diferentes formatos de fecha
const fechaRegex = /(?<dia>\d{2})\/(?<mes>\d{2})|(?<mes>\d{2})\/(?<dia>\d{2})/;
const fecha1 = fechaRegex.exec('15/03'); // DD/MM
const fecha2 = fechaRegex.exec('03/15'); // MM/DD
```

*String isWellFormed() y toWellFormed()*
```javascript
// Verificar si string está bien formado en Unicode
const bienFormado = 'Hola 👋';
console.log(bienFormado.isWellFormed()); // true

// String con surrogates mal formados
const malFormado = 'Hola \uD800'; // Surrogate sin par
console.log(malFormado.isWellFormed()); // false

// Corregir string mal formado
const corregido = malFormado.toWellFormed();
console.log(corregido.isWellFormed()); // true

// Uso práctico: validar antes de enviar
function enviarTexto(texto) {
  if (!texto.isWellFormed()) {
    texto = texto.toWellFormed();
  }
  // Enviar texto seguro
  fetch('/api/mensaje', {
    method: 'POST',
    body: JSON.stringify({ texto })
  });
}
```

*Standardized Module Attributes*
```javascript
// Importar con atributos/assertions
import json from './data.json' with { type: 'json' };
import css from './styles.css' with { type: 'css' };

// Control sobre carga de módulos
import html from './template.html' with { 
  type: 'html',
  integrity: 'sha384-...' 
};

// Importación dinámica con atributos
const modulo = await import('./data.json', {
  with: { type: 'json' }
});
```

*Realms API (Stage 3 - Próximo a estandarización)*
```javascript
// Crear contextos globales separados para sandbox
const realm = new Realm();

// Ejecutar código en contexto aislado
const resultado = realm.evaluate('1 + 1'); // 2

// Acceder al global del realm
const RealmArray = realm.globalThis.Array;
const arr = new RealmArray(1, 2, 3);

// Uso: ejecutar código no confiable de forma segura
const userCode = 'function suma(a, b) { return a + b; }';
const safeSum = realm.evaluate(userCode);
const result = realm.evaluate('suma(5, 3)'); // 8

// Sin acceso al global principal
realm.evaluate('window'); // undefined en el realm
```

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

¿Cuál es la principal diferencia entre un ORM (Sequelize) y un ODM (Mongoose)?

El ORM (Object-Relational Mapper) mapea objetos de código a tablas y filas (SQL). El ODM (Object-Document Mapper) mapea objetos a documentos JSON (NoSQL/MongoDB).

¿Por qué MongoDB usa ObjectIds en lugar de integers?

Porque los ObjectIds se generan de forma descentralizada y garantizan ser únicos globalmente (incluso si se crean en diferentes servidores al mismo tiempo), lo cual es ideal para escalar. Los integers secuenciales (1, 2, 3...) requieren un contador centralizado que puede ser un cuello de botella.

Explica qué hace el método .populate() en Mongoose.

Simula un JOIN de SQL. Toma un ID guardado en un documento (referencia) y busca automáticamente los datos completos de ese ID en otra colección para rellenar el campo con la información real.

¿Cuándo usarías documentos embebidos en lugar de referencias?

Usaría embebidos cuando los datos siempre se consultan juntos y no crecen infinitamente (ej: las direcciones de un usuario). Usaría referencias cuando los datos pueden crecer mucho o necesitan ser consultados por separado (ej: los posts de un usuario).

¿Qué ventajas tiene MongoDB sobre PostgreSQL para este caso?

Flexibilidad: Si mañana quiero agregar un campo nuevo a los usuarios, no tengo que hacer migraciones complejas de base de datos. Además, al usar JavaScript en todo el stack (Frontend, Backend y Base de Datos), el desarrollo es más fluido.

¿Qué es un índice?

Es una estructura de datos especial que permite a la base de datos encontrar información rápidamente sin tener que escanear cada documento de la colección. Es como el índice de un libro.

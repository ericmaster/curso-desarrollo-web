🔍 Parte 6: Comparación y Análisis
6.2 Preguntas de Reflexión
Flexibilidad del esquema: ¿Qué pasa si quieres agregar un nuevo campo "edad" a Usuario? ¿Es más fácil en SQL o en MongoDB? Es más fácil en MongoDB, ya que no maneja una estructura rígida como la de SQL. Al ser una base de datos orientada a documentos, permite agregar nuevos campos de forma dinámica sin necesidad de realizar migraciones complejas o alterar tablas existentes.

Relaciones: En SQL usamos foreign keys, en MongoDB usamos referencias. ¿Cuál es más eficiente para este caso? SQL puede ser más eficiente en términos de integridad de los datos, ya que el motor de la base de datos garantiza por defecto que las llaves foráneas (FK) existan y sean válidas. En cambio, MongoDB utiliza referencias que son gestionadas a nivel de aplicación mediante Mongoose, lo que ofrece mayor flexibilidad pero requiere más cuidado en la lógica del código.

Consultas complejas: Si necesitaras hacer un JOIN entre 4 tablas, ¿preferirías SQL o MongoDB? Preferiría SQL, ya que su arquitectura está diseñada específicamente para optimizar este tipo de operaciones. La estructura relacional permite realizar un JOIN de múltiples tablas de manera más natural y eficiente que el proceso de agregación o población en MongoDB.

Escalabilidad: MongoDB es más fácil de escalar horizontalmente. ¿En qué escenarios sería importante? Sería fundamental en aplicaciones que manejan un flujo masivo de usuarios y un volumen de datos que crece constantemente, como es el caso de las redes sociales, sistemas de telemetría o plataformas de streaming.

📝 Parte 9: Preguntas de Evaluación
¿Cuál es la principal diferencia entre un ORM y un ODM? La diferencia radica en el tipo de base de datos que gestionan: un ORM (Object-Relational Mapping) se utiliza para bases de datos relacionales (SQL), mientras que un ODM (Object-Document Mapping) se emplea para bases de datos orientadas a documentos (NoSQL).

¿Por qué MongoDB usa ObjectIds en lugar de integers? Se utilizan porque MongoDB está diseñado para ser un sistema distribuido. Los ObjectIds garantizan la unicidad global, evitando que dos servidores diferentes generen el mismo identificador simultáneamente, algo que podría ocurrir fácilmente con enteros autoincrementales.

Explica qué hace el método .populate() en Mongoose. Este método realiza una función similar al JOIN en SQL; permite reemplazar una referencia (ID) con los datos reales del documento referenciado de otra colección, agilizando la obtención de información relacionada en una sola respuesta lógica.

¿Cuándo usarías documentos embebidos en lugar de referencias? Se recomienda usar documentos embebidos cuando la información está fuertemente ligada al documento principal y no se espera que crezca de forma infinita. Las referencias son preferibles cuando el volumen de datos relacionados es muy alto o cuando esos datos deben ser consultados de forma independiente.

¿Qué ventajas tiene MongoDB sobre PostgreSQL para este caso de uso? La mayor ventaja es la flexibilidad del esquema. Permite iterar rápidamente y agregar o modificar campos sin necesidad de detener la base de datos o ejecutar scripts de migración que bloqueen las tablas.

¿Qué ventajas tiene PostgreSQL sobre MongoDB? PostgreSQL destaca por su estricta integridad de datos y su robustez al manejar relaciones complejas. Es ideal cuando se requiere asegurar que todas las reglas de negocio y relaciones se cumplan a rajatabla en el motor de la base de datos.

¿Cómo se manejan las transacciones en MongoDB? Se gestionan mediante una sesión de cliente con los siguientes pasos:

Session: Se inicia la sesión y se agrupan las operaciones.

Commit: Si todas las operaciones se completan con éxito, se aplican los cambios de forma permanente.

Abort: Si ocurre algún error durante el proceso, se deshacen todos los cambios para mantener la consistencia.

¿Qué es un índice y por qué es importante? Un índice funciona como un "puntero" o referencia rápida que le indica a la base de datos dónde buscar datos específicos sin tener que recorrer toda la colección completa. Su importancia reside en que mejora drásticamente la velocidad de las consultas.

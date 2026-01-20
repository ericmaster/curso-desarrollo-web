# Docker y Containers

## ¿Qué son los Containers?

Los **containers** (contenedores) son unidades estándar de software que empaquetan código y todas sus dependencias para que una aplicación se ejecute de manera rápida y confiable en diferentes entornos de computación.

Un container es una instancia ejecutable que tiene su propio espacio de memoria dentro del sistema operativo del host sobre el que se ejecuta. Un container incluye:
- Una imagen base ("sistema operativo" base)
- Un sistema de archivos y runtime aislados (excepto por volumenes que se pueden montar dentro desde el host hacia el contenedor)
- El código de la aplicación (tipicamente a través de volumenes)
- Las librerías y dependencias necesarias (motor de base de datos, web server, reverse proxy, etc)
- Las configuraciones del sistema

A diferencia de las máquinas virtuales (VMs), los containers comparten el kernel del sistema operativo host, lo que los hace más ligeros y eficientes.

### Diferencia entre Container e Imagen

- **Imagen**: Es una plantilla de solo lectura que contiene instrucciones para crear un container. Es como un "molde" o "snapshot".
- **Container**: Es una instancia en ejecución de una imagen. Puedes tener múltiples containers ejecutándose desde la misma imagen.

## Ventajas de los Containers

### 1. **Portabilidad**
- Los containers se ejecutan de manera consistente en cualquier entorno: desarrollo, pruebas, producción
- "Funciona en mi máquina" → "Funciona en todos lados"
- Fácil migración entre proveedores cloud (AWS, Azure, GCP)

### 2. **Ligereza y Eficiencia**
- Arrancan en segundos (vs minutos de las VMs)
- Consumen menos recursos (memoria, CPU, disco)
- Puedes ejecutar muchos más containers que VMs en el mismo hardware

### 3. **Aislamiento**
- Cada container tiene su propio sistema de archivos, procesos y red
- Los problemas en un container no afectan a otros
- Mayor seguridad al aislar aplicaciones

### 4. **Escalabilidad**
- Fácil de escalar horizontalmente (crear más instancias)
- Orquestadores como Kubernetes permiten auto-escalado
- Ideal para arquitecturas de microservicios

### 5. **Reproducibilidad**
- El entorno es idéntico en desarrollo, testing y producción
- Fácil de versionar y hacer rollback
- Documentación como código (Dockerfile)

### 6. **Velocidad de Desarrollo**
- Configuración rápida de entornos de desarrollo
- CI/CD más eficiente
- Los desarrolladores pueden trabajar con servicios completos localmente

## Desventajas de los Containers

### 1. **Curva de Aprendizaje**
- Requiere aprender nuevas tecnologías y conceptos
- Complejidad en la orquestación con Kubernetes
- Debugging puede ser más difícil

### 2. **Seguridad**
- Comparten el kernel del host (menor aislamiento que VMs)
- Requiere configuración adecuada de permisos y redes
- Imágenes pueden contener vulnerabilidades

### 3. **Persistencia de Datos**
- Los containers son efímeros por naturaleza
- Requiere configuración adicional para datos persistentes (volumes)
- Gestión de backups más compleja

### 4. **Overhead de Gestión**
- Requiere monitoreo adicional
- Gestión de múltiples containers puede ser compleja
- Necesidad de herramientas de orquestación en producción

### 5. **Limitaciones del Sistema Operativo**
- Solo puedes ejecutar containers Linux en hosts Linux
- En Windows/Mac se usa una VM intermediaria
- Algunas aplicaciones legacy no son adecuadas para containerización

## Docker: La Plataforma de Containers

**Docker** es la plataforma más popular para crear, distribuir y ejecutar containers.

### Componentes Principales

1. **Docker Engine**: El motor que ejecuta los containers
2. **Docker CLI**: Interfaz de línea de comandos
3. **Docker Hub**: Registro público de imágenes
4. **Dockerfile**: Archivo de texto con instrucciones para construir imágenes

### Comandos Docker Básicos

```bash
# Ver containers en ejecución
docker ps

# Ver todos los containers (incluyendo detenidos)
docker ps -a

# Ejecutar un container
docker run <imagen>

# Ejecutar en segundo plano (detached)
docker run -d <imagen>

# Ejecutar con nombre personalizado
docker run --name mi-container <imagen>

# Ejecutar con mapeo de puertos
docker run -p 8080:80 <imagen>

# Detener un container
docker stop <container-id>

# Eliminar un container
docker rm <container-id>

# Ver logs de un container
docker logs <container-id>

# Ejecutar comandos dentro de un container
docker exec -it <container-id> /bin/bash

# Ver imágenes descargadas
docker images

# Eliminar una imagen
docker rmi <imagen>

# Construir una imagen desde Dockerfile
docker build -t mi-imagen:1.0 .

# Limpiar recursos no utilizados
docker system prune
```

## Docker Compose

**Docker Compose** es una herramienta para definir y ejecutar aplicaciones Docker multi-container.

### ¿Por qué usar Docker Compose?

- Gestionar múltiples containers como una unidad
- Definir configuración en un archivo YAML
- Un solo comando para iniciar toda la aplicación
- Ideal para entornos de desarrollo y testing
- Define redes y volúmenes compartidos

### Estructura de docker-compose.yaml

```yaml
services:       # Define los containers
  
  servicio1:
    image: postgres:16
    container_name: mi-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - mi-red
  
  servicio2:
    build: .
    container_name: mi-app
    depends_on:
      - servicio1
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://admin:secret@servicio1:5432/mydb
    networks:
      - mi-red

volumes:        # Define volúmenes persistentes
  postgres_data:

networks:       # Define redes personalizadas
  mi-red:
```

### Comandos Docker Compose

```bash
# Iniciar todos los servicios
docker-compose up

# Iniciar en segundo plano
docker-compose up -d

# Reconstruir imágenes antes de iniciar
docker-compose up --build

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Ver logs de todos los servicios
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs servicio1

# Seguir logs en tiempo real
docker-compose logs -f

# Ver el estado de los servicios
docker-compose ps

# Ejecutar comando en un servicio
docker-compose exec servicio1 bash

# Reiniciar un servicio específico
docker-compose restart servicio1
```

## Propiedades Importantes en Docker Compose

### 1. **image**
Define la imagen a usar. Puede ser de Docker Hub o un registro privado.

```yaml
services:
  db:
    image: postgres:18-alpine  # imagen:versión
```

### 2. **build**
Construye una imagen desde un Dockerfile local.

```yaml
services:
  app:
    build: .                    # Dockerfile en directorio actual
    # o con más opciones:
    build:
      context: ./backend        # Directorio con el Dockerfile
      dockerfile: Dockerfile.dev
```

### 3. **container_name**
Nombre personalizado para el container (en lugar de uno auto-generado).

```yaml
services:
  db:
    container_name: mi_postgres_db
```

### 4. **ports**
Mapea puertos del host al container (HOST:CONTAINER).

```yaml
services:
  web:
    ports:
      - "8080:80"      # Puerto 8080 del host → puerto 80 del container
      - "443:443"
```

### 5. **environment**
Variables de entorno para configurar el container.

```yaml
services:
  db:
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
      # o desde archivo:
    env_file:
      - .env
```

### 6. **volumes**
Persistencia de datos y montaje de directorios.

```yaml
services:
  db:
    volumes:
      - postgres_data:/var/lib/postgresql/data  # Named volume
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql  # Bind mount
      - /host/path:/container/path              # Path absoluto

volumes:
  postgres_data:  # Definición del named volume
```

### 7. **depends_on**
Define el orden de inicio de los servicios.

```yaml
services:
  app:
    depends_on:
      - db          # app espera a que db inicie primero
      - redis
```

⚠️ **Nota**: `depends_on` solo espera que el container inicie, no que esté "listo". Para aplicaciones críticas, usa health checks.

### 8. **restart**
Política de reinicio del container.

```yaml
services:
  db:
    restart: unless-stopped
    # Opciones:
    # - no: nunca reinicia (default)
    # - always: siempre reinicia
    # - on-failure: reinicia solo si falla
    # - unless-stopped: reinicia a menos que se detenga manualmente
```

### 9. **networks**
Define redes personalizadas para comunicación entre containers.

```yaml
services:
  app:
    networks:
      - frontend
      - backend
  
  db:
    networks:
      - backend

networks:
  frontend:
  backend:
```

### 10. **healthcheck**
Define cómo verificar que el servicio está saludable.

```yaml
services:
  db:
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
```

### 11. **command**
Sobreescribe el comando por defecto del container.

```yaml
services:
  app:
    command: npm run dev
```

### 12. **working_dir**
Define el directorio de trabajo dentro del container.

```yaml
services:
  app:
    working_dir: /app
```

### 13. **user**
Define qué usuario ejecuta los procesos en el container.

```yaml
services:
  app:
    user: "1000:1000"  # UID:GID
```

## Ejemplo Práctico: PostgreSQL con Adminer

Basado en el ejemplo de clase:

```yaml
services:
  postgres:
    image: postgres:18-alpine
    container_name: persistencia_pg_db
    restart: unless-stopped
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin123
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  adminer:
    image: adminer:latest
    container_name: persistencia_adminer
    restart: unless-stopped
    ports:
      - "8080:8080"
    depends_on:
      - postgres

volumes:
  postgres_data:
```

### ¿Cómo funciona este ejemplo?

1. **postgres**: Container con PostgreSQL
   - Usa la imagen ligera Alpine Linux
   - Expone el puerto 5432 para conexiones externas
   - Persiste datos en un volume nombrado
   - Configura usuario, contraseña y base de datos

2. **adminer**: Interfaz web para gestionar bases de datos
   - Accesible en http://localhost:8080
   - Se inicia después de postgres (depends_on)
   - No necesita volumen (no persiste datos)

3. **volumes**: Almacenamiento persistente
   - Los datos de PostgreSQL sobreviven al reinicio del container

## Mejores Prácticas

### 1. **Usa imágenes oficiales**
```yaml
image: postgres:18-alpine  # ✅ Oficial y lightweight
```

### 2. **Especifica versiones exactas**
```yaml
image: postgres:18-alpine  # ✅ Específico
image: postgres:latest     # ❌ Puede cambiar inesperadamente
```

### 3. **No incluyas secretos en docker-compose.yaml**
```yaml
# ❌ Malo
environment:
  DB_PASSWORD: super_secret_123

# ✅ Mejor: usa variables de entorno o archivos .env
environment:
  DB_PASSWORD: ${DB_PASSWORD}
```

### 4. **Usa named volumes para persistencia**
```yaml
volumes:
  - postgres_data:/var/lib/postgresql/data  # ✅ Named volume
  - ./data:/var/lib/postgresql/data         # ❌ Bind mount (problemas de permisos)
```

### 5. **Limita recursos si es necesario**
```yaml
services:
  db:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

### 6. **Usa health checks**
```yaml
services:
  db:
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 10s
```

### 7. **Agrupa servicios relacionados**
Usa Docker Compose para entornos completos (backend + db + cache + etc)

## Recursos Adicionales

- **Documentación oficial**: https://docs.docker.com/
- **Docker Hub**: https://hub.docker.com/
- **Docker Compose docs**: https://docs.docker.com/compose/
- **Play with Docker**: https://labs.play-with-docker.com/ (práctica gratis online)

## Conclusión

Los containers, y Docker en particular, han revolucionado el desarrollo y despliegue de software. Docker Compose simplifica la gestión de aplicaciones multi-container, haciéndolo ideal para entornos de desarrollo y testing.

**Cuándo usar containers:**
- Aplicaciones web modernas
- Microservicios
- Entornos de desarrollo consistentes
- CI/CD pipelines
- Cualquier aplicación que necesite portabilidad

**Cuándo considerar alternativas:**
- Aplicaciones monolíticas legacy muy complejas
- Workloads que requieren acceso directo al hardware
- Aplicaciones con requisitos de seguridad extremos (considerar VMs)

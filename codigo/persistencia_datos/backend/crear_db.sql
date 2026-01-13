-- Script para crear la base de datos y usuario en PostgreSQL
-- Ejecuta esto en psql como superusuario o con permisos suficientes

-- Cambia la contraseña por una segura
CREATE USER usuario WITH PASSWORD 'password';

-- Crea la base de datos
CREATE DATABASE ejemplo_db OWNER usuario;

-- Otorga privilegios
GRANT ALL PRIVILEGES ON DATABASE ejemplo_db TO usuario;

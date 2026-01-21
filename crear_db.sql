-- Script para crear la base de datos y usuario en PostgreSQL
-- Ejecuta esto en psql como superusuario o con permisos suficientes

-- Cambia la contraseña por una segura
CREATE USER admin WITH PASSWORD 'admin123';

-- Crea la base de datos
CREATE DATABASE mydb OWNER admin;

-- Otorga privilegios
GRANT ALL PRIVILEGES ON DATABASE mydb TO admin;
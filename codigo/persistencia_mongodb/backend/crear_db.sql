-- Script para crear la base de datos y usuario en PostgreSQL
-- Ejecuta esto en psql como superusuario o con permisos suficientes

-- Cambia la contraseña por una seguraCREATE USER admin WITH PASSWORD 'admin123';

-- Crea la base de datosCREATE DATABASE mydb OWNER admin;

-- Otorga privilegiosGRANT ALL PRIVILEGES ON DATABASE mydb TO admin;
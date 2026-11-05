-- Ejecutar en psql como superusuario (postgres)
CREATE USER usrparcial2 WITH PASSWORD 'P4rc14L2-2026';
CREATE DATABASE parcial2_amc OWNER usrparcial2;
GRANT ALL PRIVILEGES ON DATABASE parcial2_amc TO usrparcial2;

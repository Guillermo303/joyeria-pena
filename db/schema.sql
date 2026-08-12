-- Esquema de la base de datos de Joyería Peña.
-- Ejecutar una vez contra el servidor MySQL/MariaDB configurado en .env.local.

CREATE DATABASE IF NOT EXISTS joyeria_pena
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE joyeria_pena;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

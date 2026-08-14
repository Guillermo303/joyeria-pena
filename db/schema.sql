-- Esquema de la base de datos de Joyería Peña.
--
-- Contra un MySQL propio (local o VPS), ejecuta este archivo completo tal cual.
--
-- Contra Aiven (u otro MySQL administrado que ya trae una base de datos lista,
-- p. ej. "defaultdb"), omite el CREATE DATABASE / USE y solo corre el
-- CREATE TABLE dentro de esa base de datos existente.

CREATE DATABASE IF NOT EXISTS joyeria_pena
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE joyeria_pena;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS orders (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NULL,
  customer_name VARCHAR(120) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(40) NULL,
  total DECIMAL(12, 2) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'nuevo',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS order_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id INT UNSIGNED NOT NULL,
  product_id VARCHAR(120) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  unit_price DECIMAL(12, 2) NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

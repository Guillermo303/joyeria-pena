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

CREATE TABLE IF NOT EXISTS sucursales (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  address VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Roles: 'cliente' se autoregistra desde /registro. Los demas (staff) solo
-- los puede crear un admin desde el panel /admin/usuarios.
-- sucursal_id: a que sucursal pertenece (relevante sobre todo para
-- 'vendedor'; puede quedar NULL para admin/socio que ven todas).
CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('cliente', 'vendedor', 'socio', 'admin') NOT NULL DEFAULT 'cliente',
  sucursal_id INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sucursal_id) REFERENCES sucursales(id) ON DELETE SET NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- source: 'online' = el cliente compro desde el carrito de la pagina.
-- 'tienda' = un vendedor la registro a mano desde el panel (/admin/ventas/nueva).
-- sucursal_id / vendedor_id solo se llenan para ventas de tipo 'tienda'.
CREATE TABLE IF NOT EXISTS orders (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NULL,
  customer_name VARCHAR(120) NOT NULL,
  customer_email VARCHAR(255) NULL,
  customer_phone VARCHAR(40) NULL,
  total DECIMAL(12, 2) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'nuevo',
  source ENUM('online', 'tienda') NOT NULL DEFAULT 'online',
  sucursal_id INT UNSIGNED NULL,
  vendedor_id INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (sucursal_id) REFERENCES sucursales(id) ON DELETE SET NULL,
  FOREIGN KEY (vendedor_id) REFERENCES users(id) ON DELETE SET NULL
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

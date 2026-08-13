import mysql from "mysql2/promise";
import { readFileSync } from "fs";
import path from "path";

declare global {
  var _mysqlPool: mysql.Pool | undefined;
}

function loadCaCert(): string | undefined {
  // El certificado de Aiven es información pública (no un secreto), por eso
  // vive en el repo en una ruta fija (para que el bundler la trace bien y
  // no incluya el proyecto entero en el deploy).
  try {
    return readFileSync(path.join(process.cwd(), "db", "aiven-ca.pem"), "utf8");
  } catch {
    return undefined;
  }
}

function createPool() {
  const useSsl = process.env.DB_SSL === "true";
  const ca = useSsl ? loadCaCert() : undefined;

  return mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    charset: "utf8mb4",
    ssl: useSsl ? (ca ? { ca } : { rejectUnauthorized: true }) : undefined,
  });
}

// Reutiliza el mismo pool entre recargas en modo dev (Next.js hot reload
// crearía uno nuevo en cada cambio de archivo si no lo cacheamos en global).
const pool = globalThis._mysqlPool ?? createPool();
if (process.env.NODE_ENV !== "production") {
  globalThis._mysqlPool = pool;
}

export default pool;

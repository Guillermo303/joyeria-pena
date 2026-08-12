import mysql from "mysql2/promise";

declare global {
  var _mysqlPool: mysql.Pool | undefined;
}

function createPool() {
  return mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    charset: "utf8mb4",
  });
}

// Reutiliza el mismo pool entre recargas en modo dev (Next.js hot reload
// crearía uno nuevo en cada cambio de archivo si no lo cacheamos en global).
const pool = globalThis._mysqlPool ?? createPool();
if (process.env.NODE_ENV !== "production") {
  globalThis._mysqlPool = pool;
}

export default pool;

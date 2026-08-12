import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El sitio ahora corre con servidor Node (Render Web Service) en lugar de
  // export estático, porque las rutas /api/auth/* necesitan ejecutar código
  // en el servidor para hablar con MySQL.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

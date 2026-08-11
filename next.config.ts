import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Genera un sitio 100% estático en la carpeta `out/` al hacer `npm run build`.
  // Ideal para desplegar como "Static Site" en Render.
  output: "export",
  // Necesario para export estático porque usamos <img> con URLs externas
  // en lugar del optimizador de imágenes de Next (que requiere servidor).
  images: {
    unoptimized: true,
  },
  // Genera rutas como /colecciones/ -> /colecciones/index.html,
  // que los hosts estáticos (Render) sirven de forma más predecible.
  trailingSlash: true,
};

export default nextConfig;

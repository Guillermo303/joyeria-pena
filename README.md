# Portal Web — Joyería Peña (React / Next.js)

Versión en React del prototipo original (`../web`), migrada a **Next.js 16** con TypeScript y Tailwind CSS v4, pensada para poder conectarse más adelante a un sistema de inventario real.

## Cómo correrlo

```bash
npm install   # solo la primera vez
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura

```
src/
  app/
    page.tsx                 -> Inicio
    colecciones/page.tsx     -> Catálogo
    producto/[id]/page.tsx   -> Detalle de una pieza (ruta dinámica)
    portal/page.tsx          -> Portal de inventario
    globals.css              -> Sistema de diseño (colores, tipografías, radios)
  components/
    Header.tsx                -> Barra superior + menú móvil (mismo header en todas las páginas)
    Footer.tsx
    Reveal.tsx                -> Animación de aparición al hacer scroll
  lib/
    products.ts                -> "Base de datos" del catálogo (mock)
    inventory.ts                -> "Base de datos" del inventario (mock)
```

## Cómo conectarlo a un inventario real

Todo el contenido dinámico pasa por dos únicos archivos:

- **`src/lib/products.ts`** — `getProducts()` y `getProductById()`. Hoy devuelven un arreglo fijo; el día que haya una API (por ejemplo leyendo `BDJT2.mdb` desde un backend), estas dos funciones son las únicas que hay que cambiar por un `fetch(...)` a esa API. Ninguna página necesita tocarse.
- **`src/lib/inventory.ts`** — `getInventory()` y `getInventoryMetrics()`. Mismo patrón, pensado para conectarse al control de existencias/reparaciones real.

Como las páginas ya son componentes de servidor async (`await getProducts()`), cambiar el mock por una llamada real a una API es un cambio local a `lib/`, sin tocar la interfaz.

## Sistema de diseño

Los tokens de color, tipografía (Playfair Display + Inter) y las clases de texto (`text-display-lg`, `text-headline-md`, `text-label-caps`, etc.) están definidos en `src/app/globals.css` usando `@theme` de Tailwind v4, replicando el diseño exportado desde Stitch.

## Despliegue en Render (Sitio Estático)

El proyecto está configurado para generar un sitio 100% estático (`output: "export"` en
`next.config.ts`), que se publica como **Static Site** en Render.

**Primera vez:**

1. Entra a [render.com](https://render.com) e inicia sesión (puedes usar tu cuenta de GitHub).
2. **New +** → **Blueprint** (o **Static Site**) y selecciona este repositorio.
3. Si usas Blueprint, Render leerá `render.yaml` automáticamente. Si lo configuras a mano:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `out`
4. **Create** y espera a que termine el primer build.

**Actualizar la página después:** solo haz `git push` a la rama conectada. Render detecta
el cambio, reconstruye y publica la nueva versión automáticamente.

```bash
git add -A
git commit -m "Mis cambios"
git push
```

## Pendientes / siguientes pasos

- Sustituir las imágenes de muestra (`lh3.googleusercontent.com`) por fotos reales de las piezas.
- Definir e implementar la API/backend que alimente `lib/products.ts` y `lib/inventory.ts`.
- Añadir lógica real a los botones ("Añadir a la Bolsa", "Agendar Cita", "Agregar Pieza").
- Autenticación para el Portal de Inventario si va a manejar datos sensibles.

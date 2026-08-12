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

## Despliegue en Render (Servicio Web)

El proyecto corre como servicio Node (`next start`), publicado como **Web Service** en Render
(ya no es un sitio estático, porque `/api/auth/*` necesita ejecutar código de servidor para
hablar con MySQL).

**Primera vez:**

1. Entra a [render.com](https://render.com) e inicia sesión (puedes usar tu cuenta de GitHub).
2. **New +** → **Blueprint** (o **Web Service**) y selecciona este repositorio.
3. Si usas Blueprint, Render leerá `render.yaml` automáticamente. Si lo configuras a mano:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
4. Configura las variables de entorno `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` y
   `DB_NAME` apuntando a tu MySQL en la nube (Render no ofrece MySQL gestionado).
5. **Create** y espera a que termine el primer build.

**Actualizar la página después:** solo haz `git push` a la rama conectada. Render detecta
el cambio, reconstruye y publica la nueva versión automáticamente.

```bash
git add -A
git commit -m "Mis cambios"
git push
```

## Cuentas de usuario (registro / inicio de sesión)

El sitio incluye registro e inicio de sesión con contraseñas guardadas (con hash) en MySQL:

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- Páginas: `/registro`, `/login`, `/cuenta`
- La sesión se guarda en una cookie httpOnly firmada (JWT), válida 7 días.

**Configuración local:**

1. Instala un servidor MySQL/MariaDB (ver más abajo) y crea la base con el esquema en
   [`db/schema.sql`](db/schema.sql):
   ```bash
   mysql -u root -p < db/schema.sql
   ```
2. Copia `.env.example` a `.env.local` y completa `DB_HOST`, `DB_USER`, `DB_PASSWORD`,
   `DB_NAME` y `SESSION_SECRET` (una cadena aleatoria larga).
3. `npm run dev` — las rutas `/registro` y `/login` ya deberían funcionar.

**Para producción (Render):** este proyecto ahora corre como servicio Node (`next start`), no
como sitio estático, porque necesita ejecutar `/api/auth/*` en el servidor. Render no ofrece
MySQL gestionado, así que aloja la base en un proveedor externo (por ejemplo
[Railway](https://railway.app) o [Aiven](https://aiven.io)) y configura las variables de
entorno correspondientes en el panel de Render (ver comentarios en `render.yaml`).

## Pendientes / siguientes pasos

- Sustituir las imágenes de muestra (`lh3.googleusercontent.com`) por fotos reales de las piezas.
- Definir e implementar la API/backend que alimente `lib/products.ts` y `lib/inventory.ts`.
- Añadir lógica real a los botones ("Añadir a la Bolsa", "Agendar Cita", "Agregar Pieza").
- Proteger el Portal de Inventario con autenticación (hoy cualquier usuario logueado puede
  entrar; falta un rol de "administrador" si se quiere restringir).

# Heatrow Club — Web App

Aplicación web completa para la gestión y promoción de un club nocturno. Incluye web pública con galería, eventos y venta de entradas, y un panel de administración para gestionar todo el contenido.

Desarrollada como Trabajo de Fin de Grado (DAW).

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | Astro 5, React 19, Tailwind CSS |
| Backend | ASP.NET Core 9, Entity Framework Core |
| Base de datos | MySQL 8 |
| Pagos | Stripe (Payment Intents) |
| Email | EmailJS |
| Autenticación | Cookie-based (HttpOnly, 7 días) |

---

## Funcionalidades

**Web pública**
- Página principal con próximos eventos y lineup de DJs
- Galería de fotos y vídeos con filtro por tipo
- Compra de entradas con pago real mediante Stripe
- Formulario de contacto vía EmailJS
- Suscripción/baja al boletín de noticias
- Banner de cookies

**Panel de administración** (`/admin`)
- Gestión CRUD de eventos (con DJs asociados, fechas, imágenes)
- Gestión CRUD de DJs
- Subida y gestión de galería (fotos hasta 10 MB, vídeos hasta 100 MB)
- Gestión de suscriptores y envío de campañas de email
- Gestión de usuarios administradores
- Acceso protegido por autenticación con cookie

---

## Requisitos previos

- Node.js 20+
- .NET SDK 9.0
- MySQL 8.0
- Git

---

## Instalación y ejecución en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/ricpa-git/heatrow-web-tfg.git
cd heatrow-web-tfg
```

### 2. Configurar la base de datos

```sql
CREATE DATABASE heatrow CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'heatrow_user'@'localhost' IDENTIFIED BY 'tu_contraseña';
GRANT ALL PRIVILEGES ON heatrow.* TO 'heatrow_user'@'localhost';
FLUSH PRIVILEGES;
```

Luego aplica el esquema SQL incluido en la documentación del proyecto.

### 3. Configurar el backend

Edita `backend/tfgBackend/appsettings.json` con tus valores reales:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=heatrow;User=heatrow_user;Password=tu_contraseña;"
  },
  "Stripe": {
    "SecretKey": "sk_test_TU_CLAVE_SECRETA"
  }
}
```

### 4. Arrancar el backend

```bash
cd backend/tfgBackend
dotnet run
```

El backend queda disponible en `http://localhost:5257`.

### 5. Crear el primer usuario administrador

```
POST http://localhost:5257/api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@heatrow.com",
  "passwordHash": "<hash SHA-256 de tu contraseña en hexadecimal>"
}
```

### 6. Configurar el frontend

Crea el archivo `.env.local` en la raíz del proyecto:

```env
PUBLIC_API_URL=http://localhost:5257/api
BACKEND_API_URL=http://localhost:5257/api
PUBLIC_STRIPE_KEY=pk_test_TU_CLAVE_PUBLICA
```

### 7. Arrancar el frontend

```bash
npm install
npm run dev
```

La web estará en `http://localhost:4321` y el panel de administración en `http://localhost:4321/admin/login`.

---

## Variables de entorno

| Variable | Dónde | Descripción |
|---|---|---|
| `PUBLIC_API_URL` | `.env.local` | URL del backend para componentes client-side |
| `BACKEND_API_URL` | `.env.local` | URL del backend para SSR y middleware |
| `PUBLIC_STRIPE_KEY` | `.env.local` | Clave pública de Stripe |
| `ConnectionStrings:DefaultConnection` | `appsettings.json` | Cadena de conexión MySQL |
| `Stripe:SecretKey` | `appsettings.json` | Clave secreta de Stripe |

El archivo `.env.local` está en `.gitignore` y nunca debe subirse al repositorio.

---

## Estructura del proyecto

```
heatrow-web-tfg/
├── src/
│   ├── pages/
│   │   ├── index.astro                 # Homepage pública
│   │   ├── gallery.astro               # Galería pública
│   │   ├── contact.astro               # Página de contacto
│   │   ├── unsubscribe.astro           # Baja de suscripción
│   │   ├── admin/                      # Panel de administración
│   │   └── tickets/                    # Compra de entradas
│   ├── components/
│   │   ├── admin/                      # Componentes React del panel admin
│   │   └── ui/                         # Componentes UI reutilizables
│   ├── layouts/
│   │   ├── Layout.astro                # Layout web pública
│   │   └── AdminLayout.astro           # Layout panel admin
│   ├── lib/events.ts                   # Utilidades para eventos
│   └── middleware.ts                   # Protección de rutas /admin
├── backend/
│   └── tfgBackend/
│       ├── Controllers/                # API REST (Auth, Events, DJs, Gallery, Payments, Subscribers, Users)
│       ├── Data/HeatrowDbContext.cs    # Contexto de Entity Framework
│       └── Program.cs                 # Configuración del servidor
├── public/
│   └── gallery/                        # Archivos subidos (fotos y vídeos)
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Comandos útiles

| Comando | Acción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build` | Genera el build de producción en `./dist/` |
| `npm run preview` | Previsualiza el build localmente |
| `dotnet run` | Arranca el backend (desde `backend/tfgBackend/`) |

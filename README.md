# El Estoico Landing Page

Landing page construida con Astro, Docker y Traefik para producción.

## 🚀 Estructura del Proyecto

```text
/
├── public/
│   ├── assets/
│   │   └── images/      # Imágenes estáticas
│   └── favicon.svg
├── src/
│   ├── assets/          # Assets que se optimizan
│   ├── components/      # Componentes Astro
│   ├── layouts/          # Layouts
│   └── pages/           # Páginas (routing automático)
├── docker-compose.dev.yml    # Desarrollo local
├── docker-compose.prod.yml   # Producción con Traefik
├── Dockerfile                 # Build de producción
├── Dockerfile.dev             # Desarrollo con hot reload
├── .env.example               # Variables de entorno ejemplo
├── QUICK_START.md             # Guía rápida de despliegue
└── DEPLOY.md                  # Documentación completa de despliegue
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🐳 Docker

### Desarrollo Local

Para desarrollo local con hot reload:

```bash
docker-compose -f docker-compose.dev.yml up
```

O en background:
```bash
docker-compose -f docker-compose.dev.yml up -d
```

Esto:
- Usa `Dockerfile.dev` para desarrollo
- Monta el código fuente como volumen para hot reload
- Expone el puerto 4321 en `localhost:4321`
- Crea una red local `web` automáticamente

La aplicación estará disponible en: `http://localhost:4321`

### Producción

Para producción con Traefik:

1. **Asegúrate de tener la red externa `web` creada** (si no existe):
   ```bash
   docker network create web
   ```

2. **Configura las variables de entorno**. Tienes dos opciones:

   **Opción A: Crear archivo `.env` (recomendado)**
   ```bash
   cp .env.example .env
   # Edita .env con tus valores (especialmente el DOMAIN)
   ```
   
   **Opción B: Exportar variables directamente**
   ```bash
   export DOMAIN=elestoico.modavidc.com
   export PORT=3000
   export SERVICE_PORT=3000
   ```

3. **Construye y ejecuta en producción**:
   ```bash
   # Docker Compose carga automáticamente el archivo .env si existe
   docker-compose -f docker-compose.prod.yml up -d --build
   
   # O especifica el archivo explícitamente
   docker-compose --env-file .env -f docker-compose.prod.yml up -d --build
   ```

4. **Verificar que esté corriendo**:
   ```bash
   docker-compose -f docker-compose.prod.yml ps
   docker-compose -f docker-compose.prod.yml logs -f
   ```

5. **Para detener**:
   ```bash
   docker-compose -f docker-compose.prod.yml down
   ```

**Notas importantes:**
- Usa `docker-compose.dev.yml` para desarrollo y `docker-compose.prod.yml` para producción
- Traefik detectará automáticamente el contenedor gracias a los labels
- El certificado SSL se generará automáticamente con Let's Encrypt
- Asegúrate de que el dominio apunte al servidor donde corre Traefik

## 📸 Dónde guardar imágenes

- **`public/assets/images/`**: Imágenes estáticas (logos, hero, etc.)
  - Acceso directo: `/assets/images/logo.png`
  - Se copian tal cual al build
  
- **`src/assets/`**: Imágenes que se optimizan automáticamente
  - Se importan en componentes
  - Astro las comprime y optimiza

**Recomendación**: Usa `public/assets/images/` para la mayoría de imágenes.

## 🚀 Despliegue

**Para empezar rápido:** Ver [QUICK_START.md](./QUICK_START.md) - Método más sencillo

**Documentación completa:** Ver [DEPLOY.md](./DEPLOY.md) - Todas las opciones

**Resumen rápido:**
```bash
# En el servidor
git clone <repo> el-estoico-landing
cd el-estoico-landing
cp .env.example .env  # Edita DOMAIN
docker network create web  # Si no existe
docker-compose -f docker-compose.prod.yml up -d --build
```

## 📚 Documentación Adicional

- [QUICK_START.md](./QUICK_START.md) - Inicio rápido para despliegue
- [DEPLOY.md](./DEPLOY.md) - Guía completa de despliegue
- [Astro Documentation](https://docs.astro.build) - Documentación oficial de Astro

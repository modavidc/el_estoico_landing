# Dockerfile para producción de Astro
# Traefik maneja el proxy inverso, solo necesitamos servir archivos estáticos

# Etapa 1: Build
FROM node:lts AS build

WORKDIR /app

# Copiar archivos de dependencias primero para optimizar cache de Docker
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Build de Astro
RUN npm run build

# Etapa 2: Runtime con servidor estático simple
FROM node:lts-alpine AS runtime

WORKDIR /app

# Instalar serve para servir archivos estáticos (muy ligero)
RUN npm install -g serve

# Copiar archivos construidos desde la etapa de build
COPY --from=build /app/dist ./dist

# Exponer puerto 3000
EXPOSE 3000

# Iniciar serve para servir archivos estáticos
CMD ["serve", "-s", "dist", "-l", "3000"]

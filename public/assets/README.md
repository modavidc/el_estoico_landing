# Assets - Archivos Estáticos

Esta carpeta contiene archivos estáticos que se copian directamente al build final.

## Estructura Recomendada

```
public/
├── assets/
│   ├── images/          # Imágenes estáticas (logos, hero images, etc.)
│   │   ├── logo.png
│   │   ├── hero.jpg
│   │   └── ...
│   └── README.md        # Este archivo
└── favicon.svg          # Favicon del sitio
```

## Uso en Componentes

### Imágenes en `public/assets/images/`

```astro
<!-- Acceso directo con ruta absoluta -->
<img src="/assets/images/logo.png" alt="Logo" />

<!-- O con ruta relativa desde public -->
<img src="/assets/images/hero.jpg" alt="Hero" />
```

### Imágenes en `src/assets/` (se optimizan automáticamente)

```astro
---
import logo from '../assets/logo.png';
---

<img src={logo.src} alt="Logo" width={logo.width} height={logo.height} />
```

## Recomendaciones

- **`public/assets/images/`**: Para imágenes que no necesitan optimización (logos pequeños, favicons)
- **`src/assets/`**: Para imágenes grandes que necesitan compresión automática
- Usa formatos WebP cuando sea posible para mejor rendimiento
- Optimiza imágenes antes de agregarlas al proyecto

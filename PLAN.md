# 🍕 Ciabatta Pizza — Landing Page · Plan de acción

> Landing page estática (HTML + CSS + JS vanilla, sin build step) para **Ciabatta Pizza**,
> pizzería artesanal de horno de leña. Construida a partir del mockup de referencia,
> la paleta "estilo madera" y el contenido multimedia real (fotos y videos del local).

---

## 1. Análisis de la información base

| Recurso entregado | Qué es | Cómo se usó |
|---|---|---|
| `pizzeria-mockup.jsx` | Diseño de referencia en React (nombre plantilla "La Leña") | Convertido a **HTML/CSS/JS puro** y adaptado a la marca real |
| `pizzeria-variables.css` | Paleta "estilo madera" (espresso, nogal, miel, ladrillo, pergamino, harina, albahaca, oro) | Sistema de **design tokens** en `:root` |
| `Contenido/LOGO.png` | Monograma **"Cbt"** | Marca real detectada: **Ciabatta Pizza** (confirmado en una caja del local en un video) |
| `Contenido/Pizza.jpg`, `Pizza (2).jpg` | Fotos reales de pizzas de horno | Optimizadas → menú destacado, galería, sección "nosotros" |
| `Contenido/LASAGNA*.heic` (×3) | Especial de **lasaña los viernes** | Convertidas (HEIC no carga en navegador) → sección especial + galería |
| `Contenido/*.mp4` (×4) | Videos del horno/pizzas | Comprimidos + posters → **video hero** + galería |

**Hallazgos clave**
- La marca real es **Ciabatta Pizza** (no "La Leña" del mockup).
- Todas las fotos de pizza y videos son **verticales**; las lasañas, **cuadradas**.
- Los `.heic` no son compatibles con navegadores → requirieron conversión.
- Precios (COP) y datos de contacto son **placeholders editables** (marcados con `TODO`).

---

## 2. Plan de acción (fases)

- [x] **Fase 0 — Pipeline de assets**: convertir HEIC→WebP/JPG, optimizar fotos, comprimir videos, extraer posters.
- [x] **Fase 1 — Estructura**: `index.html`, `css/styles.css`, `js/main.js`, `assets/`.
- [x] **Fase 2 — Maquetado**: 11 secciones semánticas con la paleta como design tokens.
- [x] **Fase 3 — Animaciones**: scroll-reveal, hover, contadores, ticker, parallax sutil — respetando `prefers-reduced-motion`.
- [x] **Fase 4 — Responsive**: mobile-first, menú hamburguesa, grids fluidos con `clamp()`.
- [x] **Fase 5 — Verificación visual**: render real con Playwright en 3 breakpoints.
- [x] **Fase 6 — Review multi-agente**: 6 dimensiones + verificación adversarial de cada hallazgo.
- [x] **Fase 7 — Aplicar fixes**: correcciones confirmadas en HTML/CSS/JS.
- [x] **Fase 8 — Optimización final**: imágenes responsive y limpieza de assets.

---

## 3. Lo que se hizo

### Estructura del sitio
```
Ciabata-Pizza/
├── index.html            # Marcado semántico + SEO + JSON-LD
├── css/styles.css        # Design tokens + responsive + animaciones
├── js/main.js            # Nav, scroll-reveal, contadores, galería, tilt, hero
├── assets/
│   ├── img/              # WebP + JPG optimizados, posters, logo
│   └── video/            # MP4 comprimidos para web
├── Contenido/            # Material original (sin tocar)
├── pizzeria-mockup.jsx   # Referencia original
├── pizzeria-variables.css
└── PLAN.md               # Este documento
```

### Secciones implementadas
1. **Nav** sticky con logo, links, CTA y menú hamburguesa móvil.
2. **Hero** con video de fondo (horno) consciente de datos/batería + scrim + CTAs + badges.
3. **Ticker** animado de características.
4. **Favoritas** — tarjetas con fotos reales de las pizzas más pedidas.
5. **Menú** completo en grid tipo carta con "leader dots".
6. **Viernes de lasaña** — sección especial destacada con sello.
7. **Nosotros** — historia + contadores animados.
8. **Galería** — masonry de fotos y videos con play accesible.
9. **Reseñas** — testimonios con estrellas.
10. **CTA** — pedir por WhatsApp / llamar.
11. **Footer** — horario, contacto, redes.

### Procesamiento de assets
- 3 HEIC → WebP + JPG (lasañas).
- 2 fotos de pizza optimizadas (WebP + JPG) + **variantes responsive** (400/700/1080w).
- 4 videos comprimidos a H.264 720–1080p sin audio (ej. hero: **11 MB → ~700 KB**).
- Posters extraídos de cada video (JPG + WebP).
- Logo máster de 525 KB **eliminado** del deploy (se usa la versión de 256 px).

### Review multi-agente y correcciones
Se ejecutó un **review en 6 dimensiones** (responsive, accesibilidad, performance,
semántica/SEO, calidad de código, pulido de diseño) con **verificación adversarial**
de cada hallazgo (62 agentes). Resultado: **47 hallazgos confirmados** y corregidos.

| Dimensión | Correcciones aplicadas (destacadas) |
|---|---|
| **Responsive** | Fix de overflow horizontal del menú en 360px; títulos con `overflow-wrap`; áreas táctiles ≥44px en footer |
| **Accesibilidad** | Contraste de estrellas y del CTA a AA; menú móvil sin foco al estar cerrado (`visibility`); videos pausables por teclado; `lang="es-CO"` |
| **Performance** | Fuentes no bloqueantes; `preload` con `type`; video hero diferido y consciente de `save-data`; imágenes responsive con `srcset`; assets huérfanos eliminados |
| **SEO / Semántica** | JSON-LD `Restaurant`; Open Graph + Twitter Card completos; `canonical`; `apple-touch-icon`; jerarquía de encabezados |
| **Código** | Tilt 3D sin lag (rAF + transición); scroll-lock del body; scroll-spy robusto; `matchMedia` con fallback |
| **Diseño** | Galería masonry sin huecos; ratio de tarjetas; jerarquía tipográfica; textura de grano sutil; sello de viernes con entrada única; tokens de elevación |

---

## 4. Datos del negocio

### ✅ Confirmados y aplicados (actualizado 2026-06-27)

- [x] **Dirección**: Cl. 16 #1C-120, **Restrepo, Meta** (no Villavicencio). Aplicada en footer y JSON-LD (`streetAddress` + `addressLocality`).
- [x] **Horario real** (según Google): **Miércoles a Domingo 5:00–10:00 p. m.**; **Lunes y Martes cerrado**. Aplicado en CTA, footer y `openingHoursSpecification`.
- [x] **WhatsApp / teléfono**: **+57 323 601 1700**. Botones de WhatsApp, `tel:` y footer.
- [x] **Redes**: Instagram `@ciabattapizzeria` y Facebook `CiabattaPizzeria`. Aplicadas en footer y `sameAs`.
- [x] **Mapa**: embed de Google Maps integrado en el footer + `geo`/`hasMap` en JSON-LD.

### ⏳ Pendiente por confirmar con el cliente (consultar y poner luego)

- [ ] **Teléfono fijo de "Llamar al local"**: por ahora se usa el mismo WhatsApp (+57 323 601 1700). Confirmar si tienen un fijo distinto.
- [ ] **Correo electrónico de contacto**: por ahora **no tienen** → se omitió del sitio. Añadir si abren uno.
- [ ] **Dominio de producción**: aún **no hay**. Esto es una landing para mostrar el negocio; se comprará dominio **tras cerrar el trato**. Mientras tanto `ciabattapizza.co` queda como placeholder en `canonical`, Open Graph, Twitter Card y JSON-LD (`url`, `logo`, `image`, `menu`).
- [ ] **Carta y precios reales**: **no los tienen** y no están próximos. Los precios actuales (COP) son de ejemplo.
- [ ] **Domicilios por plataforma** (Rappi, DiDi Food, etc.): **por confirmar**. Hoy el sitio solo ofrece pedido por WhatsApp.
- [ ] **TikTok u otra red** además de IG/Facebook: **por confirmar**.
- [ ] *(Opcional)* `aggregateRating` en el JSON-LD solo con un número de reseñas real y verificable.

---

## 5. Cómo ver el sitio (local)

Abrir `index.html` directo en el navegador, o servirlo localmente:

```bash
# Opción A — Python
python -m http.server 8000        # http://localhost:8000

# Opción B — Node (igual que producción)
npm install
npm start                          # usa $PORT (3000 por defecto)
```

---

## 6. Despliegue en Railway

Sitio estático servido con Node + `serve` (soporta *range requests* → video OK en Safari).
Archivos de deploy añadidos:

- `package.json` — dependencia `serve` y script `start` (`serve .`, escucha en `$PORT`).
- `railway.json` — builder **Nixpacks** + `startCommand: npm run start` + reinicio `ON_FAILURE`.
- `.gitignore` — excluye `node_modules/`.

**Pasos (desde GitHub):**
1. Subir el repo a GitHub: `git add -A && git commit -m "Preparar deploy" && git push`.
2. Railway → **New Project → Deploy from GitHub repo** → elegir este repo.
3. Railway detecta Node por `package.json`, instala dependencias y ejecuta `npm start`.
   No hay variables de entorno obligatorias (Railway inyecta `PORT`).
4. **Settings → Networking → Generate Domain** para la URL pública.

**Alternativa (Railway CLI):**
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

> Notas:
> - `serve` publica TODA la carpeta. Si no quieres exponer archivos internos
>   (`PLAN.md`, `pizzeria-mockup.jsx`, `Contenido/`), bórralos antes de desplegar.
> - Al comprar el dominio real, reemplazar el placeholder `ciabattapizza.co` en
>   `canonical`, Open Graph y JSON-LD.

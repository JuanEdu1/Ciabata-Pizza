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

## 4. Pendiente para el cliente (placeholders a reemplazar)

- [ ] **Datos de contacto reales**: dirección, teléfono, email (marcados con `TODO` en el footer y JSON-LD).
- [ ] **Número de WhatsApp** real (actualmente `573000000000`).
- [ ] **URLs de redes sociales** (Instagram/Facebook).
- [ ] **Dominio de producción** en `canonical`, Open Graph y JSON-LD (`ciabattapizza.co` es placeholder).
- [ ] **Precios y carta** definitivos (los actuales son referencia).
- [ ] *(Opcional)* `aggregateRating` en el JSON-LD solo con un número de reseñas real y verificable.

---

## 5. Cómo ver el sitio

Abrir `index.html` directamente en el navegador, o servirlo localmente:

```bash
# Python
python -m http.server 8000
# luego abrir http://localhost:8000
```

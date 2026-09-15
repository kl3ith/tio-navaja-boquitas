# Tío Navaja · Boquitas para Eventos

Brochure web interactivo de las boquitas de **Tío Navaja** (El Cangrejo, Panamá), pensado para enviarse a clientes como presentación de servicios para eventos.

- 100 % estático y **sin dependencias externas en producción**: fuentes, imágenes e iconos viven en el proyecto. Funciona sin internet una vez descargado o clonado.
- Vite + React + TypeScript + CSS (sin frameworks de UI).
- Responsive, accesible (teclado, focus visible, `aria-*`, `prefers-reduced-motion`).

## Uso

```bash
npm install        # una sola vez (necesita internet)
npm run dev        # desarrollo → http://localhost:5173
npm run build      # producción → carpeta dist/
npm run preview    # sirve dist/ localmente
```

La carpeta `dist/` es autocontenida: se puede abrir desde cualquier servidor estático o subir a GitHub Pages / Netlify / Vercel tal cual.

## Dónde cambiar las cosas

| Qué | Dónde |
|---|---|
| Textos de hero, intro y CTA | `src/content/boquitas.ts` → `COPY` |
| Boquitas (nombre, descripción, foto) | `src/content/boquitas.ts` → `CATEGORIES` |
| Enlace del botón **Quiero cotizar** | `src/content/config.ts` → `CONTACT_URL` |
| Instagram / WhatsApp / teléfono del footer | `src/content/config.ts` → `CONTACT` |
| Título y descripción SEO | `index.html` y `src/content/config.ts` → `SITE` |
| Paleta, tipografías, espaciados | `src/styles/tokens.css` |
| Logo (SVG vectorizado del brochure) | `public/logo.svg` |

### Agregar o cambiar una fotografía

1. Poner el archivo original en `assets-src/` (PNG o JPG).
2. Añadir una línea `save(load("archivo.png"), "slug")` en `assets-src/build-images.py`.
3. Ejecutar `python3 assets-src/build-images.py` (necesita Pillow: `pip install pillow`). Genera `public/img/slug-480.webp`, `-960.webp`, `-1600.webp`.
4. Regenerar el manifiesto `src/content/images.json` (el script de imágenes lo hace al final; si no, ver el bloque al final de este README).
5. En `src/content/boquitas.ts` poner `image: 'slug'` y un `alt` descriptivo.

Las boquitas **sin** `image` se muestran con un tratamiento tipográfico, de modo que la pieza queda visualmente completa aunque falte la foto.

## Estructura

```
src/
  content/      textos, catálogo y manifiesto de imágenes
  components/   Hero, Intro, CategoryNav, CategorySection, BoquitaCard, Modal, Cta, Footer…
  hooks/        useReveal, useParallax, useScrollSpy
  styles/       tokens.css (design tokens) y global.css
public/
  img/          fotos optimizadas (WebP, 3 tamaños)
  logo.svg, favicon.svg, og.jpg
assets-src/     originales + script de optimización
```

## Contenido

Se usa exclusivamente la información del brochure de boquitas: 4 frías, 8 calientes y 6 dulces. No hay precios, cantidades, testimonios ni datos de contacto inventados.

## Regenerar el manifiesto de imágenes a mano

```bash
python3 - <<'PY'
import os, json, re
from PIL import Image
d="public/img"; m={}
for f in sorted(os.listdir(d)):
    mm=re.match(r"(.+)-(\d+)\.webp$", f)
    if mm:
        im=Image.open(os.path.join(d,f))
        e=m.setdefault(mm.group(1),{"sources":[],"ratio":round(im.size[0]/im.size[1],4)})
        e["sources"].append({"file":f,"w":im.size[0]})
for e in m.values(): e["sources"].sort(key=lambda s:s["w"])
json.dump(m, open("src/content/images.json","w"), indent=2)
PY
```

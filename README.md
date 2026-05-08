# Praxis Taller — Sitio inmobiliario

Sitio web de Praxis Taller (instagram.com/praxis.taller). Estética japonesa
minimalista contemporánea aplicada a inmobiliaria de proyectos arquitectónicos
premium. Construido sobre Next.js 15 App Router, TypeScript, Tailwind, Framer
Motion, GSAP y Lenis.

## Filosofía técnica

Cada decisión responde a una intención: **silencio, atemporalidad, materia**.
Si una animación es divertida pero no es serena, no entra. Si un componente es
funcional pero hace ruido visual, se simplifica. Pesos tipográficos ligeros,
muchísimo whitespace, esquinas rectas, color reservado.

## Arrancar localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

> Si es la primera vez, `next/font` descargará Shippori Mincho, Inter y Noto
> Serif JP la primera vez que arranque. Es normal.

## Comandos

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor local con HMR |
| `npm run build` | Build de producción |
| `npm run start` | Servir build de producción |
| `npm run lint` | ESLint |

## Estructura

```
.
├── app/                              Rutas (App Router)
│   ├── layout.tsx                    Root layout · fonts · SmoothScroll · Nav · Footer
│   ├── globals.css                   Estilos base + variables CSS
│   ├── page.tsx                      Home
│   ├── proyectos/
│   │   ├── page.tsx                  Listado
│   │   └── [slug]/page.tsx           Página individual ★ pieza central
│   ├── filosofia/page.tsx
│   ├── contacto/page.tsx
│   └── not-found.tsx                 404
│
├── components/
│   ├── ui/                           Container, Eyebrow, HorizontalLine, KanjiAccent
│   ├── animations/                   RevealText, MaskedImage, StaggerGroup
│   ├── sections/                     Hero, ProjectGrid, ProjectGallery, NextProject, PlanoSVG
│   └── layout/                       Nav, Footer, SmoothScroll, PageTransition, CustomCursor
│
├── content/proyectos/                Fuente de verdad de proyectos · MDX con frontmatter
│   ├── casa-hinoki.mdx
│   ├── casa-kawa.mdx
│   ├── casa-sora.mdx
│   ├── casa-mori.mdx
│   └── casa-tsuki.mdx
│
├── lib/projects.ts                   Loader MDX (gray-matter)
│
├── public/
│   ├── logo/                         Logos de Praxis (cristal, terracota, metal, plana)
│   └── images/                       (Vacío) — para imágenes locales si dejas Unsplash
│
├── tailwind.config.ts                Paleta + fonts + transiciones
├── next.config.mjs                   Image remotePatterns (Unsplash)
└── README.md
```

## Cómo añadir un nuevo proyecto

Crear un archivo en `content/proyectos/casa-{nombre}.mdx`:

```mdx
---
title: "Casa Yume"
slug: "casa-yume"
location: "Oaxaca, Méx."
year: 2025
typology: "Residencial"
area: 195
kanji: "夢"
hero: "https://images.unsplash.com/photo-XXX?auto=format&fit=crop&w=2400&q=90"
heroAlt: "Casa Yume al amanecer"
excerpt: "Una casa que se construye alrededor de un patio."
quote: "Frase destacada opcional."
gallery:
  - "https://...jpg"
  - "https://...jpg"
detailBlocks:
  - image: "https://...jpg"
    title: "El umbral"
    body: "Texto del bloque..."
    align: "left"
specs:
  - { label: "Superficie", value: "195 m²" }
finalGallery:
  - "https://...jpg"
order: 6
---

Texto largo del concepto del proyecto.
Múltiples párrafos separados por línea en blanco.
```

El nuevo proyecto:
1. aparecerá en `/proyectos` automáticamente,
2. tendrá su página `/proyectos/casa-yume` generada estáticamente,
3. se enlazará automáticamente desde el "siguiente proyecto" del anterior.

> **Para reemplazar fotos placeholder por las tuyas**: súbelas a
> `/public/images/casa-yume/` y referéncialas como `/images/casa-yume/01.jpg`
> en el frontmatter. Apenas dejes de usar Unsplash, puedes quitar el host de
> `next.config.mjs`.

## Personalizar la paleta

`tailwind.config.ts` define la paleta completa:

```ts
colors: {
  sumi:      "#1a1a1a",   // tinta — texto principal
  shironeri: "#f5f3ee",   // blanco hueso — fondo principal
  washi:     "#ebe7df",   // papel washi — fondos secundarios
  sabi:      "#8a7e6d",   // marrón apagado — texto secundario
  ai:        "#1c2841",   // índigo — acento (escaso)
  aka:       "#8b1a1a",   // bermellón — acento (muy escaso)
  stone-200: "#e7e5e0",   // líneas y bordes
}
```

Las mismas vars también se exponen en `app/globals.css` como CSS custom
properties (`--color-sumi`, etc.) por si necesitas usarlas en estilos no-Tailwind.

**Regla de oro**: el 95% del sitio es shironeri/washi/sumi. `ai` y `aka` son
acentos puntuales — un sello, un underline en hover, un punto. Nunca uses los
dos acentos juntos.

## Tipografía

Tres familias cargadas con `next/font/google`, optimizadas y self-hosted:

- **Fraunces** (variable, display) — títulos grandes, números, nombres de proyecto. Configurada con `SOFT=0` vía `font-variation-settings` para terminales más afilados (sensación arquitectónica, menos "friendly").
- **Hanken Grotesk** (variable, body) — UI, párrafos, labels. Sans neutral más "diseñado" que Inter, sin asociación tech.
- **Shippori Mincho** — kanji y acentos en japonés (clase `.font-jp`).

Variables: `font-serif` (Fraunces), `font-sans` (Hanken), `font-jp` (Shippori).

Pesos: light (200-300) y regular (400). Nunca bold.

### Cambiar la pareja tipográfica

Las tres se cargan en `app/layout.tsx` vía `next/font/google`. Para cambiar:

1. Importa la nueva fuente desde `next/font/google`.
2. Ajusta `tailwind.config.ts` → `fontFamily` para que `serif`/`sans`/`jp` apunten a la nueva CSS var.
3. (Opcional) Ajusta `font-variation-settings` en `app/globals.css` si la nueva fuente es variable y tiene axes que quieras tunear.

## Animaciones — discretas, deliberadas

Estética Norm Architects: poca animación, layouts limpios, rapidez.

| Patrón | Implementación | Componente |
|---|---|---|
| Smooth scroll global | Lenis con `lerp: 0.08` | `SmoothScroll.tsx` |
| Reveal de título principal | Framer Motion palabra por palabra | `RevealText.tsx` (solo en H1 grandes) |
| Fade de bloque al scroll | Framer Motion opacity + y sutil | `FadeIn.tsx` |
| Fade de imagen al cargar | Framer Motion opacity + scale 1.04→1 | `MaskedImage.tsx` |
| Plano "dibujado" | SVG con stroke-dasharray + IntersectionObserver | `PlanoSVG.tsx` |
| Indicador de scroll | Línea vertical con animación de pulso | hero (CSS keyframes) |
| Liquid glass nav | backdrop-filter blur + saturate + highlight inset | `Nav.tsx` |

**Duraciones canónicas**: 800-1500ms con curva `[0.22, 1, 0.36, 1]` (`ease-praxis`).

## Reduced motion

Todas las animaciones respetan `prefers-reduced-motion`. Lenis se detiene, los
scroll triggers no se montan, las transiciones CSS pasan a 0.01ms.

## Deploy a Vercel

```bash
git init && git add . && git commit -m "Praxis Taller v1"
# Sube a GitHub, conecta el repo en vercel.com — listo.
```

`next.config.mjs` ya está preparado: las imágenes Unsplash están autorizadas en
`remotePatterns` y `next/image` les aplica AVIF/WebP automáticamente.

## Pendientes intencionales

Lo siguiente queda como hooks listos para que conectes:

- **Formulario de `/contacto`**: action apunta a `https://formspree.io/f/your-form-id`. Sustituye por tu endpoint (Resend, Formspree, Mailgun…) o conecta una server action.
- **Imágenes de proyecto**: hoy son Unsplash placeholders. Cuando tengas
  fotografía real, súbela a `public/images/{slug}/` y actualiza los MDX.
- **Planos**: `PlanoSVG.tsx` es un plano genérico. Sustituye por SVGs reales de
  cada proyecto (la animación de stroke funciona automáticamente con cualquier
  `<path>`, `<line>`, `<rect>`).
- **Logo SVG**: hoy se renderiza el `praxis-mark.jpg`. Si tienes el logo en SVG
  vectorial puro, reemplázalo en `Nav.tsx` y `globals.css` para mejor nitidez.

## Créditos de copy

Los textos de proyectos en `content/proyectos/*.mdx` son **placeholders
editables** (marcados como tal en el primer comentario del frontmatter). Están
escritos para mostrar la voz del sitio; reemplázalos por descripciones reales
de tus proyectos sin tocar la estructura.

---

静 · 間 · 寂

# praxis-taller

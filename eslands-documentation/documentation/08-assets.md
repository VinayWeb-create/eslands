# 08 — Asset Inventory

## Images (`client/public/`)

- **Hero/banner backgrounds**: `ban-8.jpg` (116K), `ban-9.jpg` (120K),
  `banner-3.jpg` (108K), `banner-newsletter.jpg` (440K — the largest single
  image in the repo).
- **People/illustration images**: `girl.png` (48K), `woman-blue.jpg` (52K),
  `about-image.jpg` (36K), `chel-4.png` (24K), `Computer_India.png` (116K).
- **Logos**: `logo.png`, `white-logo.png` (72K, likely for dark-nav
  variant), `nex.png` (44K, a partner logo).
- **Product photography**: `public/images/Product-1.jpg` … `Product-40.*`
  — **55 files total** in `public/images/`, mixed `.jpg`/`.jpeg`/`.png`,
  though `Products.jsx` only references 25 of them (`Product-1` through
  `Product-25`) — the remaining ~15–30 files (`Product-26.png` onward, plus
  a `web.png` and others) appear unused by any page currently reachable.
- **Icons**: `favicon.svg`, `og-image.svg` (used for Open Graph preview
  image), plus all in-UI icons come from the `lucide-react` icon
  component library rather than static icon image files.
- **SEO/meta files**: `robots.txt`, `sitemap.xml`, `llms.txt` (an emerging
  convention for exposing a plain-text summary to LLM crawlers).

Total `public/` footprint: ~6.3MB across 19 top-level entries plus the
`images/` subfolder.

## Duplicate/misplaced assets

11 image files exist **both** in `client/public/` and again at
`client/` **root** (`about-image.jpg`, `ban-8.jpg`, `ban-9.jpg`,
`banner-3.jpg`, `banner-newsletter.jpg`, `chel-4.png`, `girl.png`,
`nex.png`, `white-logo.png`, `Computer_India.png`, `woman-blue.jpg`).
Vite only serves files from `public/`, so the root-level copies are
**not used by the running site** — they're likely leftovers from before
the `public/` folder was set up, and are pure repo bloat (roughly
1MB duplicated). See `15-code-quality.md`.

## Fonts

Single family: **Inter** (weights 300–900), loaded from Google Fonts via
a `<link>` tag in `index.html` with `preconnect` hints. Not self-hosted,
so font loading depends on a third-party request to
`fonts.googleapis.com`/`fonts.gstatic.com` (see `12-performance.md` for
the render-blocking / privacy implications of this).

## Videos / Lottie / 3D models

None found. `three.js` and `@react-three/fiber`/`drei` are installed as
dependencies (see `10-libraries.md`), but no `.gltf`/`.glb` model files or
`Canvas`/3D component usage was found in `src/` — this looks like an
installed-but-unused capability (see `15-code-quality.md`).

## Icons

All UI icons are React components from `lucide-react` (imported per-file,
e.g. `Globe, Smartphone, Code2, ...`), not sprite sheets or `<svg>` files
committed to the repo — a clean, tree-shakeable approach.

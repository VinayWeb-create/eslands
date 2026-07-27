# 02 — Folder Structure

## Repository root

```
eslands/
├── README.md
├── client/
└── server/
```

## `client/` (React SPA)

```
client/
├── index.html            Single HTML shell, Google Fonts preconnect, meta tags
├── vite.config.js        Vite build config
├── tailwind.config.js    Tailwind theme extension (colors, shadows, keyframes)
├── postcss.config.js     PostCSS (Tailwind + autoprefixer)
├── package.json
├── public/                Static files served as-is (19 top-level entries incl. an `images/` subfolder)
│   ├── favicon.svg, og-image.svg, robots.txt, sitemap.xml, llms.txt
│   └── photographic assets referenced directly by <img src="/..."> in pages
├── *.jpg/*.png at client/ root   <- see note below (misplaced assets)
└── src/
    ├── main.jsx           Entry point: mounts <App/> inside HelmetProvider + BrowserRouter
    ├── App.jsx            Route table + global layout (Navbar, Footer, page transitions)
    ├── index.css          Tailwind directives + ~28KB of hand-written CSS
    ├── components/        19 shared/section components (see 04-components.md)
    ├── pages/             9 route-level page components (see 05-pages.md)
    ├── hooks/             1 custom hook (useTiltCard.js)
    └── lib/               1 file: axios instance (api.js)
```

**Folder-purpose notes:**

- **`components/`** — Mix of genuinely reusable pieces (`ServiceCard`,
  `IndustryCard`, `TiltCard`, `CountUp`) and page-scale composite sections
  (`Navbar`, `Footer`, `ContactSection`). No further subdivision (no
  `components/ui/`, no atomic-design layering).
- **`pages/`** — One file per route, mapped 1:1 to `react-router-dom`
  routes in `App.jsx`, except `Industries.jsx` and `HomeSections.jsx`,
  which exist but are **not wired into any route** (see below and
  `15-code-quality.md`).
- **`hooks/`** — Only one custom hook exists; most state is handled inline
  with `useState`/`useEffect` inside pages themselves rather than extracted
  into hooks.
- **`lib/`** — Just the axios client. There's no `utils/`, `types/`,
  `context/`, `providers/`, `services/`, `layouts/`, or `animations/`
  folder — those parts of the original discovery template don't exist in
  this codebase; state and API logic live directly inside page/component
  files.
- **Misplaced assets** — Several images (`about-image.jpg`, `ban-8.jpg`,
  `ban-9.jpg`, `banner-3.jpg`, `banner-newsletter.jpg`, `chel-4.png`,
  `girl.png`, `nex.png`, `white-logo.png`, `Computer_India.png`,
  `woman-blue.jpg`) sit at `client/` **root**, duplicating similarly named
  files already inside `client/public/`. Only files in `public/` are
  actually served by Vite; the root-level copies are dead weight in the
  repo (see `15-code-quality.md`).

## `server/` (Express API)

```
server/
├── server.js              App entry: middleware, routes, DB connect, listen
├── seed.js                 Presumably seeds the DB with sample data
├── config/                 db.js — Mongoose connection setup
├── routes/                 contactRoutes.js, careerRoutes.js, newsletterRoutes.js
├── controllers/             One controller per route file, same naming
├── middleware/              (rate limiting is inline in server.js; contents TBD per-file)
└── models/                  Contact.js, Career.js, Newsletter.js (Mongoose schemas)
```

This follows a conventional **routes → controllers → models** MVC-lite
Express layout. There's no `services/` layer — controllers likely talk to
Mongoose models directly.

## Folder communication

- `pages/*` import from `components/*`, `lib/api.js`, and `hooks/*`.
- `components/*` do **not** import from `pages/*` (correct direction —
  no circular coupling detected).
- `App.jsx` is the single wiring point between routing and layout chrome
  (`Navbar`, `Footer`, `Seo`, `ScrollIndicator`, `CookieBanner`).
- Client and server only communicate over HTTP via `VITE_API_BASE_URL`
  (an env var); there's no shared types/schema package between them, so
  the shape of a "contact form submission" is duplicated by hand in both
  the React form and the Mongoose model.

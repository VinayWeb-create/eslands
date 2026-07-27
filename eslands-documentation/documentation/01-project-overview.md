# 01 — Project Overview

## What this is

A marketing/corporate website for **Esland IT Solutions**, a UK-based
(Barking, London) IT services company offering web/mobile development,
cloud, AI, DevOps, cybersecurity, and IT staffing services. The repository
also carries an internal codename `onebridge-clone-server` in the server's
`package.json`, suggesting the backend started life as a clone/template
before being rebranded to Esland.

## Repository shape

```
eslands/
├── client/     Vite + React 18 SPA — everything the visitor sees
└── server/     Express + MongoDB API — contact/careers/newsletter forms only
```

This is a classic **decoupled frontend/backend** setup, not a monolith and
not a Next.js full-stack app. The two halves deploy independently: the
client builds to static assets (`vite build`) that could go on any static
host or CDN, and the server is a standalone Node process that needs its own
Mongo database.

## Tech stack

**Client**
- React 18.3 + Vite 5 (dev server / bundler)
- react-router-dom v6 (client-side routing, `BrowserRouter`)
- Tailwind CSS 3.4 (utility classes) **mixed with** a large hand-written CSS
  file (`index.css`, ~28KB) containing bespoke component classes
- Framer Motion 12 (page transitions, scroll reveals, hover states)
- react-helmet-async (per-page `<head>` tags for SEO)
- react-toastify (form submission toasts)
- axios (HTTP client to the Express API)
- `@react-three/fiber` + `@react-three/drei` + `three.js` (installed, 3D
  rendering capability — see Code Quality doc for whether it's actually used)
- lucide-react (icon set)

**Server**
- Express 4 + Mongoose 7 (MongoDB ODM)
- helmet, cors, morgan (security headers, CORS, request logging)
- express-rate-limit (throttles contact/newsletter endpoints)
- express-validator (input validation)
- nodemailer (likely for sending form submissions via email)
- dotenv (environment config)

## High-level architecture

```
Browser
  │
  ▼
React SPA (client/) ── react-router-dom routes: / /services /products
  │                     /about /careers /contact  (+ catch-all 404)
  │
  │  axios calls to VITE_API_BASE_URL/api/*
  ▼
Express API (server/) ── /api/contact  /api/careers  /api/newsletter
  │                       /api/health
  ▼
MongoDB (contact submissions, career applications, newsletter signups)
```

There is **no authentication, no protected routes, and no admin panel** in
this codebase — the API exists purely to receive public form submissions.

## Rendering model

This is a pure **client-side rendered (CSR)** SPA. `index.html` ships an
empty `<div id="root">` and all content is rendered by React in the
browser after JS loads. There is no SSR/SSG, which has real SEO and
performance implications (see `11-seo.md` and `12-performance.md`).

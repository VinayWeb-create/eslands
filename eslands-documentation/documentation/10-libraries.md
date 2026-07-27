# 10 — Library Inventory

## Client (`client/package.json`)

| Library | Version (pinned) | Purpose | Where used | Notes |
|---|---|---|---|---|
| react / react-dom | ^18.3.1 | UI runtime | Everywhere | React 19 exists upstream; upgrading is a deliberate future decision, not urgent — React 18 is still fully supported |
| vite | ^5.4.1 | Dev server / bundler | Build tooling | Actively maintained line |
| @vitejs/plugin-react | ^4.3.1 | Vite's React fast-refresh plugin | Build tooling | — |
| react-router-dom | ^6.16.0 | Client-side routing | `main.jsx`, `App.jsx`, `Navbar` | v6 API in use throughout (no v7-only features) |
| framer-motion | ^12.42.2 | Animation | Nearly every page/component | Heaviest UI dependency; see `12-performance.md` |
| tailwindcss | ^3.4.4 (dev) | Utility CSS | Every active page/component | v3, not the newer engine — fine, stable |
| @tailwindcss/forms | ^0.5.5 | Form control base styles | Global via Tailwind plugin | — |
| lucide-react | ^0.487.0 | Icon components | Every page | Frequent point releases upstream; low-risk to bump |
| axios | ^1.6.3 | HTTP client | `lib/api.js`, `Contact.jsx`, `Careers.jsx` | Could be replaced by native `fetch`, but no real need to |
| react-helmet-async | ^3.0.0 | Per-route `<head>` tags | `Seo.jsx`, `main.jsx` (`HelmetProvider`) | Actively maintained fork of the old `react-helmet` |
| react-toastify | ^11.1.0 | Toast notifications | `Contact.jsx`, form flows | — |
| @react-three/fiber | ^9.6.1 | React renderer for `three.js` | **Not imported anywhere in `src/`** | Installed but unused — pure dependency weight (see `15-code-quality.md`) |
| @react-three/drei | ^10.7.7 | Helper components for `@react-three/fiber` | **Not imported anywhere in `src/`** | Same as above |
| three | ^0.185.1 | 3D rendering engine | **Not imported anywhere in `src/`** | Same as above — these three packages alone likely account for a meaningful chunk of `node_modules` size and, if ever bundled, final JS size |
| postcss / autoprefixer | ^8.4.37 / ^10.4.24 (dev) | CSS tooling | Build pipeline | — |

## Server (`server/package.json`)

| Library | Version (pinned) | Purpose | Where used |
|---|---|---|---|
| express | ^4.19.0 | HTTP server framework | `server.js`, all routes |
| mongoose | ^7.6.2 | MongoDB ODM | `models/*.js`, `config/db.js` |
| cors | ^2.8.5 | Cross-origin requests | `server.js` (applied globally, no origin allowlist configured — see `15-code-quality.md`) |
| helmet | ^7.0.0 | Security headers | `server.js` |
| morgan | ^1.10.0 | Request logging | `server.js` (`'dev'` format — verbose, fine for dev, noisy for prod) |
| express-rate-limit | ^7.1.0 | Throttling | Applied to `/api/contact` and `/api/newsletter` only (20 req/min) — `/api/careers` GET is unthrottled, which is appropriate since it's read-only |
| express-validator | ^7.0.1 | Request validation | `middleware/validateRequest.js` + per-route validators |
| dotenv | ^16.3.1 | Env var loading | `server.js` |
| nodemailer | ^6.9.5 | Outbound email | Presumably in the contact/career controllers (confirms form submissions trigger emails) |
| nodemon (dev) | ^3.0.1 | Dev auto-restart | `npm run dev` script |

## Upgrade / replacement notes

- Nothing in either package.json is on a badly outdated major version;
  this is a reasonably current, well-chosen stack for its purpose.
- The **highest-value action isn't upgrading versions** — it's removing
  the three unused `three.js`-related packages (`three`,
  `@react-three/fiber`, `@react-three/drei`) if there's no near-term plan
  to add 3D visuals, since they add install size and dependency-audit
  surface for zero runtime benefit today.
- `cors()` is called with no options, meaning it currently reflects
  **any** origin — fine for a fully public marketing API with no
  authenticated state, but worth tightening to the production domain
  once one is finalized (this is a hardening note, not a critical flaw,
  since there's no sensitive data or auth to protect here).

# 03 — Routing

## Routing model

Client-side routing via **react-router-dom v6**, `BrowserRouter` (set up in
`main.jsx`), rendered inside `App.jsx`. There is no file-based routing, no
server-side routing, and no route protection of any kind (no auth, no
private routes).

## Route table (`App.jsx`)

| Path | Component | Notes |
|---|---|---|
| `/` | `Home` | Homepage — largest page (869 lines) |
| `/services` | `Services` | Services listing |
| `/products` | `Products` | Products listing |
| `/about` | `About` | Company info |
| `/careers` | `Careers` | Job openings |
| `/contact` | `Contact` | Contact form |
| `*` (catch-all) | `NotFound` | 404 page |

## Navigation structure (from `Navbar.jsx` / `Footer.jsx`)

- **Primary nav** (`Navbar.jsx`): Home, Services (with a mega-menu dropdown
  linking to 8 hash anchors on `/services` — Web Development, Mobile
  Development, Software Development, Networking Solutions, Branding &
  Promotion, SEO & Marketing, E-commerce Solutions, Website Redesign),
  Products, About, Contact.
- **Careers is not in the primary nav** — it's only reachable via a link
  in the **footer** (`Footer.jsx`). This is easy to miss for a visitor
  scanning the header only.

## Orphaned route candidate

`src/pages/Industries.jsx` (275 lines) exists in the codebase and is fully
built out, but **there is no `/industries` route registered in `App.jsx`,
and no navigation link points to it anywhere** (checked `Navbar.jsx`). It's
unreachable dead code unless something links to it that wasn't found. See
`15-code-quality.md`.

## Layouts / nesting

Next.js-style nested layouts don't apply here. Instead:

- `App.jsx` renders **one global layout** for every route: skip-link →
  `<Seo/>` → `<ScrollIndicator/>` → `<Navbar/>` → the routed page →
  `<Footer/>` → toast container → `<CookieBanner/>`.
- Every route is wrapped in a local `PageWrapper` component that adds a
  Framer Motion fade/slide transition (`opacity 0→1`, `y 24→0`, 0.45s
  ease-out) as the route changes, using `AnimatePresence mode="wait"`.
- There are **no nested/child routes** — every page is a flat top-level
  route.

## Loading / error states

- **Error page**: `NotFound.jsx` (5 lines) handles the catch-all `*` route
  — a minimal 404. No dedicated error boundary component was found, so an
  unhandled render error in a page would produce React's default white
  screen rather than a graceful fallback.
- **Loading states**: No route-level loading/suspense pattern — pages are
  synchronously imported (no `React.lazy`), so there's nothing to show a
  loader for at the routing level (see `12-performance.md` for the
  code-splitting implication of this).

## Dynamic routes / protected routes

None exist. Every route is static and public.

## Metadata per route

Handled by the `<Seo/>` component (see `11-seo.md`), which looks up
title/description strings from a hardcoded object keyed by `pathname` and
falls back to the homepage's copy for any unmapped route (including, e.g.,
`/industries` if ever linked, or any 404 path).

## Routing diagram

```
BrowserRouter
 └─ App
     ├─ Seo (reads useLocation().pathname)
     ├─ Navbar (site-wide nav: Home, Services, Contact links found)
     ├─ AnimatePresence
     │   └─ Routes
     │       ├─ "/"          → PageWrapper → Home
     │       ├─ "/services"  → PageWrapper → Services
     │       ├─ "/products"  → PageWrapper → Products
     │       ├─ "/about"     → PageWrapper → About
     │       ├─ "/careers"   → PageWrapper → Careers
     │       ├─ "/contact"   → PageWrapper → Contact
     │       └─ "*"          → PageWrapper → NotFound
     ├─ Footer
     ├─ ToastContainer
     └─ CookieBanner

     (orphaned: pages/Industries.jsx — not mounted anywhere)
```

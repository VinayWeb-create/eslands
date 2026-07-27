# 15 — Code Quality Review

## Architecture

Reasonable for the project's size: clean separation between client (SPA)
and server (REST API), conventional routes→controllers→models layering
on the server, and no circular imports detected between `components/` and
`pages/`. The main structural weakness is that **`Home.jsx` (869 lines)
does the job that `components/` was seemingly designed to do** —
suggesting an in-progress refactor that was started (the
`*Section.jsx` components + `HomeSections.jsx` data file exist) but never
finished/wired up.

## Duplication

- **Homepage vs. `/services`**: overlapping but inconsistent service
  lists/copy (see `06-homepage.md`).
- **Homepage vs. `/contact`**: two independent contact forms with
  presumably-duplicated validation logic.
- **Root-level vs. `public/` images**: ~1MB of duplicated image files
  (see `08-assets.md`).
- **Two styling systems**: Tailwind (live) and custom `.enterprise-*` CSS
  (dead) coexist in `index.css` (see `07-design-system.md`).

## Dead code (the largest finding in this audit)

Roughly **40% of `components/` files** (10 of 19) and **one full page**
(`Industries.jsx`) are not reachable from any route or import path:

- `HeroSection`, `CompanyIntro`, `DevelopmentProcess`, `TechStack`,
  `WhyChooseUs`, `TrustedBy`, `ServicesSection`, `IndustriesSection`,
  `ContactSection`, `ScrollToTop` — none imported anywhere (verified via
  repo-wide grep for each component name).
- `pages/Industries.jsx` — no route registered, no nav link.
- `pages/HomeSections.jsx` — defines/re-exports data and components but
  is itself never imported.
- A meaningful fraction of `index.css` only styles the dead components
  above.
- `three`, `@react-three/fiber`, `@react-three/drei` — installed, never
  imported.
- `~1MB` of duplicate image files at `client/` root.

None of this breaks anything today (dead code doesn't render), but it:
1. Makes the codebase harder to navigate for a new contributor (which
   file is the "real" hero section?).
2. Risks someone editing the wrong (unused) copy and wondering why
   nothing changes on the live site.
3. Adds unnecessary lines-of-code and dependency surface to maintain,
   audit, and lint.

## Broken/incomplete features found

- **Careers "Apply Now" button has no `onClick` handler** — renders,
  does nothing (see `05-pages.md`/`13-accessibility.md`).
- **`sitemap.xml` and `llms.txt` reference `/case-studies`, which doesn't
  exist anywhere in the codebase**, and `/industries`, which exists but
  isn't routed (see `11-seo.md`).
- **`Products.jsx` content is placeholder-quality**: all 25 products are
  titled "Various Versions" with no real name/description — reads as
  unfinished, not production-ready (see `05-pages.md`).

## Naming & consistency

- Server's `package.json` name is still `onebridge-clone-server`, not
  matching the `Esland IT Solutions` branding used everywhere else —
  cosmetic, but a rebrand/copy-paste leftover worth cleaning up.
- Component naming is generally clear and consistent
  (`ServiceCard`/`IndustryCard`/`TiltCard` read as a family); page naming
  matches route names 1:1 except for the two exceptions above.

## Large components / files

`Home.jsx` (869), `About.jsx` (577), `Navbar.jsx` (471), `Services.jsx`
(459) are the four largest files and the best refactor candidates —
each mixes data arrays, JSX, and animation-variant definitions in one
file with no sub-component extraction.

## Testing

No test files, no test runner configuration (no Jest/Vitest config, no
`__tests__` folders) were found in either `client/` or `server/`. There
is currently no automated safety net for the Phase 2 redesign work.

## Overall technical debt assessment

**Low-to-moderate.** The debt here is mostly "unfinished refactor
left in place" and "unrouted/placeholder content," not deep architectural
rot — there's no spaghetti coupling, no God-object, no obvious security
hole. The highest-leverage cleanup is deleting or finishing the
already-half-built component refactor before Phase 2 begins, so the
redesign isn't accidentally built on top of, or confused by, dead files.

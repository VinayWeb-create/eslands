# 05 — Page-by-Page Analysis

## `/` — Home (`pages/Home.jsx`, 869 lines)

The largest and most complex file in the app — see `06-homepage.md` for a
full section breakdown. Contains hero slider, stats, "why us", services
grid, testimonial carousel, pricing table, contact block, and newsletter
signup, **all defined inline** rather than composed from `components/`.

- **Forms**: contact form (posts via `api` to the Express contact endpoint)
  and a newsletter signup form.
- **CTAs**: "Get More", "Call us", "Learn more" (services), pricing plan
  CTAs.
- **Images**: 3 hero background images (`ban-9.jpg`, `ban-8.jpg`,
  `banner-3.jpg`), all plain `<img>` tags with `alt` text.
- **Animations**: Framer Motion fade/stagger throughout; `CountUp` for
  stats; slide/testimonial carousels with manual prev/next state.
- **Strengths**: Rich, content-complete, on-brand visual detail; skip-link
  and semantic headings present.
- **Weaknesses**: Everything lives in one 869-line file, mixing data,
  markup, and animation config — hard to maintain or test in isolation;
  duplicates content/markup that also exists (unused) in dedicated
  `components/*Section.jsx` files.

## `/services` (`pages/Services.jsx`, 459 lines)

Deep-dives into 8 service lines (Web, Mobile, Software, Networking,
Branding, SEO, E-commerce, Redesign), each with an id used as a hash
anchor (`#web-development`, etc.) matched to the Navbar's mega-menu links.
Reads `useLocation` to scroll to the right anchor when arriving via
`/services#anchor`. Copy is long-form marketing prose (see `15-code-quality.md`
for a note on repeated/generic phrasing).

## `/products` (`pages/Products.jsx`, 286 lines)

A gallery of 25 generic-looking placeholder products, each titled
**"Various Versions"** with a category and star rating but no distinct
name or description — this reads as **unfinished placeholder content**,
not production copy. Has search/filter UI (`Search`, `Tag` icons imported)
by category and rating.

## `/about` (`pages/About.jsx`, 577 lines)

Company story: stats (15+ years, 500+ projects, 50+ team, 98% satisfaction),
a timeline (Founded 2013 → Expansion 2018 → ...), values, and team-culture
sections. Heavy icon and animation use (`useInView` triggers), consistent
with the homepage's visual language.

## `/careers` (`pages/Careers.jsx`, 68 lines)

The only page that fetches **live data from the API** (`GET /api/careers`)
rather than using hardcoded arrays. Has department filter chips (All,
Engineering, Product, Security, Operations), a loading skeleton state,
and an empty state ("No positions found"). **The "Apply Now" button has no
`onClick` handler** — it renders but does nothing, a dead-end CTA (see
`15-code-quality.md`).

## `/contact` (`pages/Contact.jsx`, 290 lines)

Full contact form (name, email, phone, subject, message) with hand-rolled
client-side validation (regex for email/phone, required-field checks)
before POSTing to `/api/contact`. Shows success/error banners and
`react-toastify` toasts. Field shape matches the Mongoose `Contact` model
exactly, which is good (schema-consistent), though there's no shared
validation schema — the regex rules are duplicated conceptually between
client JS and server's `express-validator` rules.

## `/industries` (`pages/Industries.jsx`, 275 lines) — **unreachable**

Fully built page (industry cards, presumably banking/healthcare/retail/etc.)
but **not registered as a route and not linked from navigation**. Dead
content unless intentionally reserved for a future release. See
`03-routing.md` and `15-code-quality.md`.

## `*` — NotFound (`pages/NotFound.jsx`, 5 lines)

Minimal, on-brand 404 with a "Return home" link back to `/`. No search box
or suggested links, which is a small missed opportunity for a marketing
site (helps keep bounced 404 visitors on-site).

## Cross-page observations

- Every page uses **plain `<img>` tags**, not `next/image` or a
  lazy-loading wrapper — see `12-performance.md`.
- SEO metadata for every page (except `/industries`, which has none since
  it's unrouted) is centralized in `components/Seo.jsx` rather than
  colocated per page — convenient to audit, but means adding a new route
  requires remembering to also update `Seo.jsx`'s lookup table.
- No page has automated tests; no `__tests__` folders or `*.test.jsx`
  files exist anywhere in the repo.

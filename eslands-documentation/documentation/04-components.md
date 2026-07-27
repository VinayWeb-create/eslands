# 04 — Component Inventory

19 files live in `src/components/`. **Only 9 are actually imported anywhere**
in the app; the other 10 are unused ("dead") in the current build. Usage was
verified by grepping every `.jsx` file for each component name outside its
own definition file.

## Actively used components

| Component | Purpose | Props | Used in | Reusable? | Complexity |
|---|---|---|---|---|---|
| `Navbar` | Site header, desktop nav, mobile drawer, services mega-menu | none (self-contained, reads `useLocation`) | `App.jsx` (global) | No — single global instance | High (471 lines; nav data, dropdown state, scroll listener, mobile menu) |
| `Footer` | Site footer, sitemap-style link columns incl. Careers link | none | `App.jsx` (global) | No — single global instance | Medium |
| `Seo` | Injects per-route `<title>`, meta description, canonical, OG/Twitter tags, Organization JSON-LD | none (reads `useLocation`) | `App.jsx` (global) | Yes, in principle | Low |
| `ScrollIndicator` | Progress bar reflecting scroll position | none | `App.jsx` (global) | Yes | Low |
| `CookieBanner` | Cookie-consent banner | none | `App.jsx` (global) | Yes | Low |
| `CountUp` | Animated number counter, starts when scrolled into view | `end`, `suffix`, `prefix`, `duration` | `Home.jsx` (stats section) | Yes — genuinely reusable, clean API | Low |
| `ServiceCard` | Tilting image card for a service, used inside `HomeSections.jsx` | `item` (icon, title, text, image) | `HomeSections.jsx`, wraps into `ServicesSection.jsx` (itself unused, see below) | Yes | Medium |
| `IndustryCard` | Tilting card for an industry label | `label` | `HomeSections.jsx`, `IndustriesSection.jsx` (unused) | Yes | Low |
| `TiltCard` | Generic 3D-tilt wrapper (mouse-follow parallax), degrades to a plain `div` on touch devices | `children`, `className`, `maxTilt`, plus passthrough motion props | `ServiceCard`, `IndustryCard` | Yes — well-abstracted, touch-aware | Medium |

`TiltCard` also uses the one custom hook in the project, `useTiltCard.js`,
which encapsulates the pointer-tracking math (sheen gradient + 3D
transform) — this is the cleanest separation of concerns in the codebase.

## Unused / orphaned components (dead code)

None of the following are imported by any page or by `App.jsx`. They appear
to be leftovers from an earlier version of the homepage before `Home.jsx`
was rewritten to build every section inline:

| Component | Lines | Apparent original purpose |
|---|---|---|
| `HeroSection` | 243 | Standalone hero section (superseded by inline hero in `Home.jsx`) |
| `CompanyIntro` | 231 | "About the company" intro block |
| `DevelopmentProcess` | 248 | Process/step-by-step section |
| `TechStack` | 241 | Technology stack showcase (with orbit/pill visuals matching the unused CSS in `index.css`) |
| `WhyChooseUs` | 196 | Differentiators section (duplicates "The Esland Difference" now inline in `Home.jsx`) |
| `TrustedBy` | 136 | Client-logos section |
| `ServicesSection` | 235 | Services grid wrapper (imports the *live* `ServiceCard`, but is itself unused) |
| `IndustriesSection` | 208 | Industries grid wrapper (imports the *live* `IndustryCard`, but is itself unused) |
| `ContactSection` | 377 | Standalone contact form section (superseded by inline contact block in `Home.jsx` and/or `Contact.jsx`) |
| `ScrollToTop` | 46 | Presumably a route-change scroll reset — genuinely useful pattern, but not mounted, so **the app may not scroll to top on route change** (worth verifying manually) |

This is ~2,300 lines (roughly 40% of all component code) that ships in the
repo but not in the rendered app. See `15-code-quality.md` for the cleanup
recommendation and `12-performance.md` for whether it affects bundle size.

## Component dependency map (active tree only)

```
App.jsx
 ├─ Seo
 ├─ ScrollIndicator
 ├─ Navbar
 ├─ Routes → pages/* (see 05-pages.md)
 │            └─ Home.jsx → CountUp
 │                        → (inline JSX, no ServiceCard/IndustryCard directly)
 ├─ Footer
 └─ CookieBanner

pages/HomeSections.jsx (exports data + re-exports components; not imported anywhere itself)
 ├─ ServiceCard → TiltCard → useTiltCard
 ├─ IndustryCard → TiltCard → useTiltCard
 ├─ TestimonialCarousel
 └─ PartnersMarquee
```

Note: `HomeSections.jsx` itself doesn't appear to be imported by `Home.jsx`
either — it defines and re-exports service/industry data and components but
`Home.jsx` has its own inline `oldServices` array instead. This looks like a
half-finished refactor (see `15-code-quality.md`).

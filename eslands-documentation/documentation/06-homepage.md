# 06 — Homepage Breakdown

The homepage (`pages/Home.jsx`) is a single 869-line file built from
**10 numbered inline sections** (marked with `// N. SECTION NAME` comments
in the source). It does not use the dedicated `components/*Section.jsx`
files — those exist but are dead code (see `04-components.md`).

| # | Section | Purpose | Data source | Animation | Notes |
|---|---|---|---|---|---|
| 1 | Hero Carousel | Full-bleed rotating background (3 images), headline, CTAs | `heroSlides` array (inline) | `AnimatePresence` cross-fade between slides | Background images: `ban-9.jpg`, `ban-8.jpg`, `banner-3.jpg` |
| 2 | Partners Marquee + Stats | Client logo strip + animated stat counters | `partners` array (inline) | `CountUp` component, scroll-triggered | Also renders a `TiltImage` element beside the stats |
| 3 | About Esland | Short company intro, second stat block, tilt image | Inline copy | `fadeUp` + `CountUp` | Repeats stat pattern from section 2 |
| 4 | "Why Esland" (Creative/Impressive/Professional) | 3-card differentiator grid | Inline array of 3 cards | Staggered card reveal + gradient hover border | |
| 5 | Services — Bento Grid | Grid of 8 service cards (`oldServices`) | Inline array | Icon hover scale, card hover translate | Icons from `lucide-react`; service copy overlaps with `/services` page content |
| 6 | Branding CTA | Mid-page call-to-action banner | Inline copy | — | |
| 7 | Testimonials | Rotating single-testimonial carousel, 7 real client quotes | `testimonials` array (inline) | Manual prev/next with `AnimatePresence mode="wait"` | Quotes are attributed to named small businesses (Mobile Bitz, Kingsburry School, Flower Paradise, etc.) — see `11-seo.md`/`13-accessibility.md` for review-schema and screen-reader notes |
| 8 | Pricing | 4-tier hosting-style pricing table (Standard/Business/Premium/Ultimate) | `pricingPlans` array (inline) | Staggered card reveal, "Business" marked `popular` | Pricing reads like shared hosting tiers (webspace/bandwidth/domains) rather than IT-services packages — worth checking this still matches current offerings |
| 9 | Contact & Map | Address/phone/email block + inline contact form | Inline copy + `api` POST | `fadeUp` | Duplicates the standalone `/contact` page's form |
| 10 | Newsletter | Email signup strip | Inline form state | — | |

## Section-by-section responsive behavior

All ten sections use Tailwind responsive utility prefixes (`sm:`, `md:`,
`lg:`) for grid column counts and font sizing rather than the custom
breakpoint CSS seen in `index.css`'s `.enterprise-*` classes — meaning the
homepage's *inline* sections and the *unused* `.enterprise-home`-styled
components use two different, inconsistent responsive strategies (see
`07-design-system.md` and `14-responsive.md`).

## Possible issues

- **Duplication with `/services`**: section 5's service list and the
  dedicated `/services` page describe largely the same 6–8 offerings with
  different copy — a visitor bouncing between the two sees inconsistent
  service names/counts (Home lists 8 including "2D animation" and
  "Professional Naming"; `/services` lists a different set of 8).
- **Duplication with `/contact`**: section 9 duplicates the standalone
  contact form, meaning any change to form fields/validation must be made
  in two places.
- **File size**: at 869 lines, this is by far the largest file in the
  project and mixes data, presentation, and animation config with no
  internal sub-component extraction — a strong refactor candidate (see
  `15-code-quality.md`).

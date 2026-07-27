# 11 — SEO Analysis

## Metadata delivery

Per-route `<title>`, meta description, canonical URL, and Open Graph /
Twitter Card tags are injected client-side via `react-helmet-async` from a
single lookup table in `components/Seo.jsx`, keyed by `pathname`. A
static fallback set of tags also exists directly in `index.html` for the
initial (pre-JS) HTML.

**Because this is a client-side-rendered SPA with no SSR/SSG**, the
*initial* HTML response for every route is identical (the generic
homepage tags from `index.html`) until React hydrates and Helmet swaps
in the route-specific tags. Search engines and social crawlers that don't
execute JavaScript (or time out before it finishes) will see the same
generic title/description for `/services`, `/about`, `/contact`, etc.
Modern Googlebot does render JS, but this remains a real risk for other
crawlers (LinkedIn, Slack unfurls, some SEO auditing tools) and for
Core Web Vitals-linked ranking factors. See `12-performance.md`.

## Structured data

`Seo.jsx` emits a single **Organization** JSON-LD block (name, url, email,
telephone, founding date, full UK postal address) on every page. No
`WebPage`, `BreadcrumbList`, `Product`, `JobPosting`, or `Review`/
`AggregateRating` schema was found — despite the site having strong
candidates for several of these (the `/careers` page's job listings and
the homepage's 7 named client testimonials are both schema types Google
explicitly supports for rich results).

## Sitemap / robots — inconsistency found

`public/sitemap.xml` lists **7 URLs**, including
`https://eslanditsolutions.com/case-studies` — **but no `/case-studies`
route, page, or component exists anywhere in the codebase.** Submitting
this sitemap to Search Console would have search engines repeatedly
crawling a URL that resolves to the catch-all `NotFound` page. Similarly,
`public/llms.txt` (a plain-text summary aimed at LLM crawlers) references
`/industries` and `/case-studies` as "key pages" — `/industries` exists as
a built page but isn't routed (see `03-routing.md`), and `/case-studies`
doesn't exist at all. All three of these public-facing SEO files are
**out of sync with the actual route table.**

`robots.txt` is minimal and correct: allows all crawling, points to the
sitemap.

## Per-page SEO coverage

| Route | Title/description in `Seo.jsx`? | Canonical | Notes |
|---|---|---|---|
| `/` | Yes | Yes | |
| `/services` | Yes | Yes | |
| `/products` | Yes | Yes | Product page content itself is placeholder-quality ("Various Versions" ×25 — see `05-pages.md`), which will hurt this page's ranking regardless of metadata quality |
| `/about` | Yes | Yes | |
| `/careers` | Yes | Yes | No per-job metadata/schema even though job data is dynamic |
| `/contact` | Yes | Yes | |
| `/industries` | **No entry** | N/A | Unrouted; moot until (if) it's added back |
| `/case-studies` | **No entry, no page** | N/A | Listed in sitemap/llms.txt but doesn't exist |
| `*` (404) | Falls back to homepage tags | — | A 404 page should generally return true `noindex`, not homepage metadata |

## Heading structure

Pages generally use one `<h1>` per page (hero headline) followed by
`<h2>`/`<h3>` for section and card titles — a reasonable hierarchy at a
glance, though it wasn't exhaustively checked for skipped levels across
every one of the ~150 headings in the codebase.

## Image SEO

All images use descriptive `alt` text where reviewed (e.g. "London Tower
Bridge background", "Computer Network layout background"). No dedicated
`og-image` per route — every page shares the single `og-image.svg`.

## Internal linking

Cross-linking is thin: the homepage's service cards don't deep-link to
their matching `/services#anchor`; only the Navbar's mega-menu does. The
Products and Industries pages don't cross-link to Services/Contact.

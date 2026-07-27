# 12 — Performance Analysis

## Bundling / code splitting

`vite.config.js` uses default settings — no manual chunking, no
`build.rollupOptions.output.manualChunks`. Every route is imported
statically in `App.jsx` (no `React.lazy`/`Suspense`), so **the entire
app — all 7 pages plus every animation/3D-adjacent dependency — ships in
one initial JS bundle** rather than being split per route. For a visitor
who only ever looks at the homepage, this means paying the download/parse
cost of `Services.jsx`, `Products.jsx`, `About.jsx`, `Careers.jsx`, and
`Contact.jsx` upfront.

## Unused dependencies inflating the bundle

As covered in `10-libraries.md`, `three`, `@react-three/fiber`, and
`@react-three/drei` are installed but never imported in `src/`. Because
nothing imports them, Vite's tree-shaking/Rollup build **should** exclude
them from the production bundle automatically — but they still slow down
`npm install` and CI, and their presence in `package.json` is a maintenance
trap (someone may assume 3D is in use and spend time trying to find where).

## Images

- All images are plain `<img>` tags — no `loading="lazy"` attribute was
  observed on the ones reviewed, no responsive `srcset`/`sizes`, and no
  modern formats (WebP/AVIF) — everything is `.jpg`/`.jpeg`/`.png`.
- `banner-newsletter.jpg` at 440KB is the single largest asset in
  `public/` and, combined with the 3 hero images (~350KB combined) loaded
  on the homepage, represents a meaningful chunk of initial page weight
  for a marketing site whose primary goal is fast first impressions.
- 55 product images sit in `public/images/`, but only 25 are referenced —
  the unused ~30 don't cost runtime performance (unreferenced files aren't
  fetched) but do bloat the deployed static asset payload and repo size.

## Fonts

Inter is loaded from Google Fonts via a render-blocking `<link>` (with
`preconnect` hints, which helps) rather than self-hosted with
`font-display: swap` explicitly set — a third-party network round-trip
sits on the critical rendering path for text to appear styled.

## Rendering model

Pure CSR (see `11-seo.md`) means:

- **Time to First Contentful Paint** depends on JS bundle download +
  parse + execute before *any* content appears (the `index.html` root
  div is empty until React mounts).
- No streaming/progressive rendering, no static pre-render — a
  Lighthouse run on this app would likely show FCP/LCP dominated by JS
  bootstrap time rather than network/image time.

## Animation cost

Framer Motion's `whileInView` scroll listeners run on essentially every
section of every page, plus `TiltCard`'s continuous `onMouseMove` handler
recalculating a 3D transform on hover. Individually cheap, but cumulatively
this is more main-thread work than the equivalent CSS-only
`:hover`/`transition` implementation would need — worth profiling on a
mid-range mobile device before assuming it's negligible.

## Caching / hydration

No service worker, no explicit cache headers configuration visible in the
client build config (would typically be set at the hosting/CDN layer,
which isn't part of this repo). No hydration mismatch risk since there's
no SSR to mismatch against.

## What wasn't found (and would need a real Lighthouse run to confirm)

Actual Web Vitals numbers (LCP/CLS/INP), real bundle size in KB, and
render-blocking resource counts can't be determined from static code
reading alone — the above are structural risk factors, not measured
scores. Recommend running Lighthouse/WebPageTest against the deployed
site as a next step (see `16-recommendations.md`).

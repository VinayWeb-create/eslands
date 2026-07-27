# 16 — Recommendations (Pre-Phase-2 Cleanup)

These are **analysis-driven suggestions**, not changes made — everything
below is still to be decided/actioned separately, consistent with the
"no code changes" rule for this phase.

## Do before starting the UI/UX redesign (Phase 2)

1. **Decide the fate of the 10 orphaned components + `Industries.jsx`
   + `HomeSections.jsx`.** Either wire them in (if they represent a
   direction you actually want) or delete them. Redesigning on top of a
   codebase where it's unclear which "hero section" or "services
   section" is real will slow Phase 2 down.
2. **Fix the sitemap/llms.txt mismatch.** Remove `/case-studies` from
   `sitemap.xml` and `llms.txt` (or build the page, if it's genuinely
   planned), and either route `/industries` or remove references to it.
   This is a quick, high-value SEO hygiene fix independent of any visual
   redesign.
3. **Resolve the Services duplication** between the homepage's inline
   service grid and the `/services` page before restyling either —
   otherwise Phase 2 will need to redesign the same content twice with
   different data.
4. **Replace `/products` placeholder content** ("Various Versions" ×25)
   with real product names/descriptions, or scope it out of Phase 2 if
   it's not a priority page.
5. **Wire the Careers "Apply Now" button** to an actual action (mailto
   link, application form, or ATS redirect) so Phase 2 doesn't inherit a
   dead-end CTA.

## Structural improvements worth scoping into Phase 2

6. **Pick one styling system.** Decide between the Tailwind-only approach
   (currently live) and the more visually distinct `.enterprise-*` legacy
   CSS (currently dead) as the single direction, rather than carrying
   both forward.
7. **Break up the four largest files** (`Home.jsx`, `About.jsx`,
   `Navbar.jsx`, `Services.jsx`) into smaller, composable sections as
   part of the redesign — this is a natural moment to do it since the
   sections are being touched anyway.
8. **Add reduced-motion support** (`useReducedMotion()`) centrally in the
   shared animation variants — one small change, meaningful accessibility
   win, and worth doing regardless of what the redesign looks like
   visually.
9. **Consider route-based code splitting** (`React.lazy` per page) once
   pages are broken up — currently low-cost to defer, but worth planning
   for if the redesign adds more pages/weight.
10. **Optimize images** (compress `banner-newsletter.jpg` and hero
    banners, add `loading="lazy"` to below-the-fold images, consider
    WebP) — independent of visual redesign, pure performance win.

## Housekeeping (low effort, no design impact)

- Delete the ~1MB of duplicate images sitting at `client/` root.
- Remove `three`/`@react-three/fiber`/`@react-three/drei` from
  `package.json` if there's no near-term 3D plan.
- Rename the server package from `onebridge-clone-server` to something
  Esland-branded.
- Add a basic test setup (Vitest + React Testing Library is the natural
  fit for a Vite project) before making large-scale UI changes, so
  regressions are caught automatically.

## What this enables for Phase 2

With the above resolved, the London-enterprise-competitor comparison and
section-by-section improvement plan you mentioned can assume: one
canonical design system, one canonical homepage services section, no
dead files to accidentally reference, and working CTAs everywhere —
meaning Phase 2's redesign proposals apply directly to the *live*,
single-source-of-truth version of each page.

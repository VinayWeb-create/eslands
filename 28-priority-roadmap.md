# 28 — Priority Roadmap

Sequenced by **impact on conversion/trust vs. effort**, using Phase 1's
finding that several apparent gaps are actually cheap to close (existing
but disconnected components/content) rather than net-new design work.

## High Priority — directly impacts conversion and trust

1. **Fix broken/misleading SEO references** — remove or build
   `/case-studies`, route or remove `/industries` (Phase 1 finding,
   `11-seo.md`). *Effort: low.*
2. **Wire the Careers "Apply Now" CTA** to a real action (Phase 1
   finding). *Effort: low.*
3. **Resolve the homepage pricing-table mismatch** — replace the
   shared-hosting-style tiers with enterprise-appropriate packaging or
   remove the section (`18-homepage-gap-analysis.md`, `26`). *Effort:
   medium (needs real pricing/packaging decisions from the business).*
4. **Add `prefers-reduced-motion` support** across shared animation
   variants (`24-motion-comparison.md`). *Effort: low, centralized fix.*
5. **Reconnect Industries / TechStack / DevelopmentProcess** content
   (already built, per Phase 1) into real routes/sections
   (`25-feature-gap-analysis.md`). *Effort: low–medium — mostly wiring,
   not new design.*
6. **Rewrite Products page content** or reposition it as an
   Industries/Solutions showcase (`20-products-gap-analysis.md`).
   *Effort: medium–high — needs real content.*
7. **Unify the homepage/`/services` service list and homepage/`/contact`
   form duplication** (Phase 1 findings) before any visual redesign
   touches either. *Effort: medium.*
8. **Resolve the two parallel styling systems** — pick Tailwind-only or
   migrate toward the legacy visual direction; delete the other
   (`23-design-system-comparison.md`). *Effort: medium — foundational
   for everything else in Phase 3.*

## Medium Priority — improves engagement and usability

9. Add a leadership section and certifications/partner-badge row to
   `/about` (`21-about-gap-analysis.md`).
10. Add a map embed and response-time expectation to `/contact`
    (`22-contact-gap-analysis.md`).
11. Unify CTA wording into one repeated, specific action across the
    site (`26-conversion-analysis.md`).
12. Reduce simultaneous motion effects per section for a calmer,
    higher-confidence feel (`24-motion-comparison.md`).
13. Add a technology/partner logo band and process snapshot to the
    homepage (`18-homepage-gap-analysis.md`).
14. Build a real Case Studies section once outcome data is available
    from the business (`25-feature-gap-analysis.md`).

## Low Priority — polish and delight

15. Per-service illustrations/diagrams on `/services`
    (`19-services-gap-analysis.md`).
16. Cursor interactions, expanded 3D usage if 3D is wanted (the
    `three.js` dependency already exists per Phase 1 — otherwise remove
    it) (`24-motion-comparison.md`, Phase 1 `15-code-quality.md`).
17. Consultation-booking calendar integration, ROI/estimator tools,
    blog/resource centre — valuable but larger-scope items best planned
    as their own initiative once the foundational fixes above are done
    (`25-feature-gap-analysis.md`).
18. Housekeeping carried over from Phase 1 (duplicate images, unused
    3D packages, server package rename) — no user-facing impact, safe
    to batch in whenever convenient.

## Suggested sequencing for Phase 3

Phase 3 (page-by-page design specifications + incremental implementation)
will go faster and avoid rework if items **1, 5, 7, and 8 above** are
resolved first — they determine the canonical content and single design
system that every subsequent page spec should be built against. Item 3
(pricing) and item 6 (Products content) need a short business-input
conversation before design work can proceed on those two pages
specifically; everything else can move straight into Phase 3 design
specs.

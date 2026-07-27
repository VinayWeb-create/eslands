# 14 — Responsive Design Analysis

## Two competing responsive strategies

Mirroring the `07-design-system.md` finding, responsiveness is handled two
different ways depending on which "layer" of the codebase you're in:

1. **Active pages/components**: Tailwind responsive prefixes
   (`sm:`, `md:`, `lg:`) applied inline per element — e.g. grids that go
   from 1 column on mobile to 3–4 on desktop (`grid md:grid-cols-3`,
   services "bento grid" collapsing at smaller widths).
2. **Unused legacy CSS** (`index.css`'s `.enterprise-*` block): hand-rolled
   `@media (max-width: 800px)` and `@media (max-width: 460px)` breakpoints
   with fully separate rule sets for each selector — a completely
   different breakpoint system (800px/460px vs. Tailwind's default
   640/768/1024/1280px) that doesn't run today since its components
   aren't mounted, but would conflict with the Tailwind breakpoints if
   ever reintroduced without reconciliation.

## Breakpoint coverage in the live app

Based on Tailwind's default scale as configured (no custom `screens`
override was found in `tailwind.config.js`, so defaults apply):
`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px.

- **Mobile (< 640px)**: Navbar collapses to a hamburger/drawer (confirmed
  by `mobileOpen` state in `Navbar.jsx`); card grids stack to 1 column;
  hero copy/visual likely stack vertically (standard Tailwind
  `flex-col`/`grid-cols-1` fallback pattern used throughout).
- **Tablet (640–1024px)**: Grids typically move to 2 columns
  (`sm:grid-cols-2`) based on patterns seen across `Home.jsx`/`About.jsx`.
- **Desktop (≥ 1024px)**: Full multi-column layouts (3–4 columns),
  side-by-side hero copy/visual.
- **Large screens (≥1280px+)**: Content is generally capped by a
  `max-w-7xl`/`max-w-6xl` container, so very wide monitors don't get
  ever-widening line lengths — a good practice already in place.

## Navigation responsiveness

`Navbar.jsx` (471 lines) implements a full separate mobile menu markup
tree alongside the desktop mega-menu, rather than pure CSS show/hide of
one markup tree — this is a common and reasonable pattern for complex
nav (dropdown-in-desktop, accordion-in-mobile) but does mean nav-related
bugs need to be checked and fixed in two places.

## Typography scaling

Hero headlines use Tailwind's `clamp()`-free responsive text classes
(e.g. jumping from `text-4xl` to `text-6xl`/`text-7xl` at breakpoints)
in the active pages, which is standard practice, versus the unused legacy
CSS's `clamp(3.7rem, 7.1vw, 6.5rem)` fluid-typography approach — the
legacy approach is arguably the more modern technique, but again, it's
not currently in use.

## What wasn't verified

This analysis is based on static code reading, not actual rendered
screenshots at each breakpoint. A visual regression pass (e.g. resizing a
real browser or using device-emulation screenshots) is recommended before
Phase 2 UI work to catch any layout breakage not evident from the JSX/CSS
alone — particularly around the hero carousel's absolute-positioned
decorative elements and the pricing table's 4-column grid on tablet
widths.

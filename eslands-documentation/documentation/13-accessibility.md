# 13 — Accessibility Analysis

## What's already handled well

- **Skip link**: `App.jsx` renders a "Skip to content" link, visually
  hidden until focused (`sr-only focus:not-sr-only`), pointing to
  `#main-content` on the routed page wrapper — a solid, correctly
  implemented pattern that many marketing sites skip entirely.
- **Semantic landmarks**: pages generally use `<section>`, `<article>`,
  and heading tags rather than div-soup, based on the files reviewed.
- **Alt text**: images reviewed (hero backgrounds, service cards) have
  descriptive, non-generic `alt` attributes.
- **`aria-hidden`** is applied correctly to a few purely decorative icons
  (e.g. the arrow glyph in `ServiceCard`'s "Learn more" link).
- **Touch/hover parity**: `TiltCard` degrades gracefully to a static
  element on touch devices rather than leaving a dead mouse-only
  interaction (see `09-animations.md`) — this incidentally also helps
  users of switch-access/assistive pointer devices who register as
  "touch."

## Gaps found

- **No `prefers-reduced-motion` handling anywhere.** Every scroll-reveal,
  page transition, hover-scale, and mouse-tilt effect plays regardless of
  the OS-level reduced-motion preference. This is the most consequential
  accessibility gap in the codebase given how animation-heavy the site
  is — users with vestibular disorders who've explicitly opted out of
  motion still get the full effect.
- **Careers "Apply Now" button has no handler** (`05-pages.md`) — for a
  screen-reader or keyboard user, activating this control silently does
  nothing, which is confusing and provides no feedback.
- **Color contrast not verified programmatically.** Several UI elements
  use low-opacity text on dark/gradient backgrounds (e.g.
  `text-slate-400`/`text-slate-500` on `bg-slate-900`/`bg-slate-950`
  gradients) which are common places for contrast ratios to fall under
  WCAG AA (4.5:1 for body text) — this needs a contrast-checker pass
  against the actual rendered colors, not just a code read.
- **Focus states**: Tailwind's default focus rings aren't obviously
  customized or removed in the files reviewed, which is good by default,
  but custom interactive elements (e.g. the tilt cards, carousel
  prev/next buttons) should be spot-checked for a visible focus outline
  when tabbed to, since some of the glow/shadow-based hover styling can
  visually compete with or obscure a focus ring.
- **Carousel controls**: the hero and testimonial carousels are
  manually built (not using a library with built-in ARIA carousel
  roles). No `aria-label`, `aria-live`, or role annotations were found on
  the prev/next buttons or the slide container in the sections reviewed —
  screen-reader users may not get an announcement when the slide changes.
- **Form error messaging** (`Contact.jsx`): errors are tracked in React
  state and presumably rendered near each field, but whether they're
  programmatically associated via `aria-describedby`/`aria-invalid`
  wasn't confirmed from the header of the file — worth a direct check.

## Reduced motion — concrete fix pointer

Framer Motion supports `useReducedMotion()` out of the box; wrapping the
shared `fadeUp`/`staggerItem` variant objects to fall back to opacity-only
(no transform) when that hook returns `true` would fix the single biggest
gap with a small, centralized change rather than touching every section.

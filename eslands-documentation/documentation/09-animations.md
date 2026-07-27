# 09 — Animation Inventory

## Library: Framer Motion (v12)

The only animation library actually used across live pages. No GSAP is
installed or imported anywhere in the repo (despite the discovery
template's phase asking about it — confirmed **not present**).

### Where it's used

| Pattern | Example | Where |
|---|---|---|
| Page transitions | `PageWrapper` fades/slides each route (`opacity 0→1`, `y 24→0`, 0.45s ease-out) inside `AnimatePresence mode="wait"` | `App.jsx`, global |
| Scroll-reveal | `whileInView` + `viewport={{ once: true }}` fade-up (`fadeUp` variant) on nearly every section | `Home.jsx`, `About.jsx`, `Services.jsx` |
| Staggered children | `staggerContainer`/`staggerItem` variants (spring physics, `stiffness: 260, damping: 24`) | Card grids in `Home.jsx` ("Why Esland" cards, pricing cards) |
| Hover micro-interactions | `whileHover={{ scale: 1.08, y: -2 }}` on icon badges; card `hover:-translate-y-2` via Tailwind (CSS, not Framer) combined with Framer-driven glow | `ServiceCard`, `IndustryCard`, homepage cards |
| Mouse-follow 3D tilt | Full pointer-tracked tilt + sheen effect | `TiltCard` + `useTiltCard` hook, used by `ServiceCard`/`IndustryCard` |
| Number count-up | `useInView` triggers an interval-based counter | `CountUp` component |
| Carousel cross-fade | `AnimatePresence mode="wait"` swapping hero slides and testimonials | `Home.jsx` (hero + testimonials sections) |

### Touch-device handling

`TiltCard` explicitly detects touch input
(`matchMedia('(hover: hover) and (pointer: fine)')`) and **disables** the
tilt/sheen effect on touch devices, rendering a plain wrapper instead —
one of the more thoughtful pieces of engineering in the codebase.

## CSS keyframe animations (Tailwind config)

`float`, `drift`, `pulse-glow`, `gradient`, `spin-slow`, `bounce-slow` are
declared in `tailwind.config.js` as ambient/background motion (e.g. a
slowly floating decorative shape), separate from Framer Motion's
interaction-driven animations. These are lightweight, GPU-friendly
(`transform`/`opacity` only) CSS animations.

## Unused legacy CSS animations

`index.css`'s legacy block (styling the dead components — see
`04-components.md`/`07-design-system.md`) contains its own animation-style
visual flourishes (orbiting rings, floating cards, glow blurs) implemented
purely in CSS with absolute positioning — none of this runs today since
the components it styles aren't mounted.

## Reduced-motion support

No `prefers-reduced-motion` media query or Framer Motion
`useReducedMotion()` check was found anywhere in the codebase. Every
scroll-reveal, hover, and page transition will play at full intensity for
users who've requested reduced motion at the OS level — see
`13-accessibility.md`.

## Performance notes

Framer Motion adds a non-trivial JS bundle cost, and running many
`whileInView` scroll listeners plus a mouse-tracked tilt effect on cards
uses more CPU/GPU than plain CSS `:hover`/`transition` would for
similar visual effect. See `12-performance.md`.

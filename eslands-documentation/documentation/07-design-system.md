# 07 — Design System

## Two parallel styling systems

This codebase runs **two separate styling approaches side by side**,
which is the single biggest design-system finding:

1. **Tailwind utility classes** — used throughout every active page and
   component (`pages/*.jsx`, `components/ServiceCard.jsx`, etc.). Colors,
   spacing, radii, and shadows come from `tailwind.config.js`'s extended
   theme.
2. **Bespoke hand-written CSS** — a large block (roughly the first 20KB)
   at the top of `src/index.css`, using its own class names
   (`.enterprise-hero`, `.service-card`, `.process-section`,
   `.tech-orbit`, `.cta-panel`, etc.) with **hardcoded hex colors** that
   don't reference the Tailwind theme at all. This block styles the
   *unused* components documented in `04-components.md`
   (`HeroSection`, `TechStack`, `DevelopmentProcess`, etc.) — so a
   meaningful fraction of `index.css` is currently dead CSS shipped to
   every visitor.

## Tailwind theme (`tailwind.config.js`)

- **Color palette**: `primary` (sky blue), `secondary` (purple),
  `accent` (cyan), `surface` (slate/dark neutrals), plus `success`,
  `warning`, and a `glass` set for glassmorphism overlays — each a full
  50–950 shade ramp.
- **Shadows**: custom `glow`, `glow-sm`, `glow-lg`, `glow-purple`,
  `glow-cyan`, `glass`, `glass-light` — soft colored glows layered under
  cards/buttons for the dark, "enterprise SaaS" aesthetic.
- **Background images**: named gradient presets (`hero-glow`, `aurora`,
  `mesh`) for ambient page backgrounds.
- **Typography**: `Inter` for both `sans` and `display`, loaded via Google
  Fonts `<link>` in `index.html` (not self-hosted).
- **Type scale**: standard Tailwind scale (`xs`→`9xl`) explicitly
  redeclared with matching line-heights rather than left as Tailwind
  defaults — functionally equivalent to default Tailwind but locks the
  values in case defaults change in a future Tailwind major version.
- **Spacing**: extends with large values (`128`, `144`, `160`, `176`,
  `192` = 32–48rem) for oversized section padding.
- **Border radius**: adds `4xl` (2rem) and `5xl` (2.5rem) for the very
  rounded card look seen throughout (`rounded-[1.75rem]`,
  `rounded-[2rem]` custom values also appear directly in JSX, bypassing
  the theme scale).
- **Keyframes/animations**: `float`, `drift`, `pulse-glow`, `gradient`,
  `spin-slow`, `bounce-slow` — ambient background motion, separate from
  Framer Motion's interaction-driven animation (see `09-animations.md`).
- **Plugin**: `@tailwindcss/forms` for baseline form-control styling.

## Color usage in practice

- Public-facing pages (Home, Services, About, Contact, Products) mostly
  use a **dark, glowing "enterprise SaaS" look**: slate-900/950
  backgrounds, sky/indigo gradients, glassmorphic borders
  (`border-white/10`, `bg-white/5`).
- `Careers.jsx` and parts of `Contact.jsx`/`About.jsx` instead use a
  **light, white-background** style (`bg-white`, `text-slate-900`,
  `border-slate-200`) — so the site isn't visually consistent about
  light vs. dark as a base theme; it reads more like two different design
  passes than an intentional light/dark toggle (there is no user-facing
  dark/light mode switch — `color-scheme: dark` is hardcoded in
  `index.css`'s `:root`).

## Container/grid conventions

- Active pages: Tailwind's `mx-auto max-w-7xl px-6` (or similar) pattern
  for content width, and CSS grid via `grid md:grid-cols-3` etc.
- Unused legacy CSS: its own `.enterprise-container` class
  (`width:min(1240px, calc(100% - 48px))`) — a different container-width
  formula than the Tailwind pages use, another sign of an unmerged design
  iteration.

## Recommendation pointer

See `15-code-quality.md` and `16-recommendations.md` — the practical fix
is either (a) delete the unused legacy CSS + components entirely, or (b)
if that visual direction is actually preferred, migrate the *live* pages
onto it and delete the newer Tailwind-only sections instead. Keeping both
indefinitely means shipping unused CSS and confusing future contributors
about which system to extend.

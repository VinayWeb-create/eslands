import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export const EASE = [0.16, 1, 0.3, 1];

/** Fade + rise when scrolled into view. */
export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, delay, ease: EASE },
});

export function Eyebrow({ children, tone = 'light' }) {
  return (
    <span className={`ui-eyebrow ${tone === 'dark' ? 'ui-eyebrow--dark' : ''}`}>
      <span className="ui-eyebrow__dot" aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, sub, tone = 'light', align = 'center', id }) {
  const dark = tone === 'dark';
  return (
    <motion.div {...reveal()} className={`mx-auto max-w-3xl ${align === 'center' ? 'text-center' : ''}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={`mt-5 font-display text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-5xl ${dark ? 'text-white' : 'text-[var(--color-text)]'}`}>
        {title}
      </h2>
      {sub && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? 'text-slate-400' : 'text-[var(--color-text-muted)]'}`}>{sub}</p>}
    </motion.div>
  );
}

/** Button that leans toward the cursor. Renders a router Link, anchor or button. */
export function MagneticButton({ to, href, onClick, children, variant = 'primary', className = '', wrapperClassName = '', type = 'button', ...rest }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const btn = e.currentTarget.firstElementChild;
    if (btn) {
      btn.style.setProperty('--bx', `${e.clientX - r.left}px`);
      btn.style.setProperty('--by', `${e.clientY - r.top}px`);
    }
    if (reduce) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.28);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  const cls = `ui-btn ui-btn--${variant} ${className}`;
  const inner = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>;

  let el;
  if (to) el = <Link to={to} className={cls} {...rest}>{inner}</Link>;
  else if (href) el = <a href={href} className={cls} {...rest}>{inner}</a>;
  else el = <button type={type} onClick={onClick} className={cls} {...rest}>{inner}</button>;

  return (
    <motion.span style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={reset} className={`inline-block ${wrapperClassName}`}>
      {el}
    </motion.span>
  );
}

/** Parent variants for staggered children. */
export const stagger = (gap = 0.08, delay = 0) => ({
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '-60px' },
  variants: { hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } },
});

/** Child variants paired with stagger(). */
export const riseItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * One delegated pointer listener for the whole site: any element with
 * .ui-spot / .ui-bento / .ui-panel / .spotlight-card / .ui-btn gets cursor
 * coordinates as CSS variables, so cards can draw a spotlight and edge light
 * without each component wiring its own handler.
 */
export function SpotlightTracker() {
  useEffect(() => {
    if (window.matchMedia?.('(hover: none)').matches) return undefined;
    let raf = 0; let last = null;
    const apply = () => {
      raf = 0;
      const e = last;
      if (!e || !(e.target instanceof Element)) return;
      const el = e.target.closest('.ui-spot, .ui-bento, .ui-panel, .spotlight-card, .ui-btn');
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left; const y = e.clientY - r.top;
      el.style.setProperty('--mx', `${x}px`); el.style.setProperty('--my', `${y}px`);
      el.style.setProperty('--mouse-x', `${x}px`); el.style.setProperty('--mouse-y', `${y}px`);
      el.style.setProperty('--bx', `${x}px`); el.style.setProperty('--by', `${y}px`);
    };
    const onMove = (e) => { last = e; if (!raf) raf = requestAnimationFrame(apply); };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, []);
  return null;
}

/** Sets --mx / --my on an element so CSS can draw a cursor spotlight. */
export function useSpotlight() {
  return (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
}

/**
 * Canvas particle network. Points drift, link when close and are pulled
 * gently toward the cursor. Pauses when off-screen or with reduced motion.
 */
export function ParticleField({ density = 0.00009, color = '64,128,255', linkDist = 130, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let w = 0; let h = 0; let pts = []; let raf = 0; let visible = true;
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(18, Math.min(110, Math.round(w * h * density)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i += 1) {
        const p = pts[i];
        if (!reduce) {
          const dx = mouse.x - p.x; const dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 32000) { p.vx += dx * 0.00004; p.vy += dy * 0.00004; }
          p.x += p.vx; p.y += p.vy;
          p.vx *= 0.995; p.vy *= 0.995;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},0.75)`;
        ctx.fill();
        for (let j = i + 1; j < pts.length; j += 1) {
          const q = pts[j];
          const dx = p.x - q.x; const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            ctx.strokeStyle = `rgba(${color},${(1 - d / linkDist) * 0.28})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });

    resize();
    draw();
    io.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, [density, color, linkDist, reduce]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}

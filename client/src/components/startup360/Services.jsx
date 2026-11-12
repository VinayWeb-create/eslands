import { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Sparkles, Layers } from 'lucide-react';
import { EASE, MagneticButton, SectionHeading } from './primitives';
import { CTA, services } from './data';

function Panel({ s }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });
  const Icon = s.icon;

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div style={{ perspective: 1400 }}>
      <motion.article
        key={s.id}
        initial={{ opacity: 0, rotateY: -24, x: 40, scale: 0.96 }}
        animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
        exit={{ opacity: 0, rotateY: 20, x: -40, scale: 0.96 }}
        transition={{ duration: 0.6, ease: EASE }}
        onMouseMove={onMove}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="ui-panel"
        aria-labelledby={`svc-${s.id}-title`}
      >
        <div className="ui-panel__shine" aria-hidden="true" />
        <div className="relative flex flex-wrap items-start justify-between gap-4" style={{ transform: 'translateZ(40px)' }}>
          <div className="flex items-center gap-4">
            <span className="ui-icon-tile ui-icon-tile--lg"><Icon size={26} aria-hidden="true" /></span>
            <div>
              <h3 id={`svc-${s.id}-title`} className="font-display text-2xl font-extrabold text-[var(--color-text)] sm:text-3xl">{s.name}</h3>
              <p className="mt-1 text-[var(--color-text-muted)]">{s.tagline}</p>
            </div>
          </div>
        </div>

        <div className="relative mt-8 grid gap-6 sm:grid-cols-2" style={{ transform: 'translateZ(24px)' }}>
          <div>
            <p className="ui-label">Features</p>
            <ul className="mt-3 space-y-2.5">
              {s.features.map((f, i) => (
                <motion.li key={f} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.06 }} className="flex items-start gap-2.5 text-sm text-[var(--color-text)]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0057D8]/10 text-[#0057D8]"><Check size={12} strokeWidth={3} /></span>{f}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <p className="ui-label">Benefits</p>
            <ul className="mt-3 space-y-2.5">
              {s.benefits.map((b, i) => (
                <motion.li key={b} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }} className="flex items-start gap-2.5 text-sm text-[var(--color-text)]">
                  <Sparkles size={15} className="mt-0.5 shrink-0 text-violet-500" aria-hidden="true" />{b}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mt-7" style={{ transform: 'translateZ(16px)' }}>
          <p className="ui-label">Tech stack</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {s.stack.map((t, i) => (
              <motion.li key={t} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.05 }} className="ui-tag ui-tag--mono">{t}</motion.li>
            ))}
          </ul>
        </div>

        <div className="relative mt-7 flex flex-col gap-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5 sm:flex-row sm:items-center sm:justify-between" style={{ transform: 'translateZ(30px)' }}>
          <div className="flex items-start gap-3">
            <Layers size={18} className="mt-0.5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">Typical engagement · {s.caseStudy.title}</p>
              <p className="mt-1 text-sm text-[var(--color-text)]">{s.caseStudy.outcome}</p>
            </div>
          </div>
          <MagneticButton to={CTA.consult} className="shrink-0 !px-5 !py-2.5 !text-sm">Discuss {s.name} <ArrowRight size={14} /></MagneticButton>
        </div>
      </motion.article>
    </div>
  );
}

export default function Services() {
  const [active, setActive] = useState(services[0].id);
  const current = services.find((s) => s.id === active);

  const onKey = (e) => {
    const i = services.findIndex((s) => s.id === active);
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); setActive(services[(i + 1) % services.length].id); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); setActive(services[(i - 1 + services.length) % services.length].id); }
  };

  return (
    <section id="services" aria-labelledby="s360-services-title" className="relative overflow-hidden bg-[var(--color-bg-surface)] py-24 sm:py-32">
      <div className="ui-dots" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="s360-services-title" eyebrow="Fourteen services, one team" title="Open any service. See exactly what you get." sub="Every service plugs into the same roadmap, so nothing is built twice and nothing waits on another vendor." />

        <div className="mt-14 grid gap-8 lg:grid-cols-[260px_1fr]">
          <div role="tablist" aria-label="Services" aria-orientation="vertical" onKeyDown={onKey} className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
            {services.map((s) => {
              const on = s.id === active;
              const Icon = s.icon;
              return (
                <button
                  key={s.id} type="button" role="tab" aria-selected={on} aria-controls="s360-service-panel" tabIndex={on ? 0 : -1}
                  onClick={() => setActive(s.id)} onMouseEnter={() => setActive(s.id)}
                  className={`relative flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-colors ${on ? 'text-white' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
                >
                  {on && <motion.span layoutId="s360-svc-pill" className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#003087] to-[#0057D8] shadow-lg shadow-blue-900/20" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <Icon size={16} className="relative z-10" aria-hidden="true" />
                  <span className="relative z-10 whitespace-nowrap">{s.name}</span>
                </button>
              );
            })}
          </div>

          <div id="s360-service-panel" role="tabpanel" aria-live="polite">
            <AnimatePresence mode="wait">
              <Panel key={current.id} s={current} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

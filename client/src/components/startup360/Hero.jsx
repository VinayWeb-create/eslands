import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, CalendarDays, Play, X, Sparkles } from 'lucide-react';
import { EASE, MagneticButton, ParticleField } from './primitives';
import { CTA, demoSlides, heroOrbit, heroPhases } from './data';

function Orbit({ px, py }) {
  const reduce = useReducedMotion();
  const n = heroOrbit.length;
  return (
    <motion.div style={{ x: px, y: py }} className="relative mx-auto aspect-square w-[80%] max-w-[520px] sm:w-full">
      {/* rings */}
      {[100, 74, 48].map((s, i) => (
        <div key={s} className="s360-ring" style={{ width: `${s}%`, height: `${s}%`, animationDuration: `${40 + i * 18}s`, animationDirection: i % 2 ? 'reverse' : 'normal' }} />
      ))}
      {/* core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="s360-core">
          <span className="s360-core__pulse" aria-hidden="true" />
          <span className="s360-core__pulse s360-core__pulse--late" aria-hidden="true" />
          <div className="relative z-10 text-center">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-sky-200">Esland</p>
            <p className="font-display text-xl font-extrabold text-white sm:text-2xl">Startup360</p>
          </div>
        </div>
      </div>
      {/* orbiting modules (rotating wrapper, counter-rotating chips) */}
      <div className={`absolute inset-0 ${reduce ? '' : 's360-spin'}`} style={{ animationDuration: '60s' }}>
        {heroOrbit.map(({ label, icon: Icon }, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          const r = i % 2 ? 37 : 50;
          return (
            <div key={label} className="absolute" style={{ left: `${50 + Math.cos(a) * r}%`, top: `${50 + Math.sin(a) * r}%`, transform: 'translate(-50%,-50%)' }}>
              <div className={reduce ? '' : 's360-spin s360-spin--reverse'} style={{ animationDuration: '60s' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: EASE }}
                  className="s360-chip"
                >
                  <Icon size={15} aria-hidden="true" />
                  <span>{label}</span>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function DemoModal({ open, onClose }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!open) return undefined;
    setI(0);
    const t = setInterval(() => setI((v) => (v + 1) % demoSlides.length), 4200);
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { clearInterval(t); window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  const slide = demoSlides[i];
  const Icon = slide.icon;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog" aria-modal="true" aria-label="Startup360 guided tour"
        >
          <motion.div
            initial={{ y: 30, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="ui-dark-panel relative w-full max-w-2xl overflow-hidden rounded-3xl p-6 sm:p-10"
          >
            <button type="button" onClick={onClose} aria-label="Close tour" className="absolute right-4 top-4 rounded-full border border-white/10 p-2 text-slate-300 hover:bg-white/10 hover:text-white">
              <X size={18} />
            </button>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300">60-second tour · Step {i + 1} of {demoSlides.length}</p>
            <div className="relative mt-6 min-h-[190px]">
              <AnimatePresence mode="wait">
                <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.45, ease: EASE }}>
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/30">
                    <Icon size={26} />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-extrabold text-white sm:text-3xl">{slide.title}</h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-300">{slide.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex gap-1.5" role="tablist" aria-label="Tour steps">
              {demoSlides.map((s, idx) => (
                <button key={s.title} type="button" role="tab" aria-selected={idx === i} aria-label={`Step ${idx + 1}: ${s.title}`} onClick={() => setI(idx)} className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  {idx < i && <span className="absolute inset-0 bg-sky-400" />}
                  {idx === i && <motion.span key={`p${i}`} className="absolute inset-y-0 left-0 bg-sky-400" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 4.2, ease: 'linear' }} />}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Hero() {
  const [demo, setDemo] = useState(false);
  const closeDemo = useCallback(() => setDemo(false), []);
  const [phase, setPhase] = useState(0);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const px = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const py = useTransform(sy, [-0.5, 0.5], [-14, 14]);
  const bx = useTransform(sx, [-0.5, 0.5], [30, -30]);

  useEffect(() => {
    if (reduce) return undefined;
    const t = setInterval(() => setPhase((p) => (p + 1) % heroPhases.length), 1800);
    return () => clearInterval(t);
  }, [reduce]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section onMouseMove={onMove} aria-labelledby="s360-hero-title" className="s360-hero relative isolate overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40">
      <div className="ui-mesh" aria-hidden="true" />
      <motion.div style={{ x: bx }} className="ui-grid" aria-hidden="true" />
      <ParticleField color="0,87,216" density={0.00006} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="s360-pill">
            <Sparkles size={14} className="text-[var(--color-accent)]" aria-hidden="true" />
            <span>The startup operating system</span>
            <span className="s360-pill__phase" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.span key={phase} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.3 }} className="inline-block">
                  {heroPhases[phase]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.h1
            id="s360-hero-title"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="mt-7 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-[var(--color-text)] sm:text-6xl lg:text-[4.6rem]"
          >
            Your entire startup,
            <br />
            <span className="ui-gradient-text">in one orbit.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: EASE }} className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text-muted)]">
            Startup360 brings strategy, registration, brand, product engineering, AI, marketing, automation and funding support into one team, one roadmap and one contract. Bring the idea. We build the company around it.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: EASE }} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton to={CTA.start}>Start Your Startup <ArrowRight size={16} /></MagneticButton>
            <MagneticButton to={CTA.consult} variant="ghost"><CalendarDays size={16} /> Book Consultation</MagneticButton>
            <MagneticButton onClick={() => setDemo(true)} variant="link" aria-haspopup="dialog">
              <span className="s360-play"><Play size={12} fill="currentColor" /></span> Watch Demo
            </MagneticButton>
          </motion.div>

          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-[var(--color-border)] pt-6">
            {[['12', 'stages, one team'], ['~12 wks', 'idea to launch'], ['100%', 'IP owned by you']].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-2xl font-extrabold tracking-tight text-[var(--color-text)]">{v}</dd>
                <dd className="mt-1 text-xs font-medium text-[var(--color-text-subtle)]">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.2, ease: EASE }}>
          <Orbit px={px} py={py} />
        </motion.div>
      </div>

      <DemoModal open={demo} onClose={closeDemo} />
    </section>
  );
}

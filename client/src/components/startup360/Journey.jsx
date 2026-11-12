import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { Check } from 'lucide-react';
import { EASE, Eyebrow } from './primitives';
import { journey } from './data';

export default function Journey() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(journey.length - 1, Math.max(0, Math.floor(v * journey.length)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const jumpTo = (i) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.5) / journey.length), behavior: 'smooth' });
  };

  const stage = journey[active];
  const Icon = stage.icon;

  return (
    <section ref={ref} aria-labelledby="s360-journey-title" className="relative bg-[var(--color-bg-surface)]" style={{ height: `${journey.length * 55 + 60}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-4 pb-6 pt-24 sm:px-6 lg:px-8">
        <div className="ui-dots" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Active stage */}
          <div>
            <Eyebrow>The founder journey</Eyebrow>
            <h2 id="s360-journey-title" className="mt-4 font-display text-3xl font-extrabold tracking-[-0.035em] text-[var(--color-text)] sm:text-[2.6rem] sm:leading-[1.08]">
              Twelve stages. <span className="text-[var(--color-text-subtle)]">Zero hand-offs.</span>
            </h2>

            {/* mobile progress */}
            <div className="mt-6 flex gap-1 lg:hidden" aria-hidden="true">
              {journey.map((s, i) => (
                <span key={s.id} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= active ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border-strong)]'}`} />
              ))}
            </div>

            <div className="relative mt-6 min-h-[340px] sm:mt-8">
              <AnimatePresence mode="wait">
                <motion.article
                  key={stage.id}
                  initial={{ opacity: 0, y: 40, rotateX: -12 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -30, rotateX: 10 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="s360-stage-card"
                  aria-live="polite"
                >
                  <span className="s360-stage-card__num" aria-hidden="true">{String(active + 1).padStart(2, '0')}</span>
                  <div className="relative flex items-center gap-4">
                    <div className="ui-icon-tile"><Icon size={22} aria-hidden="true" /></div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">{stage.time}</p>
                      <h3 className="font-display text-2xl font-extrabold text-[var(--color-text)] sm:text-3xl">{stage.title}</h3>
                    </div>
                  </div>
                  <p className="relative mt-5 font-display text-lg font-semibold text-[var(--color-text)]">{stage.summary}</p>
                  <p className="relative mt-2 leading-relaxed text-[var(--color-text-muted)]">{stage.detail}</p>
                  <ul className="relative mt-6 flex flex-wrap gap-2">
                    {stage.deliverables.map((d, i) => (
                      <motion.li key={d} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.08 }} className="ui-tag">
                        <Check size={13} aria-hidden="true" /> {d}
                      </motion.li>
                    ))}
                  </ul>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>

          {/* Rail */}
          <nav aria-label="Journey stages" className="relative hidden lg:block">
            <div className="absolute bottom-3 left-[15px] top-3 w-[2px] rounded-full bg-[var(--color-border)]" aria-hidden="true" />
            <motion.div className="absolute left-[15px] top-3 w-[2px] origin-top rounded-full bg-gradient-to-b from-[#0057D8] via-[#4080FF] to-[#8B5CF6]" style={{ scaleY: fill, bottom: 12 }} aria-hidden="true" />
            <ol className="relative space-y-0.5">
              {journey.map((s, i) => {
                const on = i === active;
                const done = i < active;
                const SIcon = s.icon;
                return (
                  <li key={s.id}>
                    <button type="button" onClick={() => jumpTo(i)} aria-current={on ? 'step' : undefined} className={`group flex w-full items-center gap-4 rounded-xl px-0 py-1 text-left transition-colors ${on ? '' : 'hover:bg-[var(--color-bg)]/60'}`}>
                      <motion.span
                        animate={{ scale: on ? 1.12 : 1 }}
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${on ? 'border-[#0057D8] bg-[#0057D8] text-white shadow-[0_0_0_6px_rgba(0,87,216,0.12)]' : done ? 'border-[#0057D8] bg-[var(--color-bg)] text-[#0057D8]' : 'border-[var(--color-border-strong)] bg-[var(--color-bg)] text-[var(--color-text-subtle)]'}`}
                      >
                        <SIcon size={14} aria-hidden="true" />
                      </motion.span>
                      <span className="min-w-0 flex-1">
                        <span className={`block font-display text-[15px] font-bold transition-colors ${on ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]'}`}>{s.title}</span>
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="block overflow-hidden text-sm text-[var(--color-text-subtle)]">
                              {s.summary}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                      <span className="text-[11px] font-semibold text-[var(--color-text-subtle)]">{s.time}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}

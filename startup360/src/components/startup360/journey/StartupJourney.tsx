'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getGsap } from '@/animations/gsap';
import { easeOutExpo } from '@/animations/variants';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { journey } from '@/content/startup360';
import { cn } from '@/lib/utils';

const phaseOf = (i: number) => (i < 4 ? 'Discover' : i < 8 ? 'Build' : 'Grow');

/**
 * A pinned, scroll-scrubbed journey: the section is tall, its stage is sticky,
 * and GSAP ScrollTrigger maps scroll progress → active stage. The active
 * stage expands in the rail and takes over the stage panel.
 */
export function StartupJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const { ScrollTrigger } = getGsap();
    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setProgress(self.progress);
        setActive(Math.min(journey.length - 1, Math.floor(self.progress * journey.length)));
      },
    });
    return () => st.kill();
  }, []);

  const jumpTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const span = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.5) / journey.length), behavior: 'smooth' });
  };

  const stage = journey[active]!;
  const Icon = stage.icon;

  return (
    <section id="journey" aria-labelledby="journey-title" className="relative pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="journey-title"
          eyebrow="The startup journey"
          title={
            <>
              Twelve stages. <span className="text-gradient">One continuous motion.</span>
            </>
          }
          description="Most founders stitch these stages together across a dozen vendors. Scroll — and watch how Startup360 carries your company through every one of them."
        />
      </div>

      <div ref={trackRef} style={{ height: `${journey.length * 62}vh` }} className="relative mt-16">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[320px_1fr] lg:gap-14 lg:px-8">
            {/* Rail */}
            <ol className="relative hidden lg:block" aria-label="Journey stages">
              <span aria-hidden className="absolute bottom-3 left-[15px] top-3 w-px bg-line" />
              <span
                aria-hidden
                className="absolute left-[15px] top-3 w-px bg-gradient-to-b from-brand to-violet transition-[height] duration-300"
                style={{ height: `calc(${progress * 100}% - 12px)` }}
              />
              {journey.map((s, i) => {
                const done = i < active;
                const isActive = i === active;
                return (
                  <li key={s.id} className="relative">
                    <button
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-current={isActive ? 'step' : undefined}
                      className="group flex w-full items-start gap-4 py-1.5 text-left"
                    >
                      <span
                        className={cn(
                          'relative z-10 grid size-[31px] shrink-0 place-items-center rounded-full border text-[11px] font-mono transition-all duration-500',
                          isActive && 'scale-110 border-brand bg-brand text-[#05070d] shadow-[0_0_24px_var(--glow)]',
                          done && 'border-brand/50 bg-surface text-brand',
                          !isActive && !done && 'border-line bg-surface text-subtle',
                        )}
                      >
                        {done ? <Check className="size-3.5" aria-hidden /> : String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 pt-1">
                        <span className={cn('block text-sm font-medium transition-colors', isActive ? 'text-fg' : 'text-subtle group-hover:text-muted')}>
                          {s.title}
                        </span>
                        <motion.span
                          initial={false}
                          animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.45, ease: easeOutExpo }}
                          className="block overflow-hidden text-xs leading-relaxed text-muted"
                        >
                          <span className="block pt-1">{phaseOf(i)} phase</span>
                        </motion.span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Stage */}
            <div className="relative">
              {/* Mobile progress */}
              <div className="mb-6 flex items-center gap-3 lg:hidden">
                <span className="font-mono text-xs text-brand">
                  {String(active + 1).padStart(2, '0')}/{journey.length}
                </span>
                <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-line">
                  <span className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand to-violet" style={{ width: `${progress * 100}%` }} />
                </span>
              </div>

              <div className="border-beam relative overflow-hidden rounded-[32px] bg-surface/80 p-6 shadow-soft backdrop-blur-xl sm:p-10 lg:p-14">
                <span aria-hidden className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[clamp(8rem,20vw,16rem)] font-bold leading-none tracking-tighter text-fg/[0.04]">
                  {String(active + 1).padStart(2, '0')}
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                    transition={{ duration: 0.55, ease: easeOutExpo }}
                    className="relative"
                    aria-live="polite"
                  >
                    <div className="flex items-center gap-4">
                      <span className="relative grid size-16 place-items-center rounded-2xl bg-fg text-bg sm:size-20">
                        <span aria-hidden className="absolute inset-0 rounded-2xl border border-brand animate-pulse-ring" />
                        <Icon className="size-8 sm:size-9" aria-hidden />
                      </span>
                      <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                        {phaseOf(active)} · Stage {active + 1}
                      </span>
                    </div>
                    <h3 className="mt-8 font-display text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">{stage.title}</h3>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{stage.summary}</p>
                    <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                      {stage.outputs.map((o, i) => (
                        <motion.li
                          key={o}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: easeOutExpo }}
                          className="flex items-center gap-2.5 rounded-2xl border border-line bg-bg/60 px-4 py-3 text-sm"
                        >
                          <span className="grid size-5 place-items-center rounded-full bg-teal/15 text-teal">
                            <Check className="size-3" aria-hidden />
                          </span>
                          {o}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next stage preview */}
              <p className="mt-5 text-sm text-subtle">
                {active < journey.length - 1 ? (
                  <>
                    Next → <span className="text-muted">{journey[active + 1]!.title}</span>
                  </>
                ) : (
                  'Every stage, one partner. Keep scrolling.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible static list for screen readers / no-JS indexing */}
      <ol className="sr-only">
        {journey.map((s) => (
          <li key={s.id}>
            {s.title}: {s.summary}
          </li>
        ))}
      </ol>
    </section>
  );
}

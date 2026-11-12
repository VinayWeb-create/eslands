'use client';

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Layers, Sparkles, Target } from 'lucide-react';
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { panelFlip } from '@/animations/variants';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services } from '@/content/startup360';
import { cn } from '@/lib/utils';

export function ServicesExplorer() {
  const [index, setIndex] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const service = services[index]!;
  const Icon = service.icon;

  // 3D tilt
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const glareX = useTransform(sry, [-8, 8], ['20%', '80%']);
  const onTilt = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const resetTilt = () => {
    rx.set(0);
    ry.set(0);
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    const step = keys[e.key];
    if (step === undefined) return;
    e.preventDefault();
    const next = (index + step + services.length) % services.length;
    setIndex(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <Section id="services" labelledBy="services-title" className="overflow-hidden">
      <SectionHeading
        id="services-title"
        eyebrow="Interactive services"
        title={
          <>
            Fourteen disciplines. <span className="text-gradient">Open any of them.</span>
          </>
        }
        description="Choose individual modules or activate the complete ecosystem. Every service ships with the same team, the same standards and the same dashboards."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-[280px_1fr]">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Services"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
        >
          {services.map((s, i) => {
            const SIcon = s.icon;
            const selected = i === index;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                id={`svc-tab-${s.id}`}
                aria-selected={selected}
                aria-controls="svc-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setIndex(i)}
                onKeyDown={onTabKey}
                className={cn(
                  'group relative flex shrink-0 items-center gap-3 rounded-2xl px-4 py-2.5 text-left text-sm transition-colors lg:py-3',
                  selected ? 'text-fg' : 'text-muted hover:text-fg',
                )}
              >
                {selected ? (
                  <motion.span layoutId="svc-active" className="glass absolute inset-0 rounded-2xl shadow-soft" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                ) : null}
                <SIcon className={cn('relative size-4 transition-colors', selected && 'text-brand')} aria-hidden />
                <span className="relative font-medium">{s.name}</span>
                <ArrowRight className={cn('relative ml-auto hidden size-4 transition-all lg:block', selected ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0')} aria-hidden />
              </button>
            );
          })}
        </div>

        <div className="[perspective:1600px]" onPointerMove={onTilt} onPointerLeave={resetTilt}>
          <motion.div style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }} className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={service.id}
                id="svc-panel"
                role="tabpanel"
                aria-labelledby={`svc-tab-${service.id}`}
                variants={panelFlip}
                initial="enter"
                animate="center"
                exit="exit"
                className="border-beam relative overflow-hidden rounded-[32px] bg-surface p-6 shadow-soft sm:p-10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(600px_circle_at_var(--gx)_0%,var(--glow),transparent_55%)]"
                  style={{ ['--gx' as string]: glareX }}
                />
                <div className="relative grid gap-10 xl:grid-cols-[1.1fr_1fr]" style={{ transform: 'translateZ(40px)' }}>
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="grid size-14 place-items-center rounded-2xl bg-fg text-bg">
                        <Icon className="size-6" aria-hidden />
                      </span>
                      <span className="font-mono text-xs text-subtle">
                        {String(index + 1).padStart(2, '0')} / {services.length}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{service.name}</h3>
                    <p className="mt-3 text-lg text-muted">{service.tagline}</p>

                    <h4 className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                      <Layers className="size-3.5" aria-hidden /> Features
                    </h4>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {service.features.map((f, i) => (
                        <motion.li
                          key={f}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.06 }}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden /> {f}
                        </motion.li>
                      ))}
                    </ul>

                    <h4 className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                      <Sparkles className="size-3.5" aria-hidden /> Benefits
                    </h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {service.benefits.map((b) => (
                        <li key={b} className="rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
                          {b}
                        </li>
                      ))}
                    </ul>

                    <h4 className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-subtle">Tech stack</h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {service.stack.map((t) => (
                        <li key={t} className="rounded-lg border border-line bg-bg/60 px-2.5 py-1 font-mono text-xs text-muted">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col">
                    <div className="relative flex-1 rounded-3xl border border-line bg-bg/50 p-6">
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
                        <Target className="size-3.5" aria-hidden /> Engagement pattern
                      </p>
                      <ol className="relative mt-5 space-y-5 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-line">
                        {(
                          [
                            ['Problem', service.pattern.problem, 'var(--danger)'],
                            ['Solution', service.pattern.solution, 'var(--violet)'],
                            ['Result', service.pattern.result, 'var(--teal)'],
                          ] as const
                        ).map(([label, text, color], i) => (
                          <motion.li
                            key={label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.12 }}
                            className="relative pl-7"
                          >
                            <span className="absolute left-0 top-1 size-[15px] rounded-full border-2 bg-surface" style={{ borderColor: color }} />
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>
                              {label}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed">{text}</p>
                          </motion.li>
                        ))}
                      </ol>
                      <p className="mt-6 text-[11px] text-subtle">Representative engagement pattern — not a named client result.</p>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <MagneticButton href="#contact">
                        Discuss {service.name} <ArrowUpRight className="size-4" aria-hidden />
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

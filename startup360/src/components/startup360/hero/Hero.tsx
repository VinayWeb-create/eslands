'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, CalendarDays, PlayCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useCallback, useState, type PointerEvent } from 'react';
import { easeOutExpo, fadeUp, stagger } from '@/animations/variants';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { hero } from '@/content/startup360';
import { polarPoints } from '@/lib/utils';
import { DemoDialog } from './DemoDialog';

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => (
    <div aria-hidden className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)]" />
  ),
});

const chipPositions = polarPoints(hero.orbit.length, 46, 50, 50);

export function Hero() {
  const { resolvedTheme } = useTheme();
  const [demoOpen, setDemoOpen] = useState(false);
  const closeDemo = useCallback(() => setDemoOpen(false), []);

  // Mouse parallax for the floating chips layer
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 80, damping: 20 });
  const py = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), { stiffness: 80, damping: 20 });
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pt-32"
    >
      {/* Gradient mesh + grid */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-70" />
        <div className="animate-mesh absolute -left-[10%] top-[-10%] size-[55vw] rounded-full bg-brand/20 blur-[120px]" />
        <div className="animate-mesh absolute right-[-15%] top-[20%] size-[50vw] rounded-full bg-violet/20 blur-[120px] [animation-delay:-6s]" />
        <div className="animate-mesh absolute bottom-[-20%] left-[30%] size-[40vw] rounded-full bg-teal/10 blur-[120px] [animation-delay:-12s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <motion.div variants={stagger(0.09, 0.1)} initial="hidden" animate="show" className="relative z-10">
          <motion.p
            variants={fadeUp}
            className="glass inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-4 text-xs font-medium text-muted"
          >
            <span className="rounded-full bg-fg px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-bg">New</span>
            {hero.eyebrow}
          </motion.p>

          <h1 id="hero-title" className="mt-7 font-display text-[clamp(2.75rem,7.5vw,6.25rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
            {hero.title.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={i === 1 ? 'text-gradient block' : 'block'}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: easeOutExpo }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted">
            {hero.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton href="#contact">
              Start your startup <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden />
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              <CalendarDays className="size-4" aria-hidden /> Book consultation
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => setDemoOpen(true)} aria-haspopup="dialog">
              <PlayCircle className="size-5 text-brand" aria-hidden /> Watch demo
            </MagneticButton>
          </motion.div>

          <motion.dl variants={fadeUp} className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
            {hero.proof.map((p) => (
              <div key={p.label}>
                <dt className="sr-only">{p.label}</dt>
                <dd className="font-display text-3xl font-semibold tracking-tight">{p.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-subtle">{p.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Ecosystem visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: easeOutExpo }}
          className="pointer-events-none absolute inset-0 -z-[1] opacity-40 lg:pointer-events-auto lg:relative lg:inset-auto lg:z-0 lg:aspect-square lg:opacity-100"
        >
          <HeroScene key={resolvedTheme ?? 'init'} />
          <motion.ul style={{ x: px, y: py }} className="absolute inset-0 hidden lg:block" aria-label="Startup360 lifecycle">
            {hero.orbit.map((label, i) => {
              const p = chipPositions[i]!;
              return (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.07, type: 'spring', stiffness: 200, damping: 16 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span
                    className="glass animate-float flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium shadow-soft"
                    style={{ animationDelay: `${-i * 0.6}s` }}
                  >
                    <span className="font-mono text-[10px] text-brand">{String(i + 1).padStart(2, '0')}</span>
                    {label}
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <div className="glass grid size-28 place-items-center rounded-full text-center shadow-soft">
              <div>
                <p className="font-display text-2xl font-semibold tracking-tight">360°</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">One team</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#journey"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-subtle sm:flex"
      >
        Scroll the journey
        <span className="relative h-10 w-[1px] overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-brand"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </a>

      <DemoDialog open={demoOpen} onClose={closeDemo} />
    </section>
  );
}

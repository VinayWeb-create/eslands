'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Quote } from 'lucide-react';
import { useRef, useState } from 'react';
import { easeOutExpo } from '@/animations/variants';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { roadmap } from '@/content/startup360';
import { cn } from '@/lib/utils';

const W = 1000;
const H = 140;
const points = roadmap.map((_, i) => ({ x: 50 + i * (900 / (roadmap.length - 1)), y: i % 2 ? 95 : 45 }));
const pathD = points.reduce((d, p, i) => {
  if (i === 0) return `M ${p.x} ${p.y}`;
  const prev = points[i - 1]!;
  const mx = (prev.x + p.x) / 2;
  return `${d} C ${mx} ${prev.y}, ${mx} ${p.y}, ${p.x} ${p.y}`;
}, '');

export function SuccessRoadmap() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(trackRef, { once: true, margin: '-100px' });
  const m = roadmap[index]!;
  const progress = index / (roadmap.length - 1);

  const go = (delta: number) => setIndex((i) => Math.min(roadmap.length - 1, Math.max(0, i + delta)));

  return (
    <Section id="roadmap" labelledBy="roadmap-title" className="overflow-hidden">
      <SectionHeading
        id="roadmap-title"
        eyebrow="Success roadmap"
        title={
          <>
            From your first customer <span className="text-gradient">to your millionth.</span>
          </>
        }
        description="Wherever your business is today, pick the milestone that sounds like you. Startup360 meets you there — and walks the rest of the road with you."
      />

      <div ref={trackRef} className="-mx-4 mt-6 overflow-x-auto px-4 py-12 [scrollbar-width:none]">
        <div className="relative mx-auto min-w-[760px] max-w-6xl">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
            <path d={pathD} fill="none" stroke="var(--line-strong)" strokeWidth={2} strokeDasharray="2 8" strokeLinecap="round" />
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#road-grad)"
              strokeWidth={4}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: inView ? Math.max(progress, 0.001) : 0 }}
              transition={{ duration: 0.9, ease: easeOutExpo }}
              style={{ filter: 'drop-shadow(0 0 8px var(--glow))' }}
            />
            <defs>
              <linearGradient id="road-grad" x1="0" x2="1">
                <stop offset="0" stopColor="var(--brand)" />
                <stop offset="1" stopColor="var(--violet)" />
              </linearGradient>
            </defs>
          </svg>
          <ol className="absolute inset-0" aria-label="Roadmap milestones">
            {roadmap.map((ms, i) => {
              const p = points[i]!;
              const reached = i <= index;
              return (
                <li key={ms.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={i === index ? 'step' : undefined}
                    aria-label={`Milestone ${i + 1}: ${ms.title}`}
                    className="group relative grid place-items-center"
                  >
                    {i === index ? <span aria-hidden className="absolute size-10 rounded-full bg-brand/30 animate-pulse-ring" /> : null}
                    <span
                      className={cn(
                        'relative grid size-9 place-items-center rounded-full border font-mono text-xs transition-all duration-300 group-hover:scale-115',
                        i === index && 'scale-110 border-brand bg-brand font-semibold text-[#05070d]',
                        reached && i !== index && 'border-brand/60 bg-surface text-brand',
                        !reached && 'border-line bg-surface text-subtle',
                      )}
                    >
                      {reached && i !== index ? <Check className="size-4" aria-hidden /> : i + 1}
                    </span>
                    <span
                      className={cn(
                        'pointer-events-none absolute w-28 text-center text-[11px] leading-tight transition-opacity',
                        i % 2 ? 'top-11' : 'bottom-11',
                        i === index ? 'font-medium text-fg opacity-100' : 'text-subtle opacity-0 group-hover:opacity-100',
                      )}
                    >
                      {ms.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.article
            key={m.id}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ duration: 0.45, ease: easeOutExpo }}
            className="glass grid gap-8 rounded-[28px] p-6 shadow-soft sm:p-10 md:grid-cols-[1fr_1fr]"
            aria-live="polite"
          >
            <div>
              <p className="font-mono text-xs text-brand">
                Milestone {String(index + 1).padStart(2, '0')} / {roadmap.length}
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{m.title}</h3>
              <blockquote className="mt-6 flex gap-3 rounded-2xl border border-line bg-bg/50 p-4 text-muted">
                <Quote className="size-5 shrink-0 text-violet" aria-hidden />
                <p className="italic">“{m.quote}”</p>
              </blockquote>
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle">What we deliver</p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {m.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden /> {d}
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-2xl bg-teal/10 p-4 text-sm font-medium text-teal">→ {m.outcome}</p>
              <div className="mt-auto flex items-center gap-2 pt-6">
                <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous milestone" className="grid size-10 place-items-center rounded-full border border-line transition hover:bg-fg/5 disabled:opacity-30">
                  <ArrowLeft className="size-4" />
                </button>
                <button type="button" onClick={() => go(1)} disabled={index === roadmap.length - 1} aria-label="Next milestone" className="grid size-10 place-items-center rounded-full border border-line transition hover:bg-fg/5 disabled:opacity-30">
                  <ArrowRight className="size-4" />
                </button>
                <span className="ml-auto h-1 w-32 overflow-hidden rounded-full bg-line">
                  <motion.span className="block h-full bg-gradient-to-r from-brand to-violet" animate={{ width: `${((index + 1) / roadmap.length) * 100}%` }} />
                </span>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </Section>
  );
}

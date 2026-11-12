'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { easeOutExpo } from '@/animations/variants';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { industries } from '@/content/startup360';
import { cn } from '@/lib/utils';
import { IndustryIllustration } from './IndustryIllustration';

function Sparkline({ series }: { series: number[] }) {
  const w = 300;
  const h = 90;
  const max = Math.max(...series);
  const min = Math.min(...series);
  const pts = series.map((v, i) => [(i / (series.length - 1)) * w, h - ((v - min) / (max - min || 1)) * (h - 10) - 5] as const);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--brand)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={`${line} L${w} ${h} L0 ${h} Z`} fill="url(#spark-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
      <motion.path
        d={line}
        fill="none"
        stroke="var(--brand)"
        strokeWidth={2.5}
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: easeOutExpo }}
      />
    </svg>
  );
}

export function IndustrySolutions() {
  const [index, setIndex] = useState(0);
  const industry = industries[index]!;

  return (
    <Section id="industries" labelledBy="industries-title">
      <SectionHeading
        id="industries-title"
        eyebrow="Industry solutions"
        title={
          <>
            Built for the way <span className="text-gradient">your sector works.</span>
          </>
        }
        description="Domain architecture, compliance awareness and growth playbooks for each industry — previewed as the dashboard you could be running."
      />

      <div role="tablist" aria-label="Industries" className="-mx-4 mt-14 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {industries.map((ind, i) => (
          <button
            key={ind.id}
            role="tab"
            id={`ind-tab-${ind.id}`}
            aria-selected={i === index}
            aria-controls="ind-panel"
            onClick={() => setIndex(i)}
            className={cn(
              'relative shrink-0 rounded-full border px-4 py-2 text-sm transition-colors',
              i === index ? 'border-transparent text-bg' : 'border-line text-muted hover:border-line-strong hover:text-fg',
            )}
          >
            {i === index ? <motion.span layoutId="ind-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: 'spring', stiffness: 380, damping: 32 }} /> : null}
            <span className="relative">{ind.name}</span>
          </button>
        ))}
      </div>

      <div id="ind-panel" role="tabpanel" aria-labelledby={`ind-tab-${industry.id}`} className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={industry.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="grid gap-5 lg:grid-cols-[1fr_1.15fr]"
          >
            {/* Story + illustration */}
            <div className="glass relative flex flex-col overflow-hidden rounded-[28px] p-6 shadow-soft sm:p-8">
              <div className="relative mx-auto aspect-[10/7] w-full max-w-sm text-muted">
                <div aria-hidden className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)]" />
                <IndustryIllustration id={industry.id} />
              </div>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">{industry.name}</h3>
              <p className="mt-2 leading-relaxed text-muted">{industry.headline}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {industry.solutions.map((s) => (
                  <li key={s} className="rounded-full border border-line px-3 py-1 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                Plan a {industry.name.toLowerCase()} build <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>

            {/* Dashboard preview */}
            <figure className="relative overflow-hidden rounded-[28px] border border-line bg-surface shadow-soft">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3">
                <span className="size-2.5 rounded-full bg-danger/70" />
                <span className="size-2.5 rounded-full bg-brand/70" />
                <span className="size-2.5 rounded-full bg-teal/70" />
                <span className="ml-3 truncate font-mono text-[11px] text-subtle">app.yourstartup.in/{industry.id}/overview</span>
                <span className="ml-auto flex items-center gap-1 font-mono text-[10px] text-teal">
                  <span className="size-1.5 animate-pulse rounded-full bg-teal" /> live
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 p-5">
                {industry.kpis.map((k, i) => (
                  <motion.div
                    key={k.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="rounded-2xl border border-line bg-bg/50 p-3 sm:p-4"
                  >
                    <p className="truncate text-[11px] text-subtle">{k.label}</p>
                    <p className="mt-1 font-display text-lg font-semibold tracking-tight sm:text-2xl">{k.value}</p>
                  </motion.div>
                ))}
              </div>
              <div className="px-5">
                <div className="rounded-2xl border border-line bg-bg/50 p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">Performance · last 9 weeks</span>
                    <span className="rounded-full bg-teal/10 px-2 py-0.5 font-mono text-teal">
                      +{Math.round(((industry.series.at(-1)! - industry.series[0]!) / industry.series[0]!) * 100)}%
                    </span>
                  </div>
                  <Sparkline series={industry.series} />
                </div>
              </div>
              <div className="grid grid-cols-9 items-end gap-1.5 px-5 pb-5 pt-4" aria-hidden>
                {industry.series.map((v, i) => (
                  <motion.span
                    key={i}
                    className="rounded-md bg-gradient-to-t from-violet/30 to-violet"
                    initial={{ height: 0 }}
                    animate={{ height: `${v * 0.6}px` }}
                    transition={{ delay: 0.2 + i * 0.04, duration: 0.6, ease: easeOutExpo }}
                  />
                ))}
              </div>
              <figcaption className="border-t border-line px-5 py-3 text-[11px] text-subtle">Sample dashboard with illustrative data.</figcaption>
            </figure>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

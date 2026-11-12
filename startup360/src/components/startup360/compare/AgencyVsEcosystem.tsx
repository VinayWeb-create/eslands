'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Clock, Receipt } from 'lucide-react';
import { useState } from 'react';
import { easeOutExpo } from '@/animations/variants';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { comparison, fragmentedVendors } from '@/content/startup360';
import { cn, polarPoints } from '@/lib/utils';

const W = 400;
const H = 360;

// Deliberately irregular positions for the broken side
const scattered = [
  { x: 70, y: 60 },
  { x: 230, y: 40 },
  { x: 340, y: 110 },
  { x: 60, y: 190 },
  { x: 200, y: 165 },
  { x: 330, y: 250 },
  { x: 110, y: 300 },
  { x: 250, y: 310 },
];
const brokenLinks: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [3, 4], [4, 2], [4, 5], [3, 6], [6, 7], [7, 5],
];

const healthyNodes = polarPoints(8, 135, W / 2, H / 2);
const healthyLabels = ['Design', 'Full-stack', 'Cloud', 'AI', 'Marketing', 'Mobile', 'Talent', 'Security'];

function BrokenEcosystem() {
  return (
    <div className="relative aspect-[10/9] w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
        {brokenLinks.map(([a, b], i) => {
          const p = scattered[a]!;
          const q = scattered[b]!;
          const mx = (p.x + q.x) / 2;
          const my = (p.y + q.y) / 2;
          // Two segments with a gap in the middle → visibly broken
          const gx = (q.x - p.x) * 0.08;
          const gy = (q.y - p.y) * 0.08;
          return (
            <g key={i} className="animate-jitter" style={{ animationDelay: `${i * 0.13}s`, transformOrigin: `${mx}px ${my}px` }}>
              <line x1={p.x} y1={p.y} x2={mx - gx} y2={my - gy} stroke="var(--danger)" strokeOpacity={0.45} strokeDasharray="3 5" />
              <line x1={mx + gx} y1={my + gy} x2={q.x} y2={q.y} stroke="var(--danger)" strokeOpacity={0.45} strokeDasharray="3 5" />
              <path d={`M ${mx - 5} ${my - 5} L ${mx + 5} ${my + 5} M ${mx + 5} ${my - 5} L ${mx - 5} ${my + 5}`} stroke="var(--danger)" strokeWidth={1.6} />
            </g>
          );
        })}
      </svg>
      {fragmentedVendors.map((v, i) => {
        const p = scattered[i]!;
        return (
          <span
            key={v}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-danger/30 bg-surface px-2 py-1 text-[10px] font-medium text-muted shadow-soft sm:text-xs"
            style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%`, rotate: `${(i % 2 ? 1 : -1) * (2 + (i % 3))}deg` }}
          >
            {v}
          </span>
        );
      })}
      {/* Floating pain points */}
      <span className="animate-float absolute left-[2%] top-[42%] flex items-center gap-1 rounded-md bg-danger/10 px-2 py-1 font-mono text-[10px] text-danger">
        <Receipt className="size-3" aria-hidden /> INV-04 overdue
      </span>
      <span className="animate-float absolute right-[2%] top-[2%] flex items-center gap-1 rounded-md bg-danger/10 px-2 py-1 font-mono text-[10px] text-danger [animation-delay:-2s]">
        <Clock className="size-3" aria-hidden /> +6 wks delay
      </span>
      <span className="animate-float absolute bottom-[2%] left-[40%] flex items-center gap-1 rounded-md bg-danger/10 px-2 py-1 font-mono text-[10px] text-danger [animation-delay:-4s]">
        <AlertTriangle className="size-3" aria-hidden /> Who owns this bug?
      </span>
    </div>
  );
}

function HealthyEcosystem() {
  return (
    <div className="relative aspect-[10/9] w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
        <circle cx={W / 2} cy={H / 2} r={135} fill="none" stroke="var(--line-strong)" />
        {healthyNodes.map((p, i) => {
          const d = `M ${W / 2} ${H / 2} L ${p.x} ${p.y}`;
          return (
            <g key={i}>
              <path id={`h-${i}`} d={d} stroke="var(--teal)" strokeOpacity={0.6} strokeWidth={1.4} className="animate-dash" fill="none" />
              <circle r={3.5} fill="var(--teal)">
                <animateMotion dur="1.8s" repeatCount="indefinite" begin={`${i * 0.22}s`} keyPoints="0;1" keyTimes="0;1">
                  <mpath href={`#h-${i}`} />
                </animateMotion>
              </circle>
              <circle r={2.5} fill="var(--brand)">
                <animateMotion dur="1.8s" repeatCount="indefinite" begin={`${i * 0.22 + 0.9}s`} keyPoints="1;0" keyTimes="0;1">
                  <mpath href={`#h-${i}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}
      </svg>
      <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-fg text-center text-bg shadow-[0_0_50px_-5px_var(--teal)]">
        <span className="text-[11px] font-semibold leading-tight">
          1 team
          <br />
          <span className="font-mono text-[9px] opacity-70">1 backlog</span>
        </span>
      </span>
      {healthyLabels.map((l, i) => {
        const p = healthyNodes[i]!;
        return (
          <span
            key={l}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-teal/40 bg-surface px-2.5 py-1 text-[10px] font-medium shadow-soft sm:text-xs"
            style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
          >
            {l}
          </span>
        );
      })}
    </div>
  );
}

export function AgencyVsEcosystem() {
  const [pillar, setPillar] = useState(0);
  const row = comparison[pillar]!;

  return (
    <Section id="compare" labelledBy="compare-title">
      <SectionHeading
        id="compare-title"
        eyebrow="Why fragmented agencies slow you down"
        title={
          <>
            Eight vendors, eight invoices.
            <br className="hidden sm:block" /> <span className="text-gradient">Or one connected team.</span>
          </>
        }
        description="Founders lose runway juggling disconnected freelancers and agencies. Startup360 consolidates strategy, technology and growth under one operating model."
      />

      <div className="mt-16 grid gap-5 lg:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="relative overflow-hidden rounded-[28px] border border-danger/20 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--danger)_6%,transparent),transparent)] p-6 sm:p-8"
        >
          <header className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-danger">The traditional way</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">Disconnected & expensive</h3>
            </div>
            <span className="rounded-full bg-danger/10 px-3 py-1 font-mono text-xs text-danger">4–7 vendors</span>
          </header>
          <BrokenEcosystem />
          <ul className="grid gap-2 text-sm text-muted sm:grid-cols-3">
            <li className="rounded-xl border border-line p-3"><b className="block text-fg">Finger-pointing</b>No single owner</li>
            <li className="rounded-xl border border-line p-3"><b className="block text-fg">Stacked retainers</b>Runway burned</li>
            <li className="rounded-xl border border-line p-3"><b className="block text-fg">Handover delays</b>Weeks per revision</li>
          </ul>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="border-beam relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--teal)_7%,transparent),transparent)] p-6 sm:p-8"
        >
          <header className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal">Startup360 by Onebridge</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">Connected & accountable</h3>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 font-mono text-xs text-teal">
              <span className="size-1.5 animate-pulse rounded-full bg-teal" /> healthy
            </span>
          </header>
          <HealthyEcosystem />
          <ul className="grid gap-2 text-sm text-muted sm:grid-cols-3">
            <li className="rounded-xl border border-line p-3"><b className="block text-fg">One vision</b>Shared KPIs</li>
            <li className="rounded-xl border border-line p-3"><b className="block text-fg">Lower overhead</b>No agency markups</li>
            <li className="rounded-xl border border-line p-3"><b className="block text-fg">Rapid iteration</b>Days, not months</li>
          </ul>
        </motion.article>
      </div>

      {/* Pillar-by-pillar */}
      <div className="glass mt-5 rounded-[28px] p-4 shadow-soft sm:p-6">
        <div role="tablist" aria-label="Comparison pillars" className="flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none]">
          {comparison.map((c, i) => (
            <button
              key={c.pillar}
              role="tab"
              id={`pillar-tab-${i}`}
              aria-selected={i === pillar}
              aria-controls="pillar-panel"
              onClick={() => setPillar(i)}
              className={cn(
                'relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors',
                i === pillar ? 'text-bg' : 'text-muted hover:text-fg',
              )}
            >
              {i === pillar ? <motion.span layoutId="pillar-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: 'spring', stiffness: 380, damping: 32 }} /> : null}
              <span className="relative">{c.pillar}</span>
            </button>
          ))}
        </div>
        <div id="pillar-panel" role="tabpanel" aria-labelledby={`pillar-tab-${pillar}`} className="mt-4 grid gap-3 md:grid-cols-2">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={`t-${pillar}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex gap-3 rounded-2xl border border-danger/20 p-5">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden />
              <p className="text-muted"><span className="sr-only">Traditional agencies: </span>{row.traditional}</p>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={`s-${pillar}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ delay: 0.05 }} className="flex gap-3 rounded-2xl border border-teal/30 bg-teal/5 p-5">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
              <p><span className="sr-only">Startup360: </span>{row.startup360}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

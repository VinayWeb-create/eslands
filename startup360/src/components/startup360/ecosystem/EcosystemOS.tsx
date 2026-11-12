'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { easeOutExpo } from '@/animations/variants';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { osModules, type Accent } from '@/content/startup360';
import { cn, polarPoints } from '@/lib/utils';

const SIZE = 800;
const C = SIZE / 2;
const RADIUS = 315;
const nodes = polarPoints(osModules.length, RADIUS, C, C);

const accentVar: Record<Accent, string> = { brand: 'var(--brand)', violet: 'var(--violet)', teal: 'var(--teal)' };

/**
 * The Startup360 "operating system": Onebridge at the kernel, every
 * capability a process wired into it. Hover / focus a module to trace its
 * connection; hover the kernel to light the entire system.
 */
export function EcosystemOS() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [allLit, setAllLit] = useState(false);
  const active = osModules.find((m) => m.id === activeId) ?? null;
  const isLit = (id: string) => allLit || activeId === id;

  return (
    <Section id="ecosystem" labelledBy="os-title" className="overflow-hidden">
      <SectionHeading
        id="os-title"
        eyebrow="Startup360 operating system"
        title={
          <>
            Not a vendor list. <span className="text-gradient">An operating system.</span>
          </>
        }
        description="Eleven capabilities share one backlog, one data layer and one set of KPIs — with Onebridge at the kernel keeping every process in sync."
      />

      <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_360px]">
        <div className="relative mx-auto aspect-square w-full max-w-[680px]">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full" aria-hidden>
            <defs>
              <radialGradient id="os-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* orbit rings */}
            {[RADIUS, RADIUS - 110, RADIUS + 50].map((r, i) => (
              <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="var(--line-strong)" strokeDasharray={i === 0 ? undefined : '2 8'} />
            ))}
            <circle cx={C} cy={C} r={allLit ? 220 : 160} fill="url(#os-core)" style={{ transition: 'r .6s' }} />
            {/* spokes */}
            {nodes.map((p, i) => {
              const m = osModules[i]!;
              const lit = isLit(m.id);
              const d = `M ${p.x} ${p.y} L ${C} ${C}`;
              return (
                <g key={m.id}>
                  <path d={d} stroke="var(--line-strong)" strokeWidth={1} />
                  <path
                    id={`spoke-${m.id}`}
                    d={d}
                    stroke={accentVar[m.accent]}
                    strokeWidth={lit ? 2.5 : 1.2}
                    strokeOpacity={lit ? 1 : 0.5}
                    className="animate-dash"
                    style={{ transition: 'stroke-width .3s, stroke-opacity .3s', filter: lit ? `drop-shadow(0 0 6px ${accentVar[m.accent]})` : undefined }}
                    fill="none"
                  />
                  <circle r={lit ? 5 : 3} fill={accentVar[m.accent]}>
                    <animateMotion dur={`${2.4 + (i % 4) * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.3}s`}>
                      <mpath href={`#spoke-${m.id}`} />
                    </animateMotion>
                  </circle>
                </g>
              );
            })}
            {/* neighbour arcs */}
            {nodes.map((p, i) => {
              const n = nodes[(i + 1) % nodes.length]!;
              return <line key={i} x1={p.x} y1={p.y} x2={n.x} y2={n.y} stroke="var(--line)" />;
            })}
          </svg>

          {/* Kernel */}
          <button
            type="button"
            onPointerEnter={() => setAllLit(true)}
            onPointerLeave={() => setAllLit(false)}
            onFocus={() => setAllLit(true)}
            onBlur={() => setAllLit(false)}
            aria-label="Onebridge core — highlight every connected capability"
            className="absolute left-1/2 top-1/2 z-10 grid size-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
          >
            <span aria-hidden className="absolute inset-0 rounded-full border border-brand/50 animate-pulse-ring" />
            <span aria-hidden className="absolute inset-0 rounded-full border border-violet/40 animate-pulse-ring [animation-delay:1.2s]" />
            <span
              className={cn(
                'border-beam relative grid size-full place-items-center rounded-full bg-surface text-center shadow-soft transition-transform duration-500',
                allLit && 'scale-105',
              )}
            >
              <span>
                <span className="block font-display text-[clamp(0.85rem,2.6vw,1.5rem)] font-semibold tracking-tight">Onebridge</span>
                <span className="block font-mono text-[clamp(0.45rem,1.2vw,0.65rem)] uppercase tracking-[0.2em] text-brand">Kernel · 360</span>
              </span>
            </span>
          </button>

          {/* Modules */}
          <ul aria-label="Connected capabilities">
            {osModules.map((m, i) => {
              const p = nodes[i]!;
              const lit = isLit(m.id);
              const Icon = m.icon;
              return (
                <li key={m.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(p.x / SIZE) * 100}%`, top: `${(p.y / SIZE) * 100}%` }}>
                  <motion.button
                    type="button"
                    onPointerEnter={() => setActiveId(m.id)}
                    onFocus={() => setActiveId(m.id)}
                    onClick={() => setActiveId(m.id)}
                    aria-pressed={activeId === m.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 200, damping: 15 }}
                    className="group flex flex-col items-center gap-1.5"
                  >
                    <span
                      className={cn(
                        'glass grid size-10 place-items-center rounded-2xl transition-all duration-300 sm:size-14',
                        lit && 'scale-110',
                      )}
                      style={lit ? { boxShadow: `0 0 0 1px ${accentVar[m.accent]}, 0 0 32px -4px ${accentVar[m.accent]}` } : undefined}
                    >
                      <Icon className="size-4 sm:size-5" style={{ color: lit ? accentVar[m.accent] : undefined }} aria-hidden />
                    </span>
                    <span className={cn('text-[10px] font-medium transition-colors sm:text-xs', lit ? 'text-fg' : 'text-muted')}>{m.label}</span>
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Inspector */}
        <div className="glass relative min-h-56 rounded-3xl p-7 shadow-soft" aria-live="polite">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Process inspector</p>
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div key={active.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: easeOutExpo }}>
                <div className="mt-5 flex items-center gap-3">
                  <span className="size-2.5 rounded-full" style={{ background: accentVar[active.accent], boxShadow: `0 0 12px ${accentVar[active.accent]}` }} />
                  <h3 className="font-display text-2xl font-semibold tracking-tight">{active.label}</h3>
                </div>
                <p className="mt-3 leading-relaxed text-muted">{active.detail}</p>
                <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-line p-3">
                    <dt className="text-xs text-subtle">Status</dt>
                    <dd className="mt-1 flex items-center gap-1.5 font-medium text-teal">
                      <span className="size-1.5 animate-pulse rounded-full bg-teal" /> Synced
                    </dd>
                  </div>
                  <div className="rounded-2xl border border-line p-3">
                    <dt className="text-xs text-subtle">Shares</dt>
                    <dd className="mt-1 font-medium">Backlog · Data · KPIs</dd>
                  </div>
                </dl>
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">{allLit ? 'All systems synchronised' : 'Select a module'}</h3>
                <p className="mt-3 leading-relaxed text-muted">
                  Hover or tap any capability to trace how it plugs into the kernel. Hover the core to light up the whole system.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

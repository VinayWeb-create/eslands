import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SectionHeading, EASE } from './primitives';
import { osModules } from './data';

const R = 40; // node radius in % of the square stage

export default function OperatingSystem() {
  const [hover, setHover] = useState(null); // module id | 'core' | null
  const reduce = useReducedMotion();
  const all = hover === 'core';
  const focus = osModules.find((m) => m.id === hover);
  const n = osModules.length;

  const nodes = osModules.map((m, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { ...m, x: 50 + Math.cos(a) * R, y: 50 + Math.sin(a) * R };
  });

  return (
    <section aria-labelledby="s360-os-title" className="ui-dark relative overflow-hidden py-24 sm:py-32">
      <div className="ui-dark-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="dark" id="s360-os-title" eyebrow="Startup360 operating system"
          title={<>Eleven capabilities. <span className="ui-gradient-text--dark">One core.</span></>}
          sub="Every module shares the same data, the same team and the same roadmap. Hover the core to see the whole system light up, or a module to see what it does."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_320px]">
          <div className="relative mx-auto aspect-square w-full max-w-[640px]" onMouseLeave={() => setHover(null)}>
            {/* connection lines */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <radialGradient id="s360-os-halo"><stop offset="0%" stopColor="#4080FF" stopOpacity="0.35" /><stop offset="100%" stopColor="#4080FF" stopOpacity="0" /></radialGradient>
              </defs>
              <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth="0.25" strokeDasharray="0.6 1.2" />
              <circle cx="50" cy="50" r="22" fill="url(#s360-os-halo)" opacity={all ? 1 : 0.5} style={{ transition: 'opacity .4s' }} />
              {nodes.map((m, i) => {
                const lit = all || hover === m.id;
                const next = nodes[(i + 1) % n];
                return (
                  <g key={m.id}>
                    <line x1="50" y1="50" x2={m.x} y2={m.y} stroke={lit ? m.color : 'rgba(148,163,184,0.18)'} strokeWidth={lit ? 0.45 : 0.22} style={{ transition: 'stroke .3s, stroke-width .3s' }} />
                    <line x1="50" y1="50" x2={m.x} y2={m.y} stroke={m.color} strokeWidth="0.5" strokeDasharray="1.5 6" className={reduce ? '' : 's360-flow'} style={{ opacity: lit ? 1 : 0.45, animationDelay: `${-i * 0.37}s` }} />
                    {all && <line x1={m.x} y1={m.y} x2={next.x} y2={next.y} stroke={m.color} strokeOpacity="0.4" strokeWidth="0.25" />}
                    {!reduce && (
                      <circle r={lit ? 0.9 : 0.6} fill={m.color}>
                        <animateMotion dur={`${2.4 + (i % 4) * 0.5}s`} repeatCount="indefinite" path={`M${m.x},${m.y} L50,50`} />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* core */}
            <button
              type="button"
              onMouseEnter={() => setHover('core')} onFocus={() => setHover('core')} onBlur={() => setHover(null)}
              className={`s360-os-core ${all ? 's360-os-core--lit' : ''}`}
              aria-label="Startup360 core: connects every module"
            >
              <span className="s360-core__pulse" aria-hidden="true" />
              <span className="relative z-10 block text-center">
                <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-sky-200 sm:text-[10px]">Esland</span>
                <span className="block font-display text-base font-extrabold text-white sm:text-xl">Startup360</span>
              </span>
            </button>

            {/* module nodes */}
            {nodes.map((m) => {
              const lit = all || hover === m.id;
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  type="button"
                  onMouseEnter={() => setHover(m.id)} onFocus={() => setHover(m.id)} onBlur={() => setHover(null)}
                  className="s360-os-node group"
                  style={{ left: `${m.x}%`, top: `${m.y}%`, '--c': m.color }}
                  data-lit={lit || undefined}
                  aria-label={`${m.label}: ${m.desc}`}
                >
                  <span className="s360-os-node__icon"><Icon size={18} aria-hidden="true" /></span>
                  <span className="s360-os-node__label">{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* detail panel */}
          <div className="ui-dark-panel min-h-[220px] rounded-3xl p-7" aria-live="polite">
            <AnimatePresence mode="wait">
              {focus ? (
                <motion.div key={focus.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: EASE }}>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${focus.color}22`, color: focus.color, boxShadow: `0 0 30px ${focus.color}55` }}>
                    <focus.icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-extrabold text-white">{focus.label}</h3>
                  <p className="mt-2 leading-relaxed text-slate-400">{focus.desc}</p>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Shares data with all {n - 1} other modules</p>
                </motion.div>
              ) : (
                <motion.div key="core" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease: EASE }}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">{all ? 'Whole system' : 'How it works'}</p>
                  <h3 className="mt-3 font-display text-2xl font-extrabold text-white">{all ? 'Everything connected.' : 'One brain, many hands.'}</h3>
                  <p className="mt-3 leading-relaxed text-slate-400">
                    A lead captured by marketing lands in the CRM, triggers automation, is answered by AI and shows up in analytics, without anyone copying data between tools or teams.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

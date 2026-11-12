import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { SectionHeading, reveal } from './primitives';
import { growthStations } from './data';

const fmt = new Intl.NumberFormat('en-IN');

/** Numbers that keep ticking while the engine is on screen. */
function useLiveCounters(active) {
  const [vals, setVals] = useState(() => growthStations.map((s) => s.base));
  useEffect(() => {
    if (!active) return undefined;
    const t = setInterval(() => {
      setVals((v) => v.map((x, i) => x + Math.round(growthStations[i].step * (0.5 + Math.random()))));
    }, 900);
    return () => clearInterval(t);
  }, [active]);
  return vals;
}

export default function GrowthEngine() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-100px' });
  const reduce = useReducedMotion();
  const vals = useLiveCounters(inView && !reduce);

  return (
    <section ref={ref} aria-labelledby="s360-engine-title" className="ui-dark relative overflow-hidden py-24 sm:py-32">
      <div className="ui-dark-glow ui-dark-glow--right" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="dark" id="s360-engine-title" eyebrow="The growth engine"
          title={<>Traffic in. <span className="ui-gradient-text--dark">Revenue out.</span></>}
          sub="Seven systems wired together so every visitor is captured, nurtured, answered and measured. The numbers below are a live simulation of how data moves through the engine."
        />

        <motion.div {...reveal(0.1)} className="relative mt-16">
          {/* pipe */}
          <div className="s360-pipe" aria-hidden="true">
            {!reduce && Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className="s360-pipe__packet" style={{ animationDelay: `${i * 0.7}s` }} />
            ))}
          </div>

          <ol className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7 lg:gap-3">
            {growthStations.map((s, i) => {
              const Icon = s.icon;
              const last = i === growthStations.length - 1;
              return (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.6 }}
                  className={`s360-station ${last ? 's360-station--revenue sm:col-span-2 lg:col-span-1' : ''}`}
                >
                  <span className="s360-station__icon" style={{ animationDelay: `${i * 0.35}s` }}><Icon size={20} aria-hidden="true" /></span>
                  <span className="mt-4 block text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Step {i + 1}</span>
                  <span className="block font-display text-lg font-extrabold text-white">{s.label}</span>
                  <span className="mt-3 block font-mono text-lg font-bold tabular-nums text-sky-300">{fmt.format(vals[i])}</span>
                  <span className="block text-xs text-slate-500">{s.metric}</span>
                </motion.li>
              );
            })}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Flag, Trophy } from 'lucide-react';
import { EASE, SectionHeading } from './primitives';
import { roadmap } from './data';

export default function Roadmap() {
  const [sel, setSel] = useState(0);
  const pct = (sel / (roadmap.length - 1)) * 100;
  const m = roadmap[sel];

  return (
    <section aria-labelledby="s360-road-title" className="relative overflow-hidden bg-[var(--color-bg-surface)] py-24 sm:py-32">
      <div className="ui-dots" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="s360-road-title" eyebrow="Success roadmap" title="From day one to scale-ready in twelve months." sub="Click a milestone to see what is true about your company by then." />

        {/* track */}
        <div className="scrollbar-hide -mx-4 mt-16 overflow-x-auto px-4 pb-4">
          <div className="relative min-w-[720px] pt-2">
            <div className="absolute left-[28px] right-[28px] top-[30px] h-1 rounded-full bg-[var(--color-border)]" aria-hidden="true" />
            <motion.div className="absolute left-[28px] top-[30px] h-1 rounded-full bg-gradient-to-r from-[#003087] via-[#0057D8] to-[#8B5CF6]" animate={{ width: `calc((100% - 56px) * ${pct / 100})` }} transition={{ duration: 0.7, ease: EASE }} aria-hidden="true" />
            <ol className="relative flex justify-between" aria-label="Milestones">
              {roadmap.map((r, i) => {
                const on = i === sel;
                const done = i < sel;
                return (
                  <li key={r.title} className="flex w-14 flex-col items-center">
                    <button type="button" onClick={() => setSel(i)} aria-pressed={on} aria-label={`${r.when}: ${r.title}`} className="group flex flex-col items-center">
                      <motion.span
                        whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}
                        className={`relative flex h-[60px] w-[60px] items-center justify-center rounded-full border-4 border-[var(--color-bg-surface)] text-sm font-extrabold transition-colors duration-300 ${on ? 'bg-[#0057D8] text-white shadow-[0_0_0_6px_rgba(0,87,216,0.15),0_10px_30px_rgba(0,87,216,0.35)]' : done ? 'bg-[#003087] text-white' : 'bg-[var(--color-bg)] text-[var(--color-text-subtle)] shadow-card group-hover:text-[#0057D8]'}`}
                      >
                        {on && <span className="absolute inset-0 animate-ping rounded-full bg-[#0057D8]/30" aria-hidden="true" />}
                        {i === roadmap.length - 1 ? <Trophy size={18} /> : i === 0 ? <Flag size={18} /> : i + 1}
                      </motion.span>
                      <span className={`mt-3 whitespace-nowrap text-xs font-bold uppercase tracking-wider ${on ? 'text-[#0057D8]' : 'text-[var(--color-text-subtle)]'}`}>{r.when}</span>
                      <span className={`mt-0.5 whitespace-nowrap text-[13px] font-semibold ${on ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)]'}`}>{r.title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-8" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={sel} initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease: EASE }} className="ui-glass mx-auto grid max-w-4xl gap-6 rounded-3xl p-7 sm:grid-cols-[1fr_auto] sm:items-center sm:p-9">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">{m.when} · Milestone {sel + 1} of {roadmap.length}</p>
                <h3 className="mt-2 font-display text-2xl font-extrabold text-[var(--color-text)] sm:text-3xl">{m.title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--color-text-muted)]">{m.body}</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-[#003087] to-[#0057D8] p-5 text-white sm:w-56">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-sky-200">You'll have</p>
                <p className="mt-1 font-display text-lg font-extrabold leading-snug">{m.outcome}</p>
                <div className="mt-4 h-1.5 rounded-full bg-white/20"><motion.div className="h-full rounded-full bg-white" initial={{ width: 0 }} animate={{ width: `${Math.round(((sel + 1) / roadmap.length) * 100)}%` }} transition={{ duration: 0.7 }} /></div>
                <p className="mt-1.5 text-[11px] text-sky-100">{Math.round(((sel + 1) / roadmap.length) * 100)}% of the roadmap</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

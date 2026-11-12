import { useId, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { EASE, SectionHeading } from './primitives';
import { faqCategories, faqs } from './data';

function Item({ f, open, onToggle }) {
  const id = useId();
  return (
    <div className={`s360-faq ${open ? 's360-faq--open' : ''}`}>
      <h3>
        <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={id} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left">
          <span className="font-display text-base font-bold text-[var(--color-text)] sm:text-lg">{f.q}</span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }} className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${open ? 'bg-[#0057D8] text-white' : 'bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]'}`}>
            <Plus size={16} aria-hidden="true" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={id} role="region" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden">
            <p className="px-6 pb-6 leading-relaxed text-[var(--color-text-muted)]">{f.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(faqs[0].q);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return faqs.filter((f) => (cat === 'All' || f.cat === cat) && (!term || `${f.q} ${f.a}`.toLowerCase().includes(term)));
  }, [q, cat]);

  return (
    <section id="faq" aria-labelledby="s360-faq-title" className="relative bg-[var(--color-bg-surface)] py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="s360-faq-title" eyebrow="FAQ" title="Questions founders ask us." />

        <div className="mt-12">
          <label className="s360-search">
            <Search size={18} className="text-[var(--color-text-subtle)]" aria-hidden="true" />
            <span className="sr-only">Search questions</span>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions…" className="w-full border-0 bg-transparent p-0 text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:ring-0" />
          </label>

          <div className="scrollbar-hide -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by category">
            {faqCategories.map((c) => (
              <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${cat === c ? 'text-white' : 'border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}>
                {cat === c && <motion.span layoutId="s360-faq-cat" className="absolute inset-0 rounded-full bg-[#003087]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-8 space-y-3">
          <AnimatePresence initial={false}>
            {list.map((f) => (
              <motion.div key={f.q} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.25 }}>
                <Item f={f} open={open === f.q} onToggle={() => setOpen(open === f.q ? null : f.q)} />
              </motion.div>
            ))}
          </AnimatePresence>
          {list.length === 0 && (
            <p className="rounded-2xl border border-dashed border-[var(--color-border-strong)] p-8 text-center text-[var(--color-text-muted)]">
              No questions match "{q}". Ask us directly on a free consultation call.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

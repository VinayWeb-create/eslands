'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Search, X } from 'lucide-react';
import { useDeferredValue, useId, useMemo, useState } from 'react';
import { easeOutExpo } from '@/animations/variants';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqCategories, faqs } from '@/content/startup360';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

type Category = (typeof faqCategories)[number];

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="rounded bg-brand/25 px-0.5 text-inherit">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export function FaqSection() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [open, setOpen] = useState<string | null>(faqs[0]!.q);
  const deferred = useDeferredValue(query.trim());
  const baseId = useId();

  const results = useMemo(() => {
    const q = deferred.toLowerCase();
    return faqs.filter(
      (f) => (category === 'All' || f.category === category) && (!q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)),
    );
  }, [deferred, category]);

  return (
    <Section id="faq" labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-[380px_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            align="left"
            eyebrow="Questions founders ask"
            title="Frequently asked questions"
            description="Clear answers on consulting, registration assistance, funding readiness, technology and growth support."
          />
          <p className="mt-6 text-sm text-muted">
            Still unsure?{' '}
            <a href={site.whatsapp} className="font-semibold text-brand underline-offset-4 hover:underline">
              WhatsApp the founder line
            </a>
            .
          </p>
        </div>

        <div>
          <div className="glass flex items-center gap-3 rounded-2xl px-4 shadow-soft focus-within:border-brand">
            <Search className="size-4 shrink-0 text-subtle" aria-hidden />
            <label htmlFor={`${baseId}-search`} className="sr-only">
              Search questions
            </label>
            <input
              id={`${baseId}-search`}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search — try “MVP”, “DPIIT” or “funding”"
              className="h-14 w-full bg-transparent text-base outline-none placeholder:text-subtle [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="grid size-8 place-items-center rounded-full hover:bg-fg/5">
                <X className="size-4" />
              </button>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {faqCategories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                  category === c ? 'border-fg bg-fg text-bg' : 'border-line text-muted hover:text-fg',
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            {results.length} {results.length === 1 ? 'question' : 'questions'} shown
          </p>

          <motion.ul layout className="mt-6 divide-y divide-line border-y border-line">
            <AnimatePresence initial={false}>
              {results.map((f) => {
                const isOpen = open === f.q;
                const id = `${baseId}-${faqs.indexOf(f)}`;
                return (
                  <motion.li key={f.q} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    <h3>
                      <button
                        type="button"
                        id={`${id}-btn`}
                        aria-expanded={isOpen}
                        aria-controls={`${id}-panel`}
                        onClick={() => setOpen(isOpen ? null : f.q)}
                        className="group flex w-full items-start gap-4 py-5 text-left"
                      >
                        <span className="flex-1 text-base font-medium leading-snug sm:text-lg">
                          <Highlight text={f.q} query={deferred} />
                        </span>
                        <span className={cn('mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-line-strong', isOpen && 'rotate-45 border-brand bg-brand text-[#05070d]')}>
                          <Plus className="size-4" aria-hidden />
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={`${id}-panel`}
                          role="region"
                          aria-labelledby={`${id}-btn`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: easeOutExpo }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-muted">
                            <Highlight text={f.a} query={deferred} />
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>

          {results.length === 0 ? (
            <p className="py-10 text-center text-muted">
              No matches for “{query}”. <a href="#contact" className="font-semibold text-brand hover:underline">Ask us directly →</a>
            </p>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

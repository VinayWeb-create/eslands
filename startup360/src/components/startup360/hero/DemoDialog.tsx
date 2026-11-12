'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { journey } from '@/content/startup360';
import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
}

const STEP_MS = 2600;

/**
 * "Watch demo" — an auto-playing, in-code walkthrough of the Startup360
 * lifecycle. No video asset needed; pausable and keyboard accessible.
 */
export function DemoDialog({ open, onClose }: Props) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    setIndex(0);
    setPlaying(true);
    closeRef.current?.focus();
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % journey.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + journey.length) % journey.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      lastFocus.current?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !playing) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % journey.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [open, playing, index]);

  const stage = journey[index]!;
  const Icon = stage.icon;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="border-beam relative w-full max-w-3xl overflow-hidden rounded-[28px] bg-surface p-6 shadow-soft sm:p-10"
          >
            <div className="flex items-center justify-between">
              <p id="demo-title" className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Startup360 · 60-second walkthrough
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? 'Pause walkthrough' : 'Play walkthrough'}
                  className="grid size-9 place-items-center rounded-full border border-line hover:bg-fg/5"
                >
                  {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                </button>
                <button ref={closeRef} type="button" onClick={onClose} aria-label="Close walkthrough" className="grid size-9 place-items-center rounded-full border border-line hover:bg-fg/5">
                  <X className="size-4" />
                </button>
              </div>
            </div>

            <div className="relative mt-8 grid min-h-64 items-center gap-8 sm:grid-cols-[200px_1fr]" aria-live="polite">
              <div className="relative mx-auto grid size-44 place-items-center">
                <span className="absolute inset-0 rounded-full border border-brand/40 animate-pulse-ring" aria-hidden />
                <span className="absolute inset-4 rounded-full border border-violet/30" aria-hidden />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage.id}
                    initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.6, opacity: 0, rotate: 20 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                    className="grid size-24 place-items-center rounded-3xl bg-fg text-bg"
                  >
                    <Icon className="size-10" aria-hidden />
                  </motion.div>
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={stage.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                  <p className="font-mono text-xs text-brand">
                    Stage {String(index + 1).padStart(2, '0')} / {journey.length}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{stage.title}</h3>
                  <p className="mt-3 text-muted">{stage.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {stage.outputs.map((o) => (
                      <li key={o} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                        {o}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex gap-1" role="tablist" aria-label="Walkthrough stages">
              {journey.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={s.title}
                  onClick={() => setIndex(i)}
                  className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-line"
                >
                  {i === index ? (
                    <motion.span
                      key={`${index}-${playing}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-brand"
                      initial={{ width: playing ? '0%' : '100%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: playing ? STEP_MS / 1000 : 0, ease: 'linear' }}
                    />
                  ) : (
                    <span className={cn('absolute inset-y-0 left-0 rounded-full bg-brand', i < index ? 'w-full' : 'w-0')} />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

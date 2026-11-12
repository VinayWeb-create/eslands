'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

const nav = [
  { href: '#journey', label: 'Journey' },
  { href: '#ecosystem', label: 'Ecosystem' },
  { href: '#services', label: 'Services' },
  { href: '#industries', label: 'Industries' },
  { href: '#faq', label: 'FAQ' },
] as const;

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <div
        className={cn(
          'mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full px-3 pl-5 transition-all duration-500',
          scrolled ? 'glass shadow-soft' : 'border border-transparent',
        )}
      >
        <a href={site.links.home} className="flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-tight">
          <span aria-hidden className="relative grid size-7 place-items-center rounded-lg bg-fg text-bg">
            <span className="text-xs font-bold">O</span>
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-brand" />
          </span>
          Onebridge <span className="text-muted">/ Startup360</span>
        </a>

        <nav aria-label="Startup360 sections" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-3.5 py-2 text-sm text-muted transition hover:bg-fg/5 hover:text-fg">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden h-10 items-center gap-1.5 rounded-full bg-fg px-4 text-sm font-semibold text-bg transition hover:opacity-90 sm:inline-flex"
          >
            Book consultation <ArrowUpRight className="size-4" aria-hidden />
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Startup360 sections"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="glass mx-auto mt-2 max-w-7xl rounded-3xl p-3 shadow-soft lg:hidden"
          >
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-base font-medium hover:bg-fg/5">
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 block rounded-2xl bg-fg px-4 py-3 text-center font-semibold text-bg">
              Book consultation
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

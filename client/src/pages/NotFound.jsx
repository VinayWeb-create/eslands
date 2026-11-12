import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { EASE, MagneticButton, ParticleField } from '../components/ui/primitives';

const shortcuts = [
  { label: 'Services', to: '/services' },
  { label: 'Products', to: '/products' },
  { label: 'Startup360', to: '/startup360' },
  { label: 'Contact', to: '/contact' },
];

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[86vh] place-items-center overflow-hidden px-5 pb-24 pt-32 text-center">
      <div className="ui-mesh" aria-hidden="true" />
      <div className="ui-grid" aria-hidden="true" />
      <ParticleField density={0.00006} color="0,87,216" className="z-0 opacity-50" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10"
      >
        <p aria-hidden="true" className="select-none font-display text-[7rem] font-extrabold leading-none tracking-[-0.06em] sm:text-[11rem]">
          <span className="ui-gradient-text">404</span>
        </p>
        <span className="ui-eyebrow mt-2"><Compass size={13} /> Page not found</span>
        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-[-0.035em] text-[var(--color-text)] sm:text-5xl">This page has moved.</h1>
        <p className="mx-auto mt-5 max-w-md text-[var(--color-text-muted)]">The address does not point to an available Esland IT Solutions page.</p>
        <div className="mt-9">
          <MagneticButton to="/">Return home <ArrowRight size={16} /></MagneticButton>
        </div>
        <nav aria-label="Popular pages" className="mt-8 flex flex-wrap justify-center gap-2">
          {shortcuts.map((s) => (
            <MagneticButton key={s.to} to={s.to} variant="ghost" className="ui-btn--sm">{s.label}</MagneticButton>
          ))}
        </nav>
      </motion.div>
    </section>
  );
}

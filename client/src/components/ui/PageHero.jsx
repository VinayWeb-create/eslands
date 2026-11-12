import { motion } from 'framer-motion';
import { EASE, ParticleField } from './primitives';

/**
 * Shared banner for inner pages: gradient mesh, masked grid, soft particle
 * network, eyebrow pill, display headline with an optional gradient phrase,
 * and an optional actions/stats slot underneath.
 */
export default function PageHero({ eyebrow, title, highlight, sub, children, align = 'center', className = '' }) {
  const center = align === 'center';
  return (
    <section className={`relative isolate overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg)] ${className}`}>
      <div className="ui-mesh" aria-hidden="true" />
      <div className="ui-grid" aria-hidden="true" />
      <ParticleField density={0.00005} color="0,87,216" linkDist={110} className="z-0 opacity-40" />
      <div className={`relative z-10 mx-auto max-w-5xl px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 ${center ? 'text-center' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {eyebrow && (
            <span className="ui-eyebrow">
              <span className="ui-eyebrow__dot" aria-hidden="true" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-6 font-display text-[2.4rem] font-extrabold leading-[1.04] tracking-[-0.04em] text-[var(--color-text)] sm:text-6xl lg:text-7xl">
            {title}
            {highlight && (
              <>
                {' '}
                <span className="ui-gradient-text inline-block pb-1">{highlight}</span>
              </>
            )}
          </h1>
          {sub && (
            <p className={`mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg ${center ? 'mx-auto' : ''}`}>
              {sub}
            </p>
          )}
        </motion.div>
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="mt-9"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

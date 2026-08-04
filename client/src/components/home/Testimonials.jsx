import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, Quote, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import { useAccessibleAnimations } from '../../lib/animations';

const testimonials = [
  {
    name: 'Usman', client: 'Mobile Bitz, Dartford', industry: 'Retail Enterprise',
    title: 'Outstanding Results & SEO Dominance',
    quote: 'Esland IT Solutions engineered custom web & SEO infrastructure that propelled us to the top rankings on search engines. Their dedicated support and technical precision drive consistent client growth.',
    image: '/images/mobile_bitz.png', rating: 5,
  },
  {
    name: 'Sami', client: 'Kingsburry School', industry: 'Education Sector',
    title: 'Genuine Solution-Oriented Partnership',
    quote: 'Esland genuinely evaluates business objectives to build high-availability software. Professional team, enterprise security standards, and seamless delivery every time.',
    image: '/images/kingsburry_school.png', rating: 5,
  },
  {
    name: 'Ukrani', client: 'Private Technology Client', industry: 'Enterprise Consulting',
    title: 'Exceptional Engineering Quality',
    quote: 'Fantastic architectural design and execution from Esland. They handled complete backend integration and deployment while keeping our leadership team updated with full transparency.',
    image: '/chel-4.png', rating: 5,
  },
  {
    name: 'Rupeesh', client: 'Flower Paradise', industry: 'E-Commerce Platform',
    title: 'Accelerated Revenue & Lead Conversion',
    quote: 'Delighted with our enterprise storefront and continuous cloud optimization. We saw an immediate surge in international orders and smooth customer checkout experiences.',
    image: '/images/flower_paradise.png', rating: 5,
  },
  {
    name: 'Gaurav', client: 'Ash Groove', industry: 'Real Estate & Infrastructure',
    title: 'Seamless Legacy Migration',
    quote: 'Esland transferred our legacy portals to modern serverless infrastructure within record turnaround time. Zero downtime, zero data loss, and incredible speed.',
    image: '/images/ash_groove.png', rating: 5,
  },
  {
    name: 'Pat', client: 'Ilford Kitchens', industry: 'Manufacturing & Supply',
    title: '40% Growth in High-Value Sales',
    quote: 'Substantial increase in qualified enterprise leads and organic traffic. Esland IT Solutions has contributed directly to a 40% growth in our annual revenues.',
    image: '/images/ilford_kitchens.png', rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);
  const { fadeUp, slideInLeft, slideInRight, prefersReducedMotion } = useAccessibleAnimations();

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const t = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, [paused, prefersReducedMotion]);

  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((p) => (p + 1) % testimonials.length);

  const t = testimonials[active];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-0 px-6 bg-[var(--color-bg)] border-t border-[var(--color-border)]"
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute right-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-accent-500/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span {...fadeUp} className="section-badge mb-4 inline-flex">
            <Star size={13} fill="currentColor" /> Executive Endorsements
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.22,1,0.36,1] }}
            className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight"
          >
            Trusted By Business Leaders &{' '}
            <span className="text-shimmer">Technology Directors</span>
          </motion.h2>
        </div>

        {/* Testimonial block */}
        <div
          className="grid gap-8 lg:grid-cols-[1fr_1.7fr] items-stretch max-w-6xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left — client image */}
          <motion.div {...slideInLeft} className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="relative h-[260px] sm:h-[320px] w-full"
                >
                  <img
                    src={t.image || '/chel-4.png'}
                    alt={t.client}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.target.src = '/chel-4.png'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Industry badge */}
                  <div className="absolute bottom-5 left-5">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/95 border border-[var(--color-border)] text-xs font-bold text-gray-800 shadow">
                      <Briefcase size={13} className="text-[#003087]" />
                      {t.industry}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Trust badges */}
            <div className="flex gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2 text-xs font-semibold text-gray-600 dark:text-slate-300 shadow-sm">
                <Star size={13} className="text-amber-400" fill="currentColor" /> 5.0 Rating Standard
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2 text-xs font-semibold text-gray-600 dark:text-slate-300 shadow-sm">
                <CheckCircle2 size={13} className="text-success-500" /> Verified Reviews
              </span>
            </div>
          </motion.div>

          {/* Right — quote card */}
          <motion.div {...slideInRight} className="relative flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4 }}
                className="relative flex flex-col flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 sm:p-12 shadow-card overflow-hidden"
              >
                {/* Decorative quote icon */}
                <Quote
                  size={80}
                  className="absolute right-8 top-8 text-primary-100 dark:text-white/[0.04] pointer-events-none"
                />
                {/* Gradient corner */}
                <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-bl from-primary-50/60 dark:from-primary-900/10 to-transparent rounded-bl-full pointer-events-none" />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={18} className="text-amber-400" fill="currentColor" />
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-gray-900 dark:text-white mb-5 leading-snug">
                  &ldquo;{t.title}&rdquo;
                </h3>

                {/* Quote */}
                <p className="text-gray-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed flex-1 mb-8">
                  {t.quote}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-[var(--color-border)]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#003087] text-white font-extrabold text-lg shadow">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                    <p className="text-xs text-[#003087] font-semibold mt-0.5">{t.client}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-between mt-6 px-1">
              {/* Dots */}
              <div className="flex gap-2.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-400 ${
                      active === i
                        ? 'w-8 bg-[#003087]'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="h-11 w-11 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-[#003087] transition-all duration-200 active:scale-95"
                >
                  <ChevronLeft size={19} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="h-11 w-11 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-[#003087] transition-all duration-200 active:scale-95"
                >
                  <ChevronRight size={19} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

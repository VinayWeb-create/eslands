import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, Quote, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import { useAccessibleAnimations } from '../../lib/animations';

export interface Testimonial {
  name: string;
  client: string;
  industry: string;
  title: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  { name: 'Usman', client: 'Mobile Bitz, Dartford', industry: 'Retail Enterprise', title: 'Outstanding Results & SEO Dominance', quote: 'Esland IT Solutions engineered custom web & SEO infrastructure that propelled us to the top rankings on search engines. Their dedicated support and technical precision drive consistent client growth.', image: '/images/mobile_bitz.png' },
  { name: 'Sami', client: 'Kingsburry School', industry: 'Education Sector', title: 'Genuine Solution-Oriented Partnership', quote: 'Esland genuinely evaluates business objectives to build high-availability software. Professional team, enterprise security standards, and seamless delivery every time.', image: '/images/kingsburry_school.png' },
  { name: 'Ukrani', client: 'Private Technology Client', industry: 'Enterprise Consulting', title: 'Exceptional Engineering Quality', quote: 'Fantastic architectural design and execution from Esland. They handled complete backend integration and deployment while keeping our leadership team updated with full transparency.', image: '/chel-4.png' },
  { name: 'Rupeesh', client: 'Flower Paradise', industry: 'E-Commerce Platform', title: 'Accelerated Revenue & Lead Conversion', quote: 'Delighted with our enterprise storefront and continuous cloud optimization. We saw an immediate surge in international orders and smooth customer checkout experiences.', image: '/images/flower_paradise.png' },
  { name: 'Gaurav', client: 'Ash Groove', industry: 'Real Estate & Infrastructure', title: 'Seamless Legacy Migration', quote: 'Esland transferred our legacy portals to modern serverless infrastructure within record turnaround time. Zero downtime, zero data loss, and incredible speed.', image: '/images/ash_groove.png' },
  { name: 'Pat', client: 'Ilford Kitchens', industry: 'Manufacturing & Supply', title: '40% Growth in High-Value Sales', quote: 'Substantial increase in qualified enterprise leads and organic traffic. Esland IT Solutions has contributed directly to a 40% growth in our annual revenues.', image: '/images/ilford_kitchens.png' }
];

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testPaused, setTestPaused] = useState(false);
  const { fadeUp, prefersReducedMotion } = useAccessibleAnimations();

  useEffect(() => {
    if (testPaused || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [testPaused, prefersReducedMotion]);

  return (
    <section id="testimonials" className="py-28 px-6 relative bg-slate-950 overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute right-1/3 top-1/4 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
            <Star size={13} fill="currentColor" /> Executive Endorsements
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Trusted By Business Leaders & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-purple-400">
              Technology Directors
            </span>
          </h2>
        </div>

        <div
          className="grid gap-8 lg:grid-cols-[1fr_1.6fr] items-stretch max-w-6xl mx-auto"
          onMouseEnter={() => setTestPaused(true)}
          onMouseLeave={() => setTestPaused(false)}
        >
          <motion.div {...fadeUp} className="flex flex-col justify-between h-full w-full">
            <div className="w-full relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/80 p-3 shadow-2xl group transition-all duration-500 hover:border-sky-400/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative h-[280px] sm:h-[340px] w-full rounded-[2.2rem] overflow-hidden"
                >
                  <img
                    src={testimonials[activeTestimonial].image || '/chel-4.png'}
                    alt={`Client ${testimonials[activeTestimonial].client}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-xl border border-white/15 text-white text-xs font-bold shadow-lg">
                      <Briefcase size={14} className="text-sky-400" />
                      {testimonials[activeTestimonial].industry}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-3 flex-wrap justify-center mt-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-xs font-bold text-slate-300 shadow-sm backdrop-blur-md">
                <Star size={14} className="text-amber-400" fill="currentColor" /> 5.0 Rating Standard
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-xs font-bold text-slate-300 shadow-sm backdrop-blur-md">
                <CheckCircle2 size={14} className="text-emerald-400" /> Verified Case Studies
              </div>
            </div>
          </motion.div>

          <div className="relative flex flex-col justify-between h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-[2.5rem] border border-white/10 bg-slate-900/90 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl overflow-hidden flex-1 flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-500/10 to-purple-600/10 rounded-bl-full pointer-events-none" />
                <Quote size={72} className="text-white/[0.04] absolute right-8 top-8 pointer-events-none" />

                <div>
                  <div className="flex gap-1 text-amber-400 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-6 leading-snug">
                    &quot;{testimonials[activeTestimonial].title}&quot;
                  </h3>

                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-10 font-medium">
                    {testimonials[activeTestimonial].quote}
                  </p>
                </div>

                <div className="flex items-center gap-5 pt-6 border-t border-white/10 mt-auto">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white font-black text-xl shadow-lg shadow-sky-500/30">
                    {testimonials[activeTestimonial].name[0]}
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="text-xs text-sky-400 font-semibold mt-0.5">
                      {testimonials[activeTestimonial].client}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-8 px-2">
              <div className="flex gap-3">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      activeTestimonial === i ? 'w-10 bg-gradient-to-r from-sky-400 to-indigo-500 shadow-[0_0_15px_rgba(56,189,248,0.5)]' : 'w-2.5 bg-white/10 hover:bg-white/20'
                    }`}
                    aria-label={`Testimonial slide ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="h-12 w-12 rounded-2xl border border-white/10 bg-slate-900/80 flex items-center justify-center text-white hover:bg-sky-500/20 hover:border-sky-400 transition-all duration-300 active:scale-95"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="h-12 w-12 rounded-2xl border border-white/10 bg-slate-900/80 flex items-center justify-center text-white hover:bg-sky-500/20 hover:border-sky-400 transition-all duration-300 active:scale-95"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

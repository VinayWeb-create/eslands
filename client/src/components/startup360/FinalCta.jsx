import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { EASE, MagneticButton, ParticleField } from './primitives';
import { CTA } from './data';

export default function FinalCta() {
  return (
    <section aria-labelledby="s360-cta-title" className="ui-dark relative isolate overflow-hidden py-28 sm:py-40">
      <ParticleField color="125,170,255" density={0.00012} linkDist={120} />
      <div className="ui-cta-aurora" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-xs font-bold uppercase tracking-[0.24em] text-sky-300">
          Idea → Company → Scale
        </motion.p>
        <motion.h2
          id="s360-cta-title"
          initial={{ opacity: 0, y: 40, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE }}
          className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1] tracking-[-0.045em] text-white sm:text-7xl lg:text-[5.5rem]"
        >
          Let's build your
          <br />
          <span className="ui-gradient-text--dark">startup together.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }} className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-300">
          Book a free consultation with our startup team and leave with clear next steps for your first 90 days.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35, duration: 0.8 }} className="mt-11 flex flex-wrap justify-center gap-3">
          <MagneticButton to={CTA.start} variant="light">Start Your Startup <ArrowRight size={16} /></MagneticButton>
          <MagneticButton to={CTA.consult} variant="ghost-dark"><CalendarDays size={16} /> Book Consultation</MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

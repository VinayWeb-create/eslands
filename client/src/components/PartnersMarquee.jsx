import { motion } from 'framer-motion';

const partners = ['Cloud', 'AI', 'Security', 'Fintech', 'Healthcare', 'Logistics', 'Retail', 'Analytics'];

export default function PartnersMarquee() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow">
      <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ repeat: Infinity, duration: 18, ease: 'linear' }} className="flex min-w-full gap-6">
        {[...partners, ...partners].map((label, index) => (
          <div key={`${label}-${index}`} className="flex h-24 min-w-[180px] items-center justify-center rounded-3xl border border-white/10 bg-surfaceSoft/90 text-sm uppercase tracking-[0.35em] text-slate-300 transition hover:bg-slate-900/90 hover:text-white">
            {label}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

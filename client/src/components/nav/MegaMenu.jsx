import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useAccessibleAnimations } from '../../lib/animations';

export default function MegaMenu({ allServices, serviceIcons, setServicesOpen, setHoveredIndex }) {
  const { prefersReducedMotion } = useAccessibleAnimations();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14, scale: prefersReducedMotion ? 1 : 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 14, scale: prefersReducedMotion ? 1 : 0.96 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[520px] rounded-2xl border border-white/[0.08] bg-slate-900/95 p-6 shadow-2xl shadow-black/40 z-50"
      style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="h-1.5 w-1.5 rounded-full bg-sky-400" />
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400">Our Services</p>
      </div>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.025, delayChildren: prefersReducedMotion ? 0 : 0.03 } } }}
        className="grid grid-cols-2 gap-1.5"
      >
        {allServices.map((s, idx) => {
          const ServiceIcon = serviceIcons[s.icon];
          const colors = [
            { text: 'text-blue-400', hoverText: 'group-hover:text-blue-300', iconHover: 'group-hover:bg-blue-500/20 group-hover:border-blue-500/30', boxHover: 'hover:bg-blue-900/10 hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]' },
            { text: 'text-purple-400', hoverText: 'group-hover:text-purple-300', iconHover: 'group-hover:bg-purple-500/20 group-hover:border-purple-500/30', boxHover: 'hover:bg-purple-900/10 hover:border-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]' },
            { text: 'text-emerald-400', hoverText: 'group-hover:text-emerald-300', iconHover: 'group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30', boxHover: 'hover:bg-emerald-900/10 hover:border-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]' },
            { text: 'text-amber-400', hoverText: 'group-hover:text-amber-300', iconHover: 'group-hover:bg-amber-500/20 group-hover:border-amber-500/30', boxHover: 'hover:bg-amber-900/10 hover:border-amber-500/20 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]' },
            { text: 'text-rose-400', hoverText: 'group-hover:text-rose-300', iconHover: 'group-hover:bg-rose-500/20 group-hover:border-rose-500/30', boxHover: 'hover:bg-rose-900/10 hover:border-rose-500/20 hover:shadow-[0_0_20px_rgba(244,63,94,0.1)]' },
            { text: 'text-cyan-400', hoverText: 'group-hover:text-cyan-300', iconHover: 'group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30', boxHover: 'hover:bg-cyan-900/10 hover:border-cyan-500/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]' },
            { text: 'text-indigo-400', hoverText: 'group-hover:text-indigo-300', iconHover: 'group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30', boxHover: 'hover:bg-indigo-900/10 hover:border-indigo-500/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]' },
            { text: 'text-pink-400', hoverText: 'group-hover:text-pink-300', iconHover: 'group-hover:bg-pink-500/20 group-hover:border-pink-500/30', boxHover: 'hover:bg-pink-900/10 hover:border-pink-500/20 hover:shadow-[0_0_20px_rgba(236,72,153,0.1)]' },
          ];
          const c = colors[idx % colors.length];

          return (
            <motion.div key={s.label} variants={{ hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 8 }, show: { opacity: 1, y: 0 } }}>
              <Link
                to={s.href}
                onClick={() => { setServicesOpen(false); setHoveredIndex(null); }}
                className={`flex items-start gap-3 rounded-xl border border-transparent px-4 py-3 text-sm text-slate-300 transition-all duration-300 group ${c.boxHover}`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.05] ${c.text} transition-colors duration-300 ${c.iconHover}`}>
                  {ServiceIcon ? <ServiceIcon size={18} /> : <span className="text-xs font-bold">{s.label[0]}</span>}
                </div>
                <span className="min-w-0 pt-0.5">
                  <span className={`block font-bold leading-tight text-[13px] text-white transition-colors duration-300 ${c.hoverText}`}>{s.label}</span>
                  <span className="block text-[11px] text-slate-400 group-hover:text-slate-300 mt-1 leading-relaxed">{s.description}</span>
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
      <div className="mt-4 border-t border-white/[0.06] pt-4">
        <Link
          to="/services"
          onClick={() => { setServicesOpen(false); setHoveredIndex(null); }}
          className="flex items-center gap-2 text-[13px] font-bold text-sky-400 hover:text-sky-300 transition-colors"
        >
          View all services <ArrowRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
}

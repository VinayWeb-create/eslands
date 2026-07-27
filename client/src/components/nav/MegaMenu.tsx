import { motion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { useAccessibleAnimations } from '../../lib/animations';

export interface MegaMenuItem {
  label: string;
  href: string;
  icon: string;
  description: string;
}

export interface MegaMenuProps {
  allServices: MegaMenuItem[];
  serviceIcons: Record<string, LucideIcon>;
  setServicesOpen: (open: boolean) => void;
  setHoveredIndex: (index: number | null) => void;
}

export default function MegaMenu({ allServices, serviceIcons, setServicesOpen, setHoveredIndex }: MegaMenuProps) {
  const { prefersReducedMotion } = useAccessibleAnimations();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14, scale: prefersReducedMotion ? 1 : 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 14, scale: prefersReducedMotion ? 1 : 0.96 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[520px] rounded-2xl border border-white/[0.08] bg-slate-900/95 p-6 shadow-2xl shadow-black/40 z-50 backdrop-blur-2xl"
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
        {allServices.map((s) => {
          const ServiceIcon = serviceIcons[s.icon];
          return (
            <motion.div key={s.label} variants={{ hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 8 }, show: { opacity: 1, y: 0 } }}>
              <a
                href={s.href}
                onClick={() => { setServicesOpen(false); setHoveredIndex(null); }}
                className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition-all duration-200 hover:bg-white/[0.06] hover:text-white group"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-sky-400 group-hover:bg-sky-500/10 transition-colors">
                  {ServiceIcon ? <ServiceIcon size={15} /> : <span className="text-xs font-bold">{s.label[0]}</span>}
                </div>
                <span className="min-w-0">
                  <span className="block font-semibold leading-tight text-[13px]">{s.label}</span>
                  <span className="block text-[11px] text-slate-500 group-hover:text-slate-400 mt-0.5">{s.description}</span>
                </span>
              </a>
            </motion.div>
          );
        })}
      </motion.div>
      <div className="mt-4 border-t border-white/[0.06] pt-4">
        <a
          href="/services"
          onClick={() => { setServicesOpen(false); setHoveredIndex(null); }}
          className="flex items-center gap-2 text-[13px] font-bold text-sky-400 hover:text-sky-300 transition-colors"
        >
          View all services <ArrowRight size={13} />
        </a>
      </div>
    </motion.div>
  );
}

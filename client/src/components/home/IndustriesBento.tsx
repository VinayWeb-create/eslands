import { motion } from 'framer-motion';
import { Landmark, Stethoscope, ShoppingBag, Truck, ArrowUpRight, LucideIcon } from 'lucide-react';

export interface IndustryBento {
  title: string;
  desc: string;
  icon: LucideIcon;
  accent: string;
  border: string;
  stat: string;
  statLabel: string;
  colSpan: string;
}

const industries: IndustryBento[] = [
  {
    title: 'Financial Services & Banking',
    desc: 'PCI-DSS compliant cloud infrastructure, automated fraud prevention, and real-time transaction processing.',
    icon: Landmark,
    accent: 'from-sky-500 to-blue-600',
    border: 'hover:border-sky-500/50',
    stat: '$10B+',
    statLabel: 'Secure Transactions',
    colSpan: 'lg:col-span-8',
  },
  {
    title: 'Healthcare & Life Sciences',
    desc: 'HIPAA-compliant telemetry, patient portals, and secure EHR cloud pipelines.',
    icon: Stethoscope,
    accent: 'from-emerald-400 to-teal-600',
    border: 'hover:border-emerald-500/50',
    stat: '100%',
    statLabel: 'Compliance Rate',
    colSpan: 'lg:col-span-4',
  },
  {
    title: 'Retail & Digital Commerce',
    desc: 'Omnichannel web platforms, instant inventory syncing, and peak-load auto-scaling.',
    icon: ShoppingBag,
    accent: 'from-purple-500 to-indigo-600',
    border: 'hover:border-purple-500/50',
    stat: '50M+',
    statLabel: 'Monthly Orders',
    colSpan: 'lg:col-span-4',
  },
  {
    title: 'Logistics & Supply Chain',
    desc: 'IoT fleet tracking, warehouse automation, and predictive route optimization.',
    icon: Truck,
    accent: 'from-cyan-400 to-sky-600',
    border: 'hover:border-cyan-500/50',
    stat: '45%',
    statLabel: 'Efficiency Boost',
    colSpan: 'lg:col-span-8',
  },
];

export default function IndustriesBento() {
  return (
    <section className="py-28 px-6 relative bg-slate-900/60 overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-sky-500/5 blur-[160px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
              Industry Verticals
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Tailored Solutions For <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
                Global Industry Leaders
              </span>
            </h2>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-sky-400 uppercase hover:text-white transition group"
          >
            Explore All Industries <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`${ind.colSpan} group relative rounded-[2.5rem] border border-white/10 bg-slate-900/90 backdrop-blur-xl p-8 sm:p-10 transition-all duration-500 ${ind.border} hover:-translate-y-1.5 hover:shadow-2xl overflow-hidden`}
              >
                <div className={`absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br ${ind.accent} opacity-10 blur-3xl group-hover:opacity-25 transition-opacity duration-500`} />

                <div className="flex flex-col h-full justify-between relative z-10">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${ind.accent} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={24} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-white">{ind.stat}</div>
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{ind.statLabel}</div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xl font-medium">
                      {ind.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-300 transition-colors">
                      Enterprise Compliance SLA
                    </span>
                    <ArrowUpRight size={18} className="text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

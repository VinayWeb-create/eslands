import { motion } from 'framer-motion';
import { Landmark, Stethoscope, ShoppingBag, Truck, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccessibleAnimations } from '../../lib/animations';

const industries = [
  {
    title: 'Financial Services & Banking',
    desc: 'PCI-DSS compliant cloud infrastructure, automated fraud prevention, and real-time transaction processing.',
    icon: Landmark,
    gradient: 'from-primary-500 to-primary-700',
    hoverBorder: 'hover:border-primary-300 dark:hover:border-primary-400/50',
    glow: 'bg-primary-500/10 dark:bg-primary-500/8',
    stat: '$10B+', statLabel: 'Secure Transactions',
    colSpan: 'lg:col-span-8',
  },
  {
    title: 'Healthcare & Life Sciences',
    desc: 'HIPAA-compliant telemetry, patient portals, and secure EHR cloud pipelines.',
    icon: Stethoscope,
    gradient: 'from-success-500 to-teal-600',
    hoverBorder: 'hover:border-success-300 dark:hover:border-emerald-400/50',
    glow: 'bg-success-500/10 dark:bg-emerald-500/8',
    stat: '100%', statLabel: 'Compliance Rate',
    colSpan: 'lg:col-span-4',
  },
  {
    title: 'Retail & Digital Commerce',
    desc: 'Omnichannel web platforms, instant inventory syncing, and peak-load auto-scaling.',
    icon: ShoppingBag,
    gradient: 'from-violet-500 to-indigo-600',
    hoverBorder: 'hover:border-violet-300 dark:hover:border-purple-400/50',
    glow: 'bg-violet-500/10 dark:bg-purple-500/8',
    stat: '50M+', statLabel: 'Monthly Orders',
    colSpan: 'lg:col-span-4',
  },
  {
    title: 'Logistics & Supply Chain',
    desc: 'IoT fleet tracking, warehouse automation, and predictive route optimization.',
    icon: Truck,
    gradient: 'from-accent-500 to-primary-600',
    hoverBorder: 'hover:border-accent-300 dark:hover:border-cyan-400/50',
    glow: 'bg-accent-500/10 dark:bg-cyan-500/8',
    stat: '45%', statLabel: 'Efficiency Boost',
    colSpan: 'lg:col-span-8',
  },
];

export default function IndustriesBento() {
  const { staggerContainer, staggerItem, fadeUp } = useAccessibleAnimations();

  return (
    <section className="py-0 px-6 relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg-surface)]">
      <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary-500/5 blur-[160px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.span {...fadeUp} className="section-badge mb-4 inline-flex">
              Industry Verticals
            </motion.span>
            <motion.h2
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.22,1,0.36,1] }}
              className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight"
            >
              Tailored Solutions For{' '}<br />
              <span className="text-shimmer">Global Industry Leaders</span>
            </motion.h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase hover:text-primary-700 dark:hover:text-white transition group"
          >
            Explore All Industries
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.title}
                variants={staggerItem}
                className={`${ind.colSpan} group relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 sm:p-10 transition-all duration-400 ${ind.hoverBorder} hover:-translate-y-1.5 hover:shadow-card-hover overflow-hidden`}
              >
                {/* Gradient glow */}
                <div className={`absolute -top-20 -right-20 h-48 w-48 rounded-full ${ind.glow} blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none`} />

                <div className="flex flex-col h-full justify-between relative z-10">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${ind.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={24} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-display font-extrabold text-gray-900 dark:text-white">{ind.stat}</div>
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500 mt-0.5">{ind.statLabel}</div>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl font-medium">
                      {ind.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-[var(--color-border)] flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400 dark:text-slate-500 group-hover:text-primary-600 dark:group-hover:text-slate-300 transition-colors">
                      Enterprise Compliance SLA
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-gray-400 dark:text-slate-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

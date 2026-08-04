import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, ShieldCheck, Zap, Lock, CheckCircle2, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccessibleAnimations } from '../../lib/animations';
import CountUp from '../CountUp';

const proofCapabilities = [
  {
    title: 'Enterprise Web & Cloud Engineering',
    category: 'Cloud Architecture',
    metricValue: 40,
    metricPrefix: '+',
    metricSuffix: '%',
    metricLabel: 'Annual Operations Scale',
    quote: '"Their cloud-native web systems handled a 40% surge in transaction throughput while lowering latency by 60%."',
    client: 'Director of Technology @ Ilford Enterprise',
    icon: TrendingUp,
    gradient: 'from-primary-500 to-primary-700',
    link: '/services#web-development',
  },
  {
    title: 'Zero-Trust Cybersecurity & Compliance',
    category: 'Security Operations',
    metricValue: 30,
    metricPrefix: '',
    metricSuffix: ' Days',
    metricLabel: 'ISO 27001 & SOC 2 Audit Readiness',
    quote: '"Implemented automated vulnerability scanning and zero-trust mesh networks to clear audit checkpoints ahead of schedule."',
    client: 'Chief Information Security Officer @ Apex Fintech',
    icon: ShieldCheck,
    gradient: 'from-success-500 to-teal-600',
    link: '/services#networking',
  },
  {
    title: 'High-Throughput Analytics & Streaming Data Platforms',
    category: 'Data Engineering',
    metricValue: 10,
    metricPrefix: 'Sub-',
    metricSuffix: 'ms',
    metricLabel: 'Query Ingestion & Processing Latency',
    quote: '"Esland engineered our real-time streaming analytics, processing over 1.2M messages/sec with zero packet data loss."',
    client: 'Head of Data Platforms @ Global Logistics Corp',
    icon: Zap,
    gradient: 'from-violet-500 to-indigo-600',
    link: '/services#seo-marketing',
  },
  {
    title: 'Zero-Downtime System Modernization',
    category: 'Legacy Transformations',
    metricValue: 100,
    metricPrefix: '',
    metricSuffix: '%',
    metricLabel: 'Data Integrity & Continuous Operations',
    quote: '"Transferred our core ledger and portal systems from legacy architecture to multi-region cloud serverless topology in record time."',
    client: 'VP of Platform Infrastructure @ Ash Groove Digital',
    icon: Lock,
    gradient: 'from-accent-500 to-primary-600',
    link: '/services#redesign',
  },
];

export default function AttributedProofGrid() {
  const { staggerContainer, staggerItem, fadeUp } = useAccessibleAnimations();

  return (
    <section className="py-0 px-6 relative bg-[var(--color-bg-surface)] overflow-hidden border-t border-[var(--color-border)]">
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-primary-500/5 blur-[160px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.span {...fadeUp} className="section-badge mb-4 inline-flex">
              <BarChart3 size={14} /> Attributed Proof & Outcomes
            </motion.span>
            <motion.h2
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.22,1,0.36,1] }}
              className="text-3xl sm:text-5xl font-display font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight"
            >
              Capability Fused With{' '}<br />
              <span className="text-shimmer">Verified Client Outcomes</span>
            </motion.h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-white transition group"
          >
            Inspect All Capabilities
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {proofCapabilities.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="spotlight-card group relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 sm:p-8 flex flex-col justify-between overflow-hidden hover:border-primary-200 dark:hover:border-primary-400/40 hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-400"
              >
                {/* Gradient accent top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`} />
                {/* Decorative background glow */}
                <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-br ${item.gradient} blur-3xl transition-opacity duration-500 pointer-events-none`} style={{ opacity: 0.07 }} />

                <div>
                  {/* Category & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg`}>
                      <Icon size={22} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-400/20 px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 dark:text-white mb-5 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Metric block */}
                  <div className="my-5 p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 dark:text-white">
                        <CountUp end={item.metricValue} prefix={item.metricPrefix} suffix={item.metricSuffix} />
                      </span>
                      <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">{item.metricLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-white transition-colors">
                    View Solution Architecture
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-gray-400 dark:text-slate-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

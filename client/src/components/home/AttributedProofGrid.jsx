import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, ShieldCheck, Zap, Award, CheckCircle2, BarChart3, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const proofCapabilities = [
  {
    title: 'Enterprise Web & Cloud Engineering',
    category: 'Cloud Architecture',
    metric: '+40%',
    metricLabel: 'Annual Revenue Increase',
    quote: '"Their efforts contributed to a 40% increase in our sales through high-converting web architecture."',
    client: 'Pat, Director @ Ilford Kitchens',
    icon: TrendingUp,
    accent: 'from-sky-500 to-blue-600',
    link: '/services#web-development',
  },
  {
    title: 'Zero-Trust Cybersecurity & Compliance',
    category: 'Security Operations',
    metric: '30 Days',
    metricLabel: 'Full PCI-DSS & SOC 2 Audit',
    quote: '"Implemented automated vulnerability scanning and zero-trust mesh networks ahead of schedule."',
    client: 'Chief Risk Officer @ Fintech Client',
    icon: ShieldCheck,
    accent: 'from-emerald-400 to-teal-600',
    link: '/services#networking',
  },
  {
    title: 'Search Engine & Organic Traffic Dominance',
    category: 'SEO & Growth Engine',
    metric: '#1 Rank',
    metricLabel: 'Google & Bing Top Listings',
    quote: '"My site is at the top of Google and Bing, bringing us a continuous stream of new high-value customers."',
    client: 'Usman, Founder @ Mobile Bitz',
    icon: Zap,
    accent: 'from-purple-500 to-indigo-600',
    link: '/services#seo-marketing',
  },
  {
    title: 'Zero-Downtime Infrastructure Migration',
    category: 'System Modernization',
    metric: '100%',
    metricLabel: 'Data Integrity & Zero Downtime',
    quote: '"Transferred our entire portal from legacy Joomla to cloud serverless infrastructure in record time."',
    client: 'Gaurav, Operations Head @ Ash Groove',
    icon: Lock,
    accent: 'from-cyan-400 to-sky-600',
    link: '/services#redesign',
  },
];

export default function AttributedProofGrid() {
  return (
    <section className="py-28 px-6 relative bg-slate-900/60 overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-sky-500/5 blur-[160px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
              <BarChart3 size={14} /> Attributed Proof & Outcomes
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Capability Fused With <br />
              <span className="animate-text-shimmer">
                Verified Client Outcomes
              </span>
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-400 hover:text-white transition group"
          >
            Inspect All Capabilities <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {proofCapabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="spotlight-card group relative rounded-[2.5rem] border border-white/10 bg-slate-900/90 backdrop-blur-2xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden hover:border-sky-400/40 hover:shadow-2xl transition-all duration-500"
              >
                {/* Accent Top Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.accent}`} />

                <div>
                  {/* Category & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-lg`}>
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-sky-400">{item.category}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h3>

                  {/* Fused Attributed Testimonial & Metric */}
                  <div className="my-6 p-5 rounded-2xl border border-white/5 bg-slate-950/60 backdrop-blur-md">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-3xl sm:text-4xl font-black text-white">{item.metric}</span>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.metricLabel}</span>
                    </div>
                    <p className="text-slate-300 text-xs italic leading-relaxed mb-3">
                      {item.quote}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-sky-400">
                      <CheckCircle2 size={13} className="text-emerald-400" />
                      {item.client}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                    View Solution Architecture
                  </span>
                  <ArrowUpRight size={18} className="text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

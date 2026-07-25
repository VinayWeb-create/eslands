import { motion } from 'framer-motion';
import { Building2, Globe, Shield, Zap, Code, Database } from 'lucide-react';

const companies = [
  { name: 'Microsoft', icon: Building2 },
  { name: 'Google', icon: Globe },
  { name: 'Amazon', icon: Shield },
  { name: 'Meta', icon: Zap },
  { name: 'Apple', icon: Code },
  { name: 'Netflix', icon: Database },
  { name: 'Stripe', icon: Building2 },
  { name: 'Shopify', icon: Globe },
  { name: 'Slack', icon: Shield },
  { name: 'Figma', icon: Zap },
  { name: 'Notion', icon: Code },
  { name: 'Linear', icon: Database },
];

export default function TrustedBy() {
  return (
    <section className="relative py-16 overflow-hidden border-y border-white/5 bg-slate-950/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-secondary-500/5 to-accent-500/5" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-4">
            Trusted by industry leaders
          </p>
          <h2 className="text-3xl font-bold text-white">
            Powering <span className="text-gradient-primary">digital transformation</span> worldwide
          </h2>
        </motion.div>

        {/* Logo Carousel */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

          {/* Scrolling container */}
          <motion.div
            className="flex gap-12 py-8"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* First set */}
            {companies.map((company, index) => (
              <motion.div
                key={`${company.name}-1`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-primary-500/30 group-hover:bg-white/10 group-hover:shadow-glow">
                  <company.icon className="w-8 h-8 text-slate-400 group-hover:text-primary-400 transition-colors" />
                  <span className="text-lg font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {company.name}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Duplicate set for seamless loop */}
            {companies.map((company, index) => (
              <motion.div
                key={`${company.name}-2`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-primary-500/30 group-hover:bg-white/10 group-hover:shadow-glow">
                  <company.icon className="w-8 h-8 text-slate-400 group-hover:text-primary-400 transition-colors" />
                  <span className="text-lg font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {company.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-white/10"
        >
          {[
            { value: '500+', label: 'Enterprise Clients' },
            { value: '50+', label: 'Countries Served' },
            { value: '98%', label: 'Client Retention' },
            { value: '24/7', label: 'Global Support' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="text-4xl font-bold text-gradient-primary mb-2"
              >
                {stat.value}
              </motion.div>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

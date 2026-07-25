import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Award, Clock, Shield, Users, Zap, Headphones, CheckCircle, TrendingUp } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Experienced Team',
    description: '15+ years of industry expertise with certified professionals across all major technologies.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Zap,
    title: 'Latest Technologies',
    description: 'We stay ahead with cutting-edge frameworks, cloud platforms, and AI solutions.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Clock,
    title: 'Agile Process',
    description: 'Flexible development methodology that adapts to your changing requirements.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Rigorous testing and quality control to ensure flawless delivery.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Users,
    title: 'Transparent Communication',
    description: 'Regular updates, clear reporting, and dedicated project managers.',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: Headphones,
    title: 'Long-term Support',
    description: '24/7 maintenance, updates, and ongoing partnership for your success.',
    color: 'from-red-500 to-rose-500'
  },
];

function ReasonCard({ reason, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]), {
    stiffness: 100,
    damping: 30
  });
  
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]), {
    stiffness: 100,
    damping: 30
  });

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-primary-500/20">
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${reason.color}`} />
        
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
          className={`relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${reason.color} text-white shadow-lg`}
        >
          <reason.icon className="h-8 w-8" />
        </motion.div>
        
        {/* Content */}
        <h3 className="mb-4 text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-secondary-400 transition-all duration-300">
          {reason.title}
        </h3>
        
        <p className="text-slate-400 leading-relaxed">
          {reason.description}
        </p>
        
        {/* Checkmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="absolute top-6 right-6 h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
        >
          <CheckCircle className="h-5 w-5 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      
      {/* Glow effects */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 mb-6"
          >
            <TrendingUp className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-300">Why Choose Us</span>
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            The <span className="text-gradient-primary">Esland Advantage</span>
          </h2>
          
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Partner with a team that combines technical excellence with business acumen to deliver results that matter.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <ReasonCard key={reason.title} reason={reason} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-xl">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="h-12 w-12 rounded-full border-2 border-slate-950 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-bold"
                >
                  {i}
                </motion.div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-white font-semibold">Join 500+ satisfied clients</p>
              <p className="text-slate-400 text-sm">Start your project today</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

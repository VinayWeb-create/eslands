import { useRef } from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

export default function ServiceCard({ item }) {
  const cardRef = useRef(null);
  const Icon = item.icon;
  const gradientBg = item.iconBg || 'from-sky-500 to-indigo-600';

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <TiltCard
      ref={cardRef}
      as="article"
      maxTilt={10}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="spotlight-card group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-sky-400/50 hover:shadow-[0_30px_60px_-15px_rgba(56,189,248,0.3)] min-h-[350px]"
    >
      {/* Dynamic Animated Gradient Border */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-transparent bg-gradient-to-br from-sky-400/0 via-cyan-400/0 to-purple-500/0 group-hover:from-sky-400/40 group-hover:via-cyan-400/20 group-hover:to-purple-500/40 transition-all duration-700 pointer-events-none z-10" />

      {/* Top Subtle Light Beam */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradientBg} text-white shadow-xl shadow-sky-500/20 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-500`}
          >
            <Icon size={24} />
          </motion.div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-sky-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <Zap size={12} className="text-sky-400" /> Enterprise SLA
          </span>
        </div>

        {/* Content */}
        <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-sky-300 transition-colors duration-300 tracking-tight leading-snug">
          {item.title || item.label}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-slate-400 group-hover:text-slate-200 transition-colors duration-300 line-clamp-3 font-medium">
          {item.text || item.subheading}
        </p>
      </div>

      {/* Card Footer CTA */}
      <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs font-bold text-sky-400 group-hover:text-white uppercase tracking-wider transition-colors">
          Explore Architecture
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-sky-400 group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-indigo-600 group-hover:border-sky-400 group-hover:text-white transition-all duration-300 shadow">
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </TiltCard>
  );
}

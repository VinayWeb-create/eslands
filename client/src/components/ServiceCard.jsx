import { useRef } from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import { ArrowRight, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ServiceCard({ item, index = 0 }) {
  const cardRef    = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const Icon       = item.icon;
  const gradientBg = item.iconBg || 'from-blue-600 to-blue-700';

  const colors = [
    { border: 'rgba(59, 130, 246, 0.4)', shadow: 'rgba(59, 130, 246, 0.2)', bgClass: 'group-hover:bg-blue-500 group-hover:border-blue-500' },
    { border: 'rgba(168, 85, 247, 0.4)', shadow: 'rgba(168, 85, 247, 0.2)', bgClass: 'group-hover:bg-purple-500 group-hover:border-purple-500' },
    { border: 'rgba(16, 185, 129, 0.4)', shadow: 'rgba(16, 185, 129, 0.2)', bgClass: 'group-hover:bg-emerald-500 group-hover:border-emerald-500' },
    { border: 'rgba(245, 158, 11, 0.4)', shadow: 'rgba(245, 158, 11, 0.2)', bgClass: 'group-hover:bg-amber-500 group-hover:border-amber-500' },
    { border: 'rgba(244, 63, 94, 0.4)', shadow: 'rgba(244, 63, 94, 0.2)', bgClass: 'group-hover:bg-rose-500 group-hover:border-rose-500' },
    { border: 'rgba(6, 182, 212, 0.4)', shadow: 'rgba(6, 182, 212, 0.2)', bgClass: 'group-hover:bg-cyan-500 group-hover:border-cyan-500' },
    { border: 'rgba(99, 102, 241, 0.4)', shadow: 'rgba(99, 102, 241, 0.2)', bgClass: 'group-hover:bg-indigo-500 group-hover:border-indigo-500' },
    { border: 'rgba(236, 72, 153, 0.4)', shadow: 'rgba(236, 72, 153, 0.2)', bgClass: 'group-hover:bg-pink-500 group-hover:border-pink-500' },
  ];
  const c = colors[index % colors.length];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <TiltCard
      ref={cardRef}
      as="article"
      maxTilt={6}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="spotlight-card group relative flex flex-col justify-between overflow-hidden transition-all duration-300"
      style={{
        minHeight: '320px',
        padding: '2rem',
        borderRadius: '12px',
        background: isDark ? '#0D1525' : '#FFFFFF',
        border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(21,88,214,0.1)',
        boxShadow: isDark
          ? '0 2px 16px rgba(0,0,0,0.4)'
          : '0 2px 16px rgba(10,15,50,0.06)',
      }}
      onMouseEnter={(e) => {
        if (!e.currentTarget) return;
        e.currentTarget.style.borderColor = c.border;
        e.currentTarget.style.boxShadow = isDark
          ? `0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px ${c.border}`
          : `0 8px 40px ${c.shadow}, 0 0 0 1px ${c.border}`;
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        if (!e.currentTarget) return;
        e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(21,88,214,0.1)';
        e.currentTarget.style.boxShadow = isDark
          ? '0 2px 16px rgba(0,0,0,0.4)'
          : '0 2px 16px rgba(10,15,50,0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Top accent bar — shows on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, #1558D6, #00B4E6, #1558D6)' }}
      />

      {/* Left accent line — permanent */}
      <div
        className="absolute left-0 top-6 bottom-6 w-[2px] rounded-r-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(180deg, #1558D6, transparent)' }}
      />

      {/* Card content */}
      <div className="relative z-10">
        {/* Icon + badge row */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 350, damping: 18 }}
            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradientBg} text-white`}
            style={{ boxShadow: '0 4px 16px rgba(21,88,214,0.3)' }}
          >
            {Icon && <Icon size={22} />}
          </motion.div>

          {/* Enterprise badge */}
          <span
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{
              background: 'rgba(21,88,214,0.08)',
              border: '1px solid rgba(21,88,214,0.2)',
              color: isDark ? '#60a5fa' : '#1558D6',
            }}
          >
            <Zap size={9} /> Enterprise
          </span>
        </div>

        <h3
          className="text-lg font-display font-bold leading-snug mb-3 transition-colors duration-300"
          style={{
            color: isDark ? '#EDF2FF' : '#0A0F1E',
          }}
        >
          {item.title || item.label}
        </h3>
        <p
          className="text-sm leading-relaxed line-clamp-3"
          style={{ color: isDark ? '#6680A0' : '#718096' }}
        >
          {item.text || item.subheading}
        </p>
      </div>

      {/* Card footer CTA */}
      <div
        className="relative z-10 mt-7 pt-5 flex items-center justify-between"
        style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(21,88,214,0.08)' }}
      >
        <span
          className="text-xs font-bold uppercase tracking-widest transition-colors"
          style={{ color: isDark ? '#4B6FBE' : '#1558D6' }}
        >
          Learn More
        </span>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-300 group-hover:text-white ${c.bgClass}`}
          style={{
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(21,88,214,0.15)',
            color: isDark ? '#4B6FBE' : '#1558D6',
          }}
        >
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
        </div>
      </div>
    </TiltCard>
  );
}

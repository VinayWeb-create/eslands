import { motion } from 'framer-motion';
import CountUp from '../CountUp';
import { useAccessibleAnimations } from '../../lib/animations';
import { ShieldCheck, Lock, Cloud, Cpu, TrendingUp, Award } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const clientPartners = [
  { name: 'Flower Paradise',    logo: '/images/flower_paradise_logo.png' },
  { name: 'Ash Groove',         logo: '/images/ash_groove_logo.png' },
  { name: 'Amdip Traders',      logo: '/images/amdip_traders_logo.png' },
  { name: 'Ilford Kitchens',    logo: '/images/ilford_kitchens_logo.png' },
  { name: 'NEX',                logo: '/nex.png' },
  { name: 'Mobile Bitz',        logo: '/images/mobile_bitz_logo.png' },
  { name: 'Kingsburry School',  logo: '/images/kingsburry_school_logo.png' },
];

const certifications = [
  { title: 'ISO 27001:2022',             category: 'Information Security Management',  icon: ShieldCheck, color: '#10B981' },
  { title: 'SOC 2 Type II',              category: 'Compliance & Audit Assurance',      icon: Lock,        color: '#2970FF' },
  { title: 'AWS Cloud Partner',          category: 'Cloud Infrastructure',              icon: Cloud,       color: '#F59E0B' },
  { title: 'Microsoft Solution Partner', category: 'Enterprise Applications',           icon: Cpu,         color: '#06B6D4' },
];

const stats = [
  { value: 10,   suffix: '+',  label: 'Years\nExperience',      icon: Award,       color: 'amber' },
  { value: 500,  suffix: '+',  label: 'Projects\nDelivered',    icon: TrendingUp,  color: 'blue' },
  { value: 200,  suffix: '+',  label: 'Global\nClients',        icon: ShieldCheck, color: 'indigo' },
  { value: 99.9, suffix: '%',  label: 'Uptime\nSLA',           icon: Cloud,       color: 'emerald', decimals: 1 },
];

export default function Partners() {
  const { prefersReducedMotion, fadeUp, scaleIn } = useAccessibleAnimations();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: isDark ? '#0A1524' : '#FFFFFF',
        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(228,233,240,0.9)'}`,
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(228,233,240,0.9)'}`,
      }}
    >
      {/* Subtle top gradient */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(21,88,214,0.3) 40%, rgba(0,180,230,0.3) 60%, transparent)' }}
      />

      {/* ── STATS STRIP ── */}
      <div
        className="py-12"
        style={{
          background: isDark ? '#07111F' : '#FFFFFF',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(228,233,240,0.9)'}`,
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            {...scaleIn}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((s, i) => {
              const Icon = s.icon;
              const styles = {
                amber: {
                  bg: 'bg-amber-50/70 border-amber-100 hover:border-amber-400/60 hover:shadow-amber-100/50',
                  text: 'text-amber-800',
                  iconBg: 'bg-amber-100/60 text-amber-600 border-amber-200/50',
                },
                blue: {
                  bg: 'bg-blue-50/70 border-blue-100 hover:border-blue-400/60 hover:shadow-blue-100/50',
                  text: 'text-blue-800',
                  iconBg: 'bg-blue-100/60 text-blue-600 border-blue-200/50',
                },
                indigo: {
                  bg: 'bg-indigo-50/70 border-indigo-100 hover:border-indigo-400/60 hover:shadow-indigo-100/50',
                  text: 'text-indigo-800',
                  iconBg: 'bg-indigo-100/60 text-indigo-600 border-indigo-200/50',
                },
                emerald: {
                  bg: 'bg-emerald-50/70 border-emerald-100 hover:border-emerald-400/60 hover:shadow-emerald-100/50',
                  text: 'text-emerald-800',
                  iconBg: 'bg-emerald-100/60 text-emerald-600 border-emerald-200/50',
                },
              }[s.color];

              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className={`flex flex-col items-center justify-center py-6 px-4 text-center rounded-2xl border transition-all duration-350 ${styles.bg} hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className={`mb-3.5 w-11 h-11 rounded-lg flex items-center justify-center border ${styles.iconBg}`}>
                    <Icon size={18} />
                  </div>
                  <div className={`font-display font-black tracking-tight text-2xl sm:text-3xl ${styles.text}`}>
                    <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider whitespace-pre-line mt-1.5 text-gray-500">
                    {s.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── CERTIFICATIONS & TRUST ── */}
      <div className="py-12" style={{ background: isDark ? '#091020' : '#FFFFFF' }}>
        <div className="mx-auto max-w-7xl px-6">
          {/* Section header */}
          <div className="text-center mb-10">
            <motion.span {...fadeUp} className="section-badge mb-4 inline-flex">
              Enterprise Trust & Compliance
            </motion.span>
            <motion.h2
              {...fadeUp}
              transition={{ delay: 0.08 }}
              className="font-display font-extrabold tracking-tight"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: isDark ? '#EDF2FF' : '#0A0F1E',
              }}
            >
              Industry-Leading Certifications
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ delay: 0.14 }}
              className="mt-2 text-sm font-medium max-w-xl mx-auto"
              style={{ color: isDark ? '#6680A0' : '#718096' }}
            >
              Our compliance framework is independently audited and renewed annually, giving enterprise clients total confidence in every engagement.
            </motion.p>
          </div>

          {/* Certification cards */}
          <motion.div
            {...scaleIn}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {certifications.map((cert, i) => {
              const Icon = cert.icon;
              const styles = {
                '#10B981': {
                  bg: 'bg-emerald-50/70 border-emerald-100 hover:border-emerald-400/60 hover:shadow-emerald-100/50',
                  text: 'text-emerald-800',
                  mutedText: 'text-emerald-700/80',
                  iconBg: 'bg-emerald-100/60 text-emerald-600 border-emerald-200/50',
                },
                '#2970FF': {
                  bg: 'bg-blue-50/70 border-blue-100 hover:border-blue-400/60 hover:shadow-blue-100/50',
                  text: 'text-blue-800',
                  mutedText: 'text-blue-700/80',
                  iconBg: 'bg-blue-100/60 text-blue-600 border-blue-200/50',
                },
                '#F59E0B': {
                  bg: 'bg-amber-50/70 border-amber-100 hover:border-amber-400/60 hover:shadow-amber-100/50',
                  text: 'text-amber-800',
                  mutedText: 'text-amber-700/80',
                  iconBg: 'bg-amber-100/60 text-amber-600 border-amber-200/50',
                },
                '#06B6D4': {
                  bg: 'bg-cyan-50/70 border-cyan-100 hover:border-cyan-400/60 hover:shadow-cyan-100/50',
                  text: 'text-cyan-800',
                  mutedText: 'text-cyan-700/80',
                  iconBg: 'bg-cyan-100/60 text-cyan-600 border-cyan-200/50',
                },
              }[cert.color];

              return (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`group relative rounded-2xl p-5 border transition-all duration-350 ${styles.bg} hover:-translate-y-1 hover:shadow-lg`}
                >
                  {/* Left accent border line */}
                  <div
                    className="absolute left-0 top-4 bottom-4 w-[3.5px] rounded-r-full"
                    style={{ background: cert.color }}
                  />

                  <div className={`flex h-11 w-11 items-center justify-center rounded-lg mb-4 border ${styles.iconBg}`}>
                    <Icon size={20} />
                  </div>
                  <h4 className={`text-base font-display font-extrabold leading-tight mb-1.5 ${styles.text}`}>
                    {cert.title}
                  </h4>
                  <p className={`text-xs font-semibold ${styles.mutedText}`}>
                    {cert.category}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── CLIENT LOGOS MARQUEE ── */}
      <div
        className="py-12 relative"
        style={{
          background: isDark
            ? '#07111F'
            : '#FFFFFF',
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(228,233,240,0.9)'}`,
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(228,233,240,0.9)'}`,
        }}
      >
        <div className="mx-auto max-w-7xl px-6 mb-8 text-center">
          <span
            className="text-[11px] font-bold uppercase tracking-[0.25em]"
            style={{ color: isDark ? '#8FA3BF' : '#6B7280' }}
          >
            Trusted By Leading Organisations
          </span>
        </div>

        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: isDark ? 'linear-gradient(to right, #07111F, transparent)' : 'linear-gradient(to right, #FFFFFF, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: isDark ? 'linear-gradient(to left, #07111F, transparent)' : 'linear-gradient(to left, #FFFFFF, transparent)' }}
        />

        <div className="relative overflow-hidden">
          <div
            className={`flex items-center ${prefersReducedMotion ? '' : 'animate-marquee'}`}
            style={{ width: 'max-content' }}
          >
            {[...clientPartners, ...clientPartners].map((partner, i) => (
              <div key={i} className="mx-16 flex-shrink-0 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  className="transition-all duration-300 opacity-95 hover:opacity-100 hover:scale-105 transform"
                  style={{
                    height: '5.2rem',
                    width: 'auto',
                    maxWidth: '18rem',
                    objectFit: 'contain',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

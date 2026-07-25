import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

export default function ServiceCard({ item }) {
  const Icon = item.icon;
  return (
    <TiltCard
      as="article"
      maxTilt={7}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 transition-all duration-500 hover:border-primary-300/50 hover:shadow-glow"
    >
      {/* Background Image */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-slate-950/40" />
      
      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[280px]">
        <motion.div 
          whileHover={{ scale: 1.08, y: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="mb-4 relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 text-white shadow-glow"
        >
          <Icon size={20} />
        </motion.div>
        <h3 className="relative text-xl font-semibold text-white group-hover:text-primary-200 transition-colors duration-300">{item.title}</h3>
        <p className="relative mt-3 text-sm leading-6 text-slate-300 group-hover:text-slate-200 transition-colors duration-300 line-clamp-3">{item.text}</p>
        <div className="relative mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-300 transition group-hover:translate-x-1">
          Learn more
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            &rarr;
          </span>
        </div>
      </div>
    </TiltCard>
  );
}

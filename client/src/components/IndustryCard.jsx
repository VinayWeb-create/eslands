import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

export default function IndustryCard({ label }) {
  return (
    <TiltCard
      as="div"
      maxTilt={7}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-8 text-center transition-all duration-500 hover:border-primary-300/50 hover:bg-slate-900/80 hover:shadow-glow"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-secondary-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <motion.div 
        whileHover={{ scale: 1.08, y: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="mx-auto mb-6 relative flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-950/90 text-primary-300 shadow-glow"
      >
        <Briefcase size={28} />
      </motion.div>
      <h3 className="relative text-xl font-semibold text-white group-hover:text-primary-200 transition-colors duration-300">{label}</h3>
    </TiltCard>
  );
}

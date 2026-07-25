import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IndustryCard({ label }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-8 text-center transition-all duration-500 hover:border-orange-300/50 hover:bg-slate-900/80 hover:shadow-glow"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 via-transparent to-orange-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <motion.div 
        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.15 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-6 relative flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-950/90 text-orange-300 shadow-glow"
      >
        <Briefcase size={28} />
      </motion.div>
      <h3 className="relative text-xl font-semibold text-white group-hover:text-orange-200 transition-colors duration-300">{label}</h3>
    </motion.div>
  );
}

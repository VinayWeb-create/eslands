import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  { name: 'Mia Carter', role: 'Head of Technology, Finserve', quote: 'The team delivered a polished platform ahead of schedule while preserving a strong security posture.', rating: 5 },
  { name: 'Liam Brooks', role: 'VP of Product, HealthSync', quote: 'Their consultative approach helped us launch a modern digital service with confidence.', rating: 5 },
  { name: 'Sofia Patel', role: 'Operations Director, LogiWave', quote: 'From strategy to deployment, every milestone was transparent and expertly managed.', rating: 5 },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((current) => (current + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow">
      <AnimatePresence mode="wait">
        <motion.div 
          key={testimonials[index].name} 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          exit={{ opacity: 0, x: -50 }} 
          transition={{ duration: 0.5, ease: 'easeInOut' }} 
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-glow"
            >
              {testimonials[index].name.charAt(0)}
            </motion.div>
            <div>
              <p className="text-lg font-semibold text-white">{testimonials[index].name}</p>
              <p className="text-sm text-slate-400">{testimonials[index].role}</p>
            </div>
          </div>
          <div className="space-y-2 text-slate-300">
            <div className="flex items-center gap-1">
              {Array.from({ length: testimonials[index].rating }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <Star size={16} className="text-orange-300" />
                </motion.div>
              ))}
            </div>
            <p className="text-xl leading-9">"{testimonials[index].quote}"</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button" 
          onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)} 
          className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-slate-950 text-slate-100 transition hover:border-orange-300 hover:text-white hover:shadow-glow-sm"
        >
          <ChevronLeft size={18} />
        </motion.button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, dot) => (
            <motion.button
              key={dot}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              type="button" 
              onClick={() => setIndex(dot)} 
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${dot === index ? 'bg-orange-300 scale-125' : 'bg-white/20 hover:bg-white/40'}`} 
              aria-label={`Slide ${dot + 1}`} 
            />
          ))}
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button" 
          onClick={() => setIndex((i) => (i + 1) % testimonials.length)} 
          className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-slate-950 text-slate-100 transition hover:border-orange-300 hover:text-white hover:shadow-glow-sm"
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}

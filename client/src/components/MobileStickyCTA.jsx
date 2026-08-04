import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';
import { useAccessibleAnimations } from '../lib/animations';

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { prefersReducedMotion } = useAccessibleAnimations();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show if scrolled up, hide if scrolled down past 100px
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: prefersReducedMotion ? 0 : 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: prefersReducedMotion ? 0 : 100, opacity: 0 }}
          transition={{ type: prefersReducedMotion ? false : 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 sm:hidden px-4 pb-safe pt-2"
        >
          {/* Main Container */}
          <div 
            className="flex items-center justify-between bg-slate-900/90 backdrop-blur-2xl border border-white/[0.08] rounded-[2rem] mx-4 mb-2 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
          >
            {/* Book Consultation */}
            <Link
              to="/contact"
              className="flex-1 flex items-center justify-center gap-2.5 bg-white/[0.03] hover:bg-white/[0.08] text-white font-black py-3.5 px-4 rounded-[1.5rem] border border-white/[0.05] active:scale-[0.98] transition-all"
            >
              <Calendar size={18} className="text-emerald-400" />
              <span className="text-[13px] tracking-[0.1em] uppercase bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Book Consultation</span>
            </Link>

            {/* Divider */}
            <div className="w-px h-8 bg-white/10 mx-1.5" />

            {/* Call Now */}
            <a
              href="tel:02038190333"
              className="flex items-center justify-center h-[3.25rem] w-[3.25rem] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-[1.5rem] hover:bg-emerald-500/20 active:scale-[0.95] transition-all shrink-0"
              aria-label="Call Now"
            >
              <Phone size={20} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

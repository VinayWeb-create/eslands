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
            className="flex items-center justify-between bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-t-[2rem] p-3 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]"
            style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
          >
            {/* Book Consultation */}
            <Link
              to="/contact"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold py-3.5 px-4 rounded-[1.25rem] shadow-lg shadow-sky-500/20 active:scale-95 transition-transform"
            >
              <Calendar size={18} />
              <span className="text-[13px] tracking-wide uppercase">Book Consultation</span>
            </Link>

            {/* Divider */}
            <div className="w-px h-8 bg-white/10 mx-3" />

            {/* Call Now */}
            <a
              href="tel:02038190333"
              className="flex items-center justify-center h-[3.25rem] w-[3.25rem] bg-white/5 border border-white/10 text-sky-400 rounded-[1.25rem] hover:bg-white/10 active:scale-95 transition-all shrink-0"
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

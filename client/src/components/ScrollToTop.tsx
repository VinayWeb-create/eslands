import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  // Track scroll position to show floating Up Arrow button after 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.15, y: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 sm:bottom-8 sm:right-8 z-[99] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 text-slate-950 font-black shadow-[0_0_30px_rgba(56,189,248,0.6)] border-2 border-white/60 backdrop-blur-2xl transition-all duration-300 hover:brightness-125 hover:shadow-[0_0_40px_rgba(56,189,248,0.9)] focus:outline-none"
          aria-label="Scroll to top of page"
        >
          <ArrowUp size={24} className="stroke-[3.5] text-slate-950" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

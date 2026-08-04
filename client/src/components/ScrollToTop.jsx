import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  // 1. Automatically scroll to top section when location/route changes or page reloads
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  // 2. Track scroll position to show floating Up Arrow button after 300px
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
          className="fixed bottom-[100px] right-6 sm:bottom-[92px] sm:right-6 z-[99] flex h-12 w-12 items-center justify-center rounded-lg text-white transition-all duration-200 focus:outline-none"
          style={{
            background: '#003087',
            boxShadow: '0 4px 16px rgba(0,48,135,0.35)',
            border: '1px solid rgba(0,48,135,0.6)',
          }}
          aria-label="Scroll to top of page"
          onMouseEnter={e => { e.currentTarget.style.background = '#002068'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,48,135,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#003087'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,48,135,0.35)'; }}
        >
          <ArrowUp size={18} className="stroke-[2.5]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

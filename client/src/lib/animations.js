import { useReducedMotion } from 'framer-motion';

export function useAccessibleAnimations() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }
  };

  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 } }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { type: prefersReducedMotion ? 'tween' : 'spring', stiffness: 260, damping: 24, duration: prefersReducedMotion ? 0 : undefined } }
  };

  const fadeIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: prefersReducedMotion ? 0 : 0.5 }
  };

  const scaleUp = {
    initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 },
    transition: { duration: prefersReducedMotion ? 0 : 0.35 }
  };

  return {
    prefersReducedMotion,
    fadeUp,
    staggerContainer,
    staggerItem,
    fadeIn,
    scaleUp
  };
}

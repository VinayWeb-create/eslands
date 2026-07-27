import { useReducedMotion, Variants, Transition } from 'framer-motion';

export interface AccessibleAnimations {
  prefersReducedMotion: boolean | null;
  fadeUp: {
    initial: { opacity: number; y: number };
    whileInView: { opacity: number; y: number };
    viewport: { once: boolean; amount: number };
    transition: Transition;
  };
  staggerContainer: Variants;
  staggerItem: Variants;
  fadeIn: {
    initial: { opacity: number };
    whileInView: { opacity: number };
    viewport: { once: boolean };
    transition: Transition;
  };
  scaleUp: {
    initial: { opacity: number; scale: number };
    animate: { opacity: number; scale: number };
    exit: { opacity: number; scale: number };
    transition: Transition;
  };
}

export function useAccessibleAnimations(): AccessibleAnimations {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' },
  };

  const staggerContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 } },
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { type: 'spring', stiffness: 260, damping: 24 },
    },
  };

  const fadeIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: prefersReducedMotion ? 0 : 0.5 },
  };

  const scaleUp = {
    initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 },
    transition: { duration: prefersReducedMotion ? 0 : 0.35 },
  };

  return {
    prefersReducedMotion,
    fadeUp,
    staggerContainer,
    staggerItem,
    fadeIn,
    scaleUp,
  };
}

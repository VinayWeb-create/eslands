import { useReducedMotion } from 'framer-motion';

export function useAccessibleAnimations() {
  const prefersReducedMotion = useReducedMotion();

  const dur = (d) => (prefersReducedMotion ? 0 : d);

  const fadeUp = {
    initial:     { opacity: 0, y: prefersReducedMotion ? 0 : 40, rotateX: prefersReducedMotion ? 0 : -5, scale: prefersReducedMotion ? 1 : 0.95 },
    whileInView: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
    viewport:    { once: true, amount: 0.15, margin: "-50px" },
    transition:  { duration: dur(0.8), ease: [0.16, 1, 0.3, 1] },
  };

  const fadeIn = {
    initial:     { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport:    { once: true, margin: "-50px" },
    transition:  { duration: dur(0.6), ease: [0.16, 1, 0.3, 1] },
  };

  const scaleIn = {
    initial:     { opacity: 0, scale: prefersReducedMotion ? 1 : 0.85, y: prefersReducedMotion ? 0 : 20 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport:    { once: true, amount: 0.1, margin: "-50px" },
    transition:  { duration: dur(0.8), ease: [0.16, 1, 0.3, 1] },
  };

  const slideInLeft = {
    initial:     { opacity: 0, x: prefersReducedMotion ? 0 : -50, rotateY: prefersReducedMotion ? 0 : -10 },
    whileInView: { opacity: 1, x: 0, rotateY: 0 },
    viewport:    { once: true, amount: 0.15, margin: "-50px" },
    transition:  { duration: dur(0.8), ease: [0.16, 1, 0.3, 1] },
  };

  const slideInRight = {
    initial:     { opacity: 0, x: prefersReducedMotion ? 0 : 50, rotateY: prefersReducedMotion ? 0 : 10 },
    whileInView: { opacity: 1, x: 0, rotateY: 0 },
    viewport:    { once: true, amount: 0.15, margin: "-50px" },
    transition:  { duration: dur(0.8), ease: [0.16, 1, 0.3, 1] },
  };

  const staggerContainer = {
    hidden: {},
    show:   { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12, delayChildren: 0.1 } },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30, scale: prefersReducedMotion ? 1 : 0.95 },
    show:   {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: prefersReducedMotion ? 'tween' : 'spring',
        stiffness: 150,
        damping: 18,
        mass: 0.8,
        duration: prefersReducedMotion ? 0 : undefined,
      },
    },
  };

  const scaleUp = {
    initial:    { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 },
    animate:    { opacity: 1, scale: 1 },
    exit:       { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 },
    transition: { duration: dur(0.4), ease: [0.16, 1, 0.3, 1] },
  };

  return {
    prefersReducedMotion,
    fadeUp,
    fadeIn,
    scaleIn,
    slideInLeft,
    slideInRight,
    staggerContainer,
    staggerItem,
    scaleUp,
  };
}

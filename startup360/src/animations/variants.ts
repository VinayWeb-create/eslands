import type { Transition, Variants } from 'framer-motion';

export const easeOutExpo: Transition['ease'] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: easeOutExpo } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: easeOutExpo } },
};

/** 3D flip used by the services panel when switching service. */
export const panelFlip: Variants = {
  enter: { opacity: 0, rotateY: -18, x: 40, filter: 'blur(8px)' },
  center: { opacity: 1, rotateY: 0, x: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: easeOutExpo } },
  exit: { opacity: 0, rotateY: 14, x: -30, filter: 'blur(8px)', transition: { duration: 0.35 } },
};

export const viewportOnce = { once: true, margin: '-80px' } as const;

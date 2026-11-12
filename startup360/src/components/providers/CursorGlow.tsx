'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { useFinePointer } from '@/hooks/useFinePointer';

/** Soft spotlight that trails the cursor. Fine pointers only; purely decorative. */
export function CursorGlow() {
  const fine = useFinePointer();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 });

  useEffect(() => {
    if (!fine) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [fine, x, y]);

  if (!fine) return null;
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[60] size-[400px] rounded-full opacity-60 mix-blend-soft-light blur-3xl [background:radial-gradient(circle,var(--glow),transparent_65%)] dark:mix-blend-screen dark:opacity-40"
    />
  );
}

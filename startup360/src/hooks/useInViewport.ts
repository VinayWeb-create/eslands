'use client';

import { useEffect, useState, type RefObject } from 'react';

/** Lightweight visibility flag — used to pause canvas / WebGL loops off-screen. */
export function useInViewport<T extends Element>(ref: RefObject<T | null>, rootMargin = '100px'): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return visible;
}

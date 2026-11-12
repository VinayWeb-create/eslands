'use client';

import { useCallback, type PointerEvent } from 'react';

/**
 * Writes the pointer position into CSS vars (--mx / --my) on the element,
 * enabling CSS-only spotlight / liquid-hover effects with zero re-renders.
 */
export function useSpotlight<T extends HTMLElement>() {
  return useCallback((e: PointerEvent<T>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);
}

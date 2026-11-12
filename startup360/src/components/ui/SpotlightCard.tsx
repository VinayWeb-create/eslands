'use client';

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { useSpotlight } from '@/hooks/useSpotlight';
import { cn } from '@/lib/utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: string;
}

/** Glass surface with a cursor-following radial light. */
export function SpotlightCard({ children, className, glow = 'var(--glow)', style, ...rest }: Props) {
  const onMove = useSpotlight<HTMLDivElement>();
  return (
    <div
      onPointerMove={onMove}
      className={cn('group/spot glass relative overflow-hidden rounded-3xl shadow-soft', className)}
      style={{ ...style, ['--spot' as string]: glow } as CSSProperties}
      {...rest}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100 [background:radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),var(--spot),transparent_60%)]"
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

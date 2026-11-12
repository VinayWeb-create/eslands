import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  id: string;
  labelledBy: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

/** Landmark wrapper: consistent rhythm, anchor id and aria-labelledby. */
export function Section({ id, labelledBy, children, className, innerClassName }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('relative py-24 sm:py-32', className)}>
      <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', innerClassName)}>{children}</div>
    </section>
  );
}

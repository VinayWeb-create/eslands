'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, stagger, viewportOnce } from '@/animations/variants';
import { cn } from '@/lib/utils';

interface Props {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  id?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = 'center', id, className }: Props) {
  return (
    <motion.header
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
    >
      <motion.p
        variants={fadeUp}
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
      >
        <span className="size-1.5 rounded-full bg-brand" aria-hidden />
        {eyebrow}
      </motion.p>
      <motion.h2
        id={id}
        variants={fadeUp}
        className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">
          {description}
        </motion.p>
      ) : null}
    </motion.header>
  );
}

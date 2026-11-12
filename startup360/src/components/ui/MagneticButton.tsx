'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { ComponentPropsWithoutRef, PointerEvent, ReactNode } from 'react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';

const styles: Record<Variant, string> = {
  primary: 'bg-fg text-bg shadow-[0_10px_40px_-10px_var(--glow)] hover:shadow-[0_14px_50px_-8px_var(--glow)]',
  secondary: 'glass text-fg hover:border-line-strong',
  ghost: 'text-fg hover:bg-fg/5',
};

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** How far the button follows the cursor (0–1). */
  strength?: number;
}

type AnchorProps = BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className' | 'children'>;
type ButtonProps = BaseProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;

/** Button / link that leans toward the cursor and reveals a liquid highlight on hover. */
export function MagneticButton(props: AnchorProps | ButtonProps) {
  const { children, variant = 'primary', className, strength = 0.28 } = props;
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.3 });

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    'group/btn relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-semibold tracking-tight transition-[box-shadow,background-color,border-color] duration-300',
    styles[variant],
    className,
  );
  const inner = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 [background:radial-gradient(120px_circle_at_var(--mx,50%)_var(--my,50%),var(--glow),transparent_70%)]"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  let element: ReactNode;
  if (props.href !== undefined) {
    const { href, children: _c, variant: _v, className: _cl, strength: _s, ...rest } = props as AnchorProps;
    element = (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    );
  } else {
    const { children: _c, variant: _v, className: _cl, strength: _s, href: _h, ...rest } = props as ButtonProps;
    element = (
      <button type="button" className={classes} {...rest}>
        {inner}
      </button>
    );
  }

  return (
    <motion.span ref={ref} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset} className="inline-flex">
      {element}
    </motion.span>
  );
}

import { motion, HTMLMotionProps } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import useTiltCard from '../hooks/useTiltCard';

export interface TiltCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  as?: React.ElementType;
}

export default function TiltCard({ children, className = '', maxTilt = 8, ...props }: TiltCardProps) {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    );
  }, []);

  const {
    sheenOpacityMotion,
    sheenBackground,
    handleMouseMove,
    handleMouseLeave,
    style,
  } = useTiltCard({ maxTilt });

  if (isTouch) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={className}
      {...props}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: sheenBackground,
          opacity: sheenOpacityMotion,
        }}
      />
    </motion.div>
  );
}

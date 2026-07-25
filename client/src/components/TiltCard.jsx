import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import useTiltCard from '../hooks/useTiltCard';

export default function TiltCard({ children, className = '', maxTilt = 8, ...props }) {
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
      <div className={className} {...props}>
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

import { forwardRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useTiltCard from '../hooks/useTiltCard';

/**
 * TiltCard — wraps children in a 3-D perspective tilt on hover.
 * Uses forwardRef so ServiceCard can attach its spotlight-tracking ref.
 */
const TiltCard = forwardRef(function TiltCard(
  { children, className = '', maxTilt = 8, as: Tag = 'div', ...props },
  ref
) {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(!window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  const { sheenOpacityMotion, sheenBackground, handleMouseMove, handleMouseLeave, style } =
    useTiltCard({ maxTilt });

  if (isTouch) {
    return (
      <Tag ref={ref} className={className} {...props}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[Tag] || motion.div;

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={className}
      {...props}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
        style={{ background: sheenBackground, opacity: sheenOpacityMotion }}
      />
    </MotionTag>
  );
});

export default TiltCard;

import { useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { useCallback, useMemo } from 'react';

const SPRING_CONFIG = { stiffness: 150, damping: 20, mass: 0.5 };

export default function useTiltCard({ maxTilt = 8, sheenOpacity = 0.18 } = {}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), SPRING_CONFIG);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), SPRING_CONFIG);

  const sheenX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), SPRING_CONFIG);
  const sheenY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), SPRING_CONFIG);
  const sheenOpacityMotion = useSpring(useTransform(mouseX, () => sheenOpacity), SPRING_CONFIG);

  const sheenBackground = useMotionTemplate`radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.25) 0%, transparent 60%)`;

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const style = useMemo(() => ({
    rotateX,
    rotateY,
    transformStyle: 'preserve-3d',
  }), [rotateX, rotateY]);

  return {
    rotateX,
    rotateY,
    sheenX,
    sheenY,
    sheenOpacityMotion,
    sheenBackground,
    handleMouseMove,
    handleMouseLeave,
    style,
  };
}

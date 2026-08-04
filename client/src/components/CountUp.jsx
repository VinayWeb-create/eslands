import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * CountUp — triggers when the element scrolls into view.
 * Uses an ease-out curve for a premium deceleration effect.
 */
export default function CountUp({ end, suffix = '', prefix = '', duration = 2200, decimals = 0 }) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const startValue = 0;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutCubic(progress);
      const current  = startValue + (end - startValue) * eased;

      setCount(parseFloat(current.toFixed(decimals)));

      if (progress < 1) requestAnimationFrame(animate);
      else setCount(end);
    };

    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [isInView, end, duration, decimals]);

  const display = decimals > 0 ? count.toFixed(decimals) : Math.floor(count);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

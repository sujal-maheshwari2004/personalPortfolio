import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "motion/react";

/**
 * Count-up number. Animates 0 → value the first time it scrolls into view.
 * Honors prefers-reduced-motion (renders the final value immediately).
 */
export default function NumberTicker({ value, duration = 1.6, className }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(mv, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        if (ref.current) ref.current.textContent = Math.round(latest).toLocaleString();
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce, mv]);

  return (
    <span ref={ref} className={className}>
      {reduce ? value.toLocaleString() : 0}
    </span>
  );
}

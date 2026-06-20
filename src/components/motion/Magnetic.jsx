import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Magnetic wrapper: pulls its child toward the cursor on hover, springs back
 * on leave. No-op (static) under reduced motion.
 */
export default function Magnetic({ children, strength = 0.4, className }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  if (reduce) return <span className={cn("inline-block", className)}>{children}</span>;

  function move(e) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function leave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ x, y }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
}

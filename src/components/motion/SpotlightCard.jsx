import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Card wrapper with a cursor-following radial spotlight + subtle 3D tilt.
 * `glow` is any CSS color used for the spotlight tint.
 * Honors prefers-reduced-motion (static card, no pointer effects).
 */
export default function SpotlightCard({
  children,
  className,
  glow = "rgba(14,165,233,0.18)",
  tilt = 6,
  ...props
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  // spotlight position
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const [hovered, setHovered] = useState(false);

  // tilt (springed)
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });

  const background = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, ${glow}, transparent 70%)`;

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    mx.set(px);
    my.set(py);
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    ry.set(((px - cx) / cx) * tilt);
    rx.set((-(py - cy) / cy) * tilt);
  }

  function handleLeave() {
    setHovered(false);
    rx.set(0);
    ry.set(0);
  }

  if (reduce) {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className={cn("group/spot relative", className)}
      {...props}
    >
      {/* spotlight layer */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{ background, opacity: hovered ? 1 : 0 }}
      />
      {children}
    </motion.div>
  );
}

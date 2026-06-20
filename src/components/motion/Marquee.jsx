import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee. Duplicates children for a seamless loop.
 * Pauses on hover; renders static (no animation) under reduced motion.
 */
export default function Marquee({
  children,
  className,
  duration = 40,
  reverse = false,
  pauseOnHover = true,
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={cn("flex flex-wrap gap-3", className)}>{children}</div>;
  }

  return (
    <div
      className={cn("group relative flex overflow-hidden", className)}
      style={{ "--duration": `${duration}s`, "--gap": "1rem" }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "marquee-track flex shrink-0 items-center justify-around gap-4 pr-4",
            reverse && "marquee-reverse",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Editorial hero backdrop: faint ruled baseline grid (notebook/ledger) with a
 * single soft spot-color bloom that slowly drifts. Decorative only; the drift
 * pauses under reduced motion.
 */
export default function Aurora({ className }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {/* ruled baseline grid, faded at the bottom */}
      <div
        className="bg-rules absolute inset-0"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 92%)",
        }}
      />
      {/* single spot-color bloom, top-right */}
      <div
        className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--spot) 26%, transparent), transparent 68%)",
          opacity: 0.5,
          animation: reduce ? undefined : "spot-drift 18s ease-in-out infinite",
        }}
      />
    </div>
  );
}

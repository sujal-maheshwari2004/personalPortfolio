import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Rotating letterpress seal — a circular-text "stamp" (print motif).
 * Spins slowly; static under reduced motion.
 */
export default function Stamp({ className }) {
  return (
    <div className={cn("relative size-[122px]", className)} aria-hidden>
      <svg
        viewBox="0 0 100 100"
        className="size-full animate-[spin_20s_linear_infinite] text-muted-foreground motion-reduce:animate-none"
      >
        <defs>
          <path id="seal-path" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" />
        </defs>
        <text className="fill-current font-mono uppercase" fontSize="7.7" letterSpacing="2.3">
          <textPath href="#seal-path" startOffset="0">
            Open for work · Available 2026 ·&nbsp;
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center text-spot">
        <ArrowUpRight className="size-5" />
      </span>
    </div>
  );
}

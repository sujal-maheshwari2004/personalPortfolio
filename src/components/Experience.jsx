import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { experience } from "../data";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/SectionHeader";

export default function Experience() {
  const [active, setActive] = useState(0);
  const e = experience[active];

  return (
    <section id="experience" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader number="01" label="Where I've been" title="Experience" />

        <div className="grid gap-0 md:grid-cols-[280px_1fr]">
          {/* tab list */}
          <div className="flex overflow-x-auto md:flex-col md:overflow-visible">
            {experience.map((item, i) => (
              <button
                key={item.company}
                onClick={() => setActive(i)}
                className={`group relative flex shrink-0 flex-col items-start gap-1 whitespace-nowrap border-b border-border px-4 py-4 text-left transition-colors md:border-b md:px-5 ${
                  active === i ? "" : "opacity-60 hover:opacity-100"
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="exp-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-spot md:bottom-auto md:left-0 md:top-0 md:h-full md:w-px md:right-auto"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] text-spot/70">0{i + 1}</span>
                  <span className="text-sm font-semibold text-foreground">{item.company}</span>
                </span>
                <span className="pl-6 font-mono text-[10px] text-subtle">{item.period}</span>
              </button>
            ))}
          </div>

          {/* panel */}
          <div className="md:border-l md:border-border md:pl-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="py-6 md:py-1"
              >
                <h3 className="font-serif text-[clamp(26px,3.5vw,38px)] font-normal leading-tight text-foreground">
                  {e.role}
                </h3>
                <p className="mt-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-spot">
                  {e.company}
                  <span className="text-muted-foreground"> · {e.type}</span>
                </p>
                <p className="mb-6 mt-1 font-mono text-[11px] text-subtle">
                  {e.location} · {e.period}
                </p>

                <ul className="mb-6 space-y-3">
                  {e.bullets.map((b, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + j * 0.06, duration: 0.35 }}
                      className="flex items-start gap-3 text-[15px] font-light leading-[1.6] text-muted-foreground"
                    >
                      <span className="mt-2 font-mono text-[11px] text-spot">→</span>
                      {b}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {e.tags.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="rounded-sm border-border bg-transparent font-mono text-[10px] font-normal uppercase tracking-wider text-muted-foreground"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

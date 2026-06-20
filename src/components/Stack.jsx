import { stack, extra } from "../data";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import Reveal, { RevealGroup, revealItem } from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import SectionHeader from "@/components/SectionHeader";

const allSkills = Array.from(new Set(Object.values(stack).flat()));

export default function Stack() {
  return (
    <section id="stack" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader number="03" label="Tools of the trade" title="Stack" />

        {/* marquee ribbon, framed top & bottom like a ticker tape */}
        <Reveal className="relative mb-14 overflow-hidden border-y border-border py-3">
          <Marquee duration={45}>
            {allSkills.map((s) => (
              <span
                key={s}
                className="mx-3 font-mono text-[12px] uppercase tracking-[0.1em] text-muted-foreground"
              >
                {s}
                <span className="ml-6 text-spot/50">/</span>
              </span>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </Reveal>

        <RevealGroup
          className="grid gap-x-8 gap-y-10 [grid-template-columns:repeat(auto-fit,minmax(210px,1fr))]"
          stagger={0.08}
        >
          {Object.entries(stack).map(([category, items], i) => (
            <motion.div key={category} variants={revealItem}>
              <div className="mb-4 flex items-center gap-2 border-b border-border pb-2">
                <span className="font-mono text-[10px] text-spot/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground">
                  {category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <Badge
                    key={item}
                    variant="outline"
                    className="rounded-sm border-border bg-transparent font-mono text-[10px] font-normal text-muted-foreground"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </RevealGroup>

        <RevealGroup
          className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-8"
          stagger={0.06}
        >
          {extra.map((item) => (
            <motion.div
              key={item}
              variants={revealItem}
              className="flex items-center gap-2.5 text-[14px] font-light text-muted-foreground"
            >
              <span className="font-mono text-[11px] text-spot">✦</span>
              {item}
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

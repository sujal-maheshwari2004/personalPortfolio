import Reveal from "@/components/motion/Reveal";

/**
 * Editorial numbered section header:
 *   (0N) ───────────────────  LABEL
 *   Big Serif Title
 */
export default function SectionHeader({ number, label, title }) {
  return (
    <Reveal className="mb-12">
      <div className="mb-6 flex items-center gap-4">
        <span className="font-mono text-xs text-spot">({number})</span>
        <span className="h-px flex-1 bg-border" />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
      </div>
      <h2 className="font-serif text-[clamp(44px,7vw,80px)] font-normal leading-[0.92] tracking-[-0.01em] text-foreground">
        {title}
      </h2>
    </Reveal>
  );
}

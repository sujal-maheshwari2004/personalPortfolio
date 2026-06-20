/** Editorial flow diagram for case studies: Step → Step → Step. */
export default function Pipeline({ steps = [], caption }) {
  return (
    <figure className="my-8">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-4">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className="rounded-sm border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-foreground">
              {s}
            </span>
            {i < steps.length - 1 && <span className="font-mono text-spot">→</span>}
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center font-mono text-[11px] uppercase tracking-wider text-subtle">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

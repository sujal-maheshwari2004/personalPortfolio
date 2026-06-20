/**
 * Page chrome shared across the whole site:
 *  - Grain: a fixed film-grain overlay for paper/print texture.
 *  - PageFrame: two faint vertical hairlines framing the content column
 *    (the "ledger" / printed-page feel), drawn behind everything.
 */

export function Grain() {
  return (
    <div
      aria-hidden
      className="bg-grain pointer-events-none fixed inset-0 z-[200] opacity-[0.04] mix-blend-multiply print:hidden dark:opacity-[0.06] dark:mix-blend-soft-light"
    />
  );
}

export function PageFrame() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 hidden md:block print:hidden">
      <div className="mx-auto h-full max-w-[1180px] border-x border-border/70" />
    </div>
  );
}

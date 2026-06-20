import { MDXProvider } from "@mdx-js/react";
import { cn } from "@/lib/utils";

const components = {
  h2: (p) => (
    <h2
      className="mt-12 mb-3 font-serif text-[clamp(26px,4vw,36px)] font-normal leading-tight text-foreground"
      {...p}
    />
  ),
  h3: (p) => (
    <h3
      className="mt-9 mb-2 font-serif text-[clamp(22px,3vw,28px)] font-normal text-foreground"
      {...p}
    />
  ),
  p: (p) => <p className="my-4 text-[15.5px] leading-[1.8] text-muted-foreground" {...p} />,
  ul: (p) => <ul className="my-4 list-none space-y-2 pl-0" {...p} />,
  ol: (p) => (
    <ol className="my-4 list-decimal space-y-2 pl-5 marker:font-mono marker:text-spot" {...p} />
  ),
  li: (p) => (
    <li
      className="relative pl-5 text-[15.5px] leading-[1.7] text-muted-foreground before:absolute before:left-0 before:top-0 before:font-mono before:text-spot before:content-['—'] [ol_&]:pl-1 [ol_&]:before:content-none"
      {...p}
    />
  ),
  a: (p) => (
    <a
      className="text-spot underline decoration-spot/30 underline-offset-2 transition-colors hover:decoration-spot"
      target="_blank"
      rel="noreferrer"
      {...p}
    />
  ),
  strong: (p) => <strong className="font-medium text-foreground" {...p} />,
  em: (p) => <em className="italic" {...p} />,
  blockquote: (p) => (
    <blockquote
      className="my-6 border-l-2 border-spot pl-5 font-serif text-[20px] italic leading-snug text-foreground"
      {...p}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  figure: (p) => <figure className="my-8" {...p} />,
  figcaption: (p) => (
    <figcaption
      className="mt-2 text-center font-mono text-[11px] uppercase tracking-wider text-subtle"
      {...p}
    />
  ),
  img: (p) => <img className="my-6 rounded-lg border border-border" loading="lazy" {...p} />,
  // Merge Shiki's classes/inline-style instead of overwriting them.
  pre: ({ className, ...p }) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-lg border border-border p-4 text-[13px] leading-relaxed",
        className
      )}
      {...p}
    />
  ),
};

export default function Prose({ children, className }) {
  return (
    <div className={cn("prose-body max-w-[680px]", className)}>
      <MDXProvider components={components}>{children}</MDXProvider>
    </div>
  );
}

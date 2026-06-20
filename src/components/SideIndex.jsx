import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const items = [
  { id: "home", n: "00", label: "Index" },
  { id: "experience", n: "01", label: "Experience" },
  { id: "projects", n: "02", label: "Work" },
  { id: "stack", n: "03", label: "Stack" },
  { id: "contact", n: "04", label: "Contact" },
];

export default function SideIndex() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section index"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3.5 print:hidden xl:flex"
    >
      {items.map((it) => {
        const on = active === it.id;
        return (
          <button
            key={it.id}
            onClick={() => scrollToId(it.id)}
            className="group flex items-center justify-end gap-2.5"
            aria-current={on ? "true" : undefined}
          >
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300",
                on
                  ? "text-foreground opacity-100"
                  : "translate-x-1 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              )}
            >
              {it.label}
            </span>
            <span
              className={cn(
                "h-px transition-all duration-300",
                on
                  ? "w-7 bg-spot"
                  : "w-3.5 bg-border group-hover:w-5 group-hover:bg-muted-foreground"
              )}
            />
            <span
              className={cn(
                "font-mono text-[10px] transition-colors",
                on ? "text-spot" : "text-subtle"
              )}
            >
              {it.n}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { posts, formatDate } from "@/lib/content";
import useDocumentMeta from "@/hooks/useDocumentMeta";
import Reveal, { RevealGroup, revealItem } from "@/components/motion/Reveal";
import { motion } from "motion/react";

export default function Writing() {
  useDocumentMeta({
    title: "Writing — Sujal Maheshwari",
    description: "Technical notes on LLMs, agents, and systems engineering.",
  });

  return (
    <section className="px-6 pb-28 pt-32">
      <div className="mx-auto max-w-[820px]">
        <Reveal className="mb-12">
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-xs text-spot">(W)</span>
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Notes &amp; essays
            </span>
          </div>
          <h1 className="font-serif text-[clamp(44px,7vw,80px)] font-normal leading-[0.92] tracking-[-0.01em] text-foreground">
            Writing
          </h1>
        </Reveal>

        <RevealGroup className="divide-y divide-border border-y border-border" stagger={0.07}>
          {posts.map((p) => (
            <motion.article key={p.slug} variants={revealItem}>
              <Link
                to={`/writing/${p.slug}`}
                viewTransition
                className="group flex flex-col gap-2 py-7 transition-colors hover:bg-card sm:px-2"
              >
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
                  <span>{formatDate(p.frontmatter.date)}</span>
                  <span>·</span>
                  <span>{p.readingTime} min read</span>
                </div>
                <h2 className="flex items-start justify-between gap-4 font-serif text-[26px] font-normal leading-tight text-foreground">
                  {p.frontmatter.title}
                  <ArrowUpRight className="mt-1 size-5 shrink-0 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-spot" />
                </h2>
                <p className="max-w-[60ch] text-[14.5px] font-light leading-[1.6] text-muted-foreground">
                  {p.frontmatter.summary}
                </p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {(p.frontmatter.tags || []).map((t) => (
                    <span
                      key={t}
                      className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

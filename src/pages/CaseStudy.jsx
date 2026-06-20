import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data";
import { getCaseStudy } from "@/lib/content";
import useDocumentMeta from "@/hooks/useDocumentMeta";
import Prose from "@/components/mdx/Prose";
import NotFound from "./NotFound";

function ExtLink({ href, children }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-1 font-mono text-[12px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-spot"
    >
      {children}
      <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);
  const project = projects.find((p) => p.slug === slug);

  useDocumentMeta({
    title: study ? `${study.frontmatter.title} — Case study — Sujal Maheshwari` : "Not found",
    description: study?.frontmatter.summary,
  });

  if (!study) return <NotFound />;
  const fm = study.frontmatter;
  const Component = study.Component;

  return (
    <article className="px-6 pb-28 pt-32">
      <div className="mx-auto max-w-[820px]">
        <Link
          to="/"
          state={{ scrollTo: "projects" }}
          className="mb-10 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-spot"
        >
          <ArrowLeft className="size-3.5" /> Selected Work
        </Link>

        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-spot">
          {project?.category || "Case study"}
        </p>
        <h1
          className="mt-3 font-serif text-[clamp(40px,7vw,76px)] font-normal leading-[0.95] tracking-[-0.01em] text-foreground"
          style={{ viewTransitionName: `project-${slug}` }}
        >
          {fm.title}
        </h1>
        {fm.summary && (
          <p className="mt-4 max-w-[60ch] font-serif text-[clamp(18px,2.4vw,24px)] italic leading-snug text-muted-foreground">
            {fm.summary}
          </p>
        )}

        {/* meta ledger */}
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
          {[
            ["Role", fm.role],
            ["Year", fm.year],
            ["Stack", Array.isArray(fm.stack) ? fm.stack.join(" · ") : fm.stack],
            ["Status", fm.status || (project?.live ? "Live" : "Shipped")],
          ].map(([k, v]) => (
            <div key={k} className="bg-card px-4 py-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">{k}</dt>
              <dd className="mt-1 text-[13px] text-foreground">{v || "—"}</dd>
            </div>
          ))}
        </dl>

        {project && (
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-8">
            <ExtLink href={project.github}>GitHub</ExtLink>
            <ExtLink href={project.live}>Live</ExtLink>
            <ExtLink href={project.pypi}>PyPI</ExtLink>
            <ExtLink href={project.docs}>Docs</ExtLink>
          </div>
        )}

        <div className="mt-10">
          <Prose className="max-w-none">
            <Component />
          </Prose>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            to="/"
            state={{ scrollTo: "projects" }}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-spot"
          >
            <ArrowLeft className="size-3.5" /> All work
          </Link>
        </div>
      </div>
    </article>
  );
}

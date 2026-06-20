import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projects } from "../data";
import { Badge } from "@/components/ui/badge";
import { RevealGroup, revealItem } from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import SectionHeader from "@/components/SectionHeader";
import { hasCaseStudy } from "@/lib/content";
import { cn } from "@/lib/utils";

const WIDE = "col-span-12 md:col-span-6";
const FULL = "col-span-12";
const THIRD = "col-span-12 sm:col-span-6 lg:col-span-4";

// Visual order + sizing for the bento (data order in data.js is irrelevant).
const layout = [
  { name: "DriftGuard", span: WIDE },
  { name: "ToolStore", span: WIDE },
  { name: "Sentinel", span: THIRD },
  { name: "Coven", span: THIRD },
  { name: "Bot Street", span: THIRD },
  { name: "Librarian Series", span: FULL },
  { name: "librarian-press", span: WIDE },
  { name: "Mafia A2A", span: WIDE },
  { name: "PeakPulse", span: WIDE },
  { name: "NewsCheck", span: WIDE },
];

function ProjLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group/link inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-spot"
    >
      {children}
      <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </a>
  );
}

function ProjectCard({ project, span, index }) {
  const navigate = useNavigate();
  if (!project) return null;
  const study = project.slug && hasCaseStudy(project.slug);

  return (
    <motion.div variants={revealItem} className={cn("min-w-0", span)}>
      <SpotlightCard
        glow="color-mix(in srgb, var(--spot) 16%, transparent)"
        tilt={4}
        className="h-full rounded-[10px]"
      >
        <div
          data-card
          tabIndex={0}
          role="group"
          aria-label={project.name}
          onKeyDown={(e) => {
            if (study && e.key === "Enter" && e.target.dataset?.card !== undefined) {
              navigate(`/work/${project.slug}`);
            }
          }}
          className="@container relative flex h-full flex-col rounded-[10px] border border-border bg-card p-6 outline-none transition-colors duration-300 hover:border-spot/50 focus-visible:border-spot focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          {/* meta row */}
          <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em]">
            <span className="text-spot">({index})</span>
            <span className="text-subtle">{project.category}</span>
          </div>

          {study ? (
            <Link
              to={`/work/${project.slug}`}
              viewTransition
              style={{ viewTransitionName: `project-${project.slug}` }}
              className="w-fit font-serif text-[22px] font-normal leading-none text-foreground transition-colors hover:text-spot @min-[22rem]:text-[26px]"
            >
              {project.name}
            </Link>
          ) : (
            <h3 className="font-serif text-[22px] font-normal leading-none text-foreground @min-[22rem]:text-[26px]">
              {project.name}
            </h3>
          )}
          <p className="mb-4 mt-3 text-[13.5px] font-light leading-[1.6] text-muted-foreground">
            {project.description}
          </p>

          {project.models && (
            <div className="mb-4">
              {project.models.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center justify-between border-b border-border py-2 last:border-none"
                >
                  <div>
                    <span className="block font-mono text-[11px] text-foreground">{m.name}</span>
                    <span className="block font-mono text-[10px] text-subtle">{m.detail}</span>
                  </div>
                  <span
                    className={cn(
                      "rounded-sm border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                      m.live ? "border-spot/30 text-spot" : "border-border text-subtle"
                    )}
                  >
                    {m.live ? "live" : "soon"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {project.hf && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {project.hf.map((h) => (
                <a
                  key={h.label}
                  href={h.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-spot/50 hover:text-spot"
                >
                  🤗 {h.label}
                </a>
              ))}
            </div>
          )}

          <div className="mb-5 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="rounded-sm border-border bg-transparent font-mono text-[10px] font-normal uppercase tracking-wider text-muted-foreground"
              >
                {t}
              </Badge>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4">
            {study && (
              <Link
                to={`/work/${project.slug}`}
                viewTransition
                className="group/cs inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-spot"
              >
                Case study
                <ArrowRight className="size-3.5 transition-transform group-hover/cs:translate-x-0.5" />
              </Link>
            )}
            <ProjLink href={project.github}>GitHub</ProjLink>
            {project.live && <ProjLink href={project.live}>Live</ProjLink>}
            {project.pypi && <ProjLink href={project.pypi}>PyPI</ProjLink>}
            {project.docs && <ProjLink href={project.docs}>Docs</ProjLink>}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export default function Projects() {
  const byName = (n) => projects.find((p) => p.name === n);

  // Roving keyboard navigation across the bento (arrows + j/k).
  function onGridKeyDown(e) {
    const keys = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "j", "k"];
    if (!keys.includes(e.key)) return;
    const cards = Array.from(e.currentTarget.querySelectorAll("[data-card]"));
    const idx = cards.indexOf(document.activeElement);
    if (idx === -1) return;
    e.preventDefault();
    const fwd = e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "j";
    const next = cards[(idx + (fwd ? 1 : -1) + cards.length) % cards.length];
    next?.focus();
  }

  return (
    <section id="projects" className="relative z-10 bg-secondary px-6 py-28">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader number="02" label="What I build" title="Selected Work" />

        <RevealGroup
          className="grid grid-cols-12 gap-4"
          stagger={0.07}
          amount={0.05}
          onKeyDown={onGridKeyDown}
        >
          {layout.map((item, i) => (
            <ProjectCard
              key={item.name}
              project={byName(item.name)}
              span={item.span}
              index={String(i + 1).padStart(2, "0")}
            />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

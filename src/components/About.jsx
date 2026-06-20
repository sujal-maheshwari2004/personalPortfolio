import { testimonials } from "../data";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/motion/Reveal";

const facts = [
  ["Based in", "Gurugram / Dehradun, India"],
  ["Focus", "LLMs · agentic infra · full-stack"],
  ["Currently", "AI Intern @ BeastLife"],
  ["Education", "B.Tech CS · AI & DS (final year)"],
];

export default function About() {
  return (
    <section id="about" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader number="A" label="Who's writing" title="About" />

        <div className="grid gap-10 md:grid-cols-[300px_1fr]">
          {/* portrait — drop a real photo at src/assets/portrait.jpg and import it here */}
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-card">
              <div className="bg-grain absolute inset-0 opacity-[0.06]" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-serif text-[120px] italic leading-none text-foreground/90">
                  SM
                </span>
              </div>
              <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
                Sujal Maheshwari
              </span>
              <span className="absolute right-3 top-3 size-2 rounded-full bg-spot" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="font-serif text-[clamp(22px,2.8vw,30px)] leading-[1.3] text-foreground">
                I&apos;m a final-year CS (AI &amp; DS) student who likes the parts of AI most people
                skip — the <span className="italic text-spot">data pipelines</span>, the resume
                logic, the safety gates — because that&apos;s where production lives.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-[60ch] text-[15px] font-light leading-[1.8] text-muted-foreground">
                I&apos;ve trained a language model from scratch, shipped MCP infrastructure to PyPI,
                built an exchange on Kafka, and designed an agent-to-agent protocol for social
                deduction. I care about systems that actually run — observable, resumable, and
                honest about their failure modes. Lately I&apos;m deep in agentic workflows and the
                tooling that makes them reliable.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
                {facts.map(([k, v]) => (
                  <div key={k} className="bg-card px-4 py-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
                      {k}
                    </dt>
                    <dd className="mt-1 text-[14px] text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {testimonials.length > 0 && (
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {testimonials.map((t) => (
                  <Reveal key={t.name}>
                    <figure className="rounded-lg border border-border bg-card p-5">
                      <blockquote className="font-serif text-[18px] italic leading-snug text-foreground">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-wider text-subtle">
                        {t.name} · {t.role}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

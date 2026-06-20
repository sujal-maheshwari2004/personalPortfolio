import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { links, stats } from "../data";
import { Button } from "@/components/ui/button";
import { RevealGroup, revealItem } from "@/components/motion/Reveal";
import NumberTicker from "@/components/motion/NumberTicker";
import Aurora from "@/components/motion/Aurora";
import Scramble from "@/components/motion/Scramble";
import Magnetic from "@/components/motion/Magnetic";
import Stamp from "@/components/Stamp";
import ErrorBoundary from "@/components/ErrorBoundary";

const ShaderBackdrop = lazy(() => import("@/components/motion/ShaderBackdrop"));

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

const secondaryLinks = [
  { label: "Resume", href: links.resume },
  { label: "GitHub", href: links.github },
  { label: "LinkedIn", href: links.linkedin },
  { label: "HuggingFace", href: links.huggingface },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.7], [0, 60]);

  // Upgrade to the WebGL shader only on capable, non-reduced-motion desktops.
  const [useShader, setUseShader] = useState(false);
  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(min-width: 768px)").matches && supportsWebGL()) setUseShader(true);
  }, [reduce]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-24 pt-32"
    >
      {useShader ? (
        <ErrorBoundary fallback={<Aurora />}>
          <Suspense fallback={<Aurora />}>
            <ShaderBackdrop className="absolute inset-0" />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <Aurora />
      )}

      <Stamp className="absolute right-[max(2rem,calc((100vw-1100px)/2))] top-32 z-10 hidden lg:block" />

      <motion.div
        style={reduce ? undefined : { opacity, y }}
        className="relative z-10 mx-auto w-full max-w-[1100px]"
      >
        <RevealGroup stagger={0.1} amount={0.1}>
          {/* kicker */}
          <motion.div
            variants={revealItem}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-spot opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-spot" />
            </span>
            <Scramble text="Open to opportunities — 2026" />
          </motion.div>

          {/* name */}
          <motion.h1
            variants={revealItem}
            className="mt-6 font-serif text-[clamp(64px,12vw,150px)] font-normal leading-[0.86] tracking-[-0.02em] text-foreground"
          >
            Sujal
            <br />
            <span className="italic">Maheshwari</span>
          </motion.h1>

          {/* role + statement */}
          <motion.p
            variants={revealItem}
            className="mt-7 max-w-[640px] font-serif text-[clamp(22px,3vw,32px)] leading-[1.25] text-foreground"
          >
            Full-Stack <span className="italic text-spot">AI</span> Developer — I build
            production-grade LLM systems, train language models from scratch, and ship agentic
            infrastructure.
          </motion.p>

          <motion.p
            variants={revealItem}
            className="mt-5 max-w-[520px] text-[15px] font-light leading-[1.7] text-muted-foreground"
          >
            Final-year CS (AI &amp; DS) student turning hard engineering problems into things that
            actually run in production.
          </motion.p>

          {/* actions */}
          <motion.div variants={revealItem} className="mt-9 flex flex-wrap items-center gap-2.5">
            <Magnetic>
              <Button asChild className="group rounded-md px-5">
                <a href={links.portfolio} target="_blank" rel="noreferrer">
                  Portfolio
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </Magnetic>
            {secondaryLinks.map((l) => (
              <Button
                key={l.label}
                asChild
                variant="outline"
                className="rounded-md font-mono text-[13px] uppercase tracking-wider transition-transform hover:-translate-y-0.5"
              >
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              </Button>
            ))}
          </motion.div>

          {/* ledger stats */}
          <motion.div
            variants={revealItem}
            className="mt-14 grid grid-cols-2 border-y border-border sm:grid-cols-4"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-5 py-5 ${i !== 0 ? "border-l border-border" : ""} ${
                  i === 2 ? "border-l max-sm:border-l-0" : ""
                } ${i >= 2 ? "max-sm:border-t" : ""}`}
              >
                <div className="font-serif text-[40px] font-normal leading-none text-foreground">
                  <NumberTicker value={Number(s.value)} />
                  <span className="text-spot">{s.unit}</span>
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  {s.label}
                </div>
                <div className="mt-0.5 text-[11px] text-subtle">{s.sub}</div>
              </div>
            ))}
          </motion.div>
        </RevealGroup>
      </motion.div>

      <a
        href="#experience"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle transition-colors hover:text-foreground sm:flex print:hidden"
      >
        <ArrowDown className="size-3.5 animate-bounce" /> scroll
      </a>
    </section>
  );
}

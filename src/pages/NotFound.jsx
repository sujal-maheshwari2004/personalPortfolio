import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useDocumentMeta from "@/hooks/useDocumentMeta";

export default function NotFound() {
  useDocumentMeta({ title: "404 — Sujal Maheshwari", description: "Page not found." });

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-spot">Error · 404</p>
      <h1 className="mt-4 font-serif text-[clamp(72px,16vw,200px)] font-normal leading-none text-foreground">
        Lost<span className="italic">.</span>
      </h1>
      <p className="mt-4 max-w-[40ch] text-[15px] font-light text-muted-foreground">
        This page slipped out of the index. The link may be old, or never existed.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-foreground transition-colors hover:border-spot/50 hover:text-spot"
      >
        <ArrowLeft className="size-3.5" /> Back to index
      </Link>
    </section>
  );
}

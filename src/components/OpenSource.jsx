import { useEffect, useState } from "react";
import { Star, GitFork } from "lucide-react";
import { motion } from "motion/react";
import Reveal, { RevealGroup, revealItem } from "@/components/motion/Reveal";
import SectionHeader from "@/components/SectionHeader";

const USER = "sujal-maheshwari2004";
const CACHE_KEY = "gh-cache-v1";
const TTL = 6 * 60 * 60 * 1000; // 6h

function readCache() {
  try {
    const c = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (c && Date.now() - c.ts < TTL) return c.data;
  } catch {
    /* ignore */
  }
  return null;
}

function digest(repos) {
  const owned = repos.filter((r) => !r.fork);
  const totalStars = owned.reduce((s, r) => s + r.stargazers_count, 0);
  const top = [...owned].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 4);
  const langs = {};
  owned.forEach((r) => r.language && (langs[r.language] = (langs[r.language] || 0) + 1));
  const topLangs = Object.entries(langs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  return { totalStars, repoCount: owned.length, top, topLangs };
}

export default function OpenSource() {
  const [data, setData] = useState(() => readCache());
  const [state, setState] = useState(data ? "ready" : "loading");

  useEffect(() => {
    if (data) return;
    let alive = true;
    fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((repos) => {
        if (!alive || !Array.isArray(repos)) return;
        const d = digest(repos);
        setData(d);
        setState("ready");
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: d }));
        } catch {
          /* ignore */
        }
      })
      .catch(() => alive && setState("error"));
    return () => {
      alive = false;
    };
  }, [data]);

  // Graceful: if GitHub is rate-limited / offline and we have nothing, hide it.
  if (state === "error" && !data) return null;

  return (
    <section id="opensource" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader number="OS" label="Public by default" title="Open Source" />

        {state === "loading" && !data ? (
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-subtle">
            <span className="size-1.5 animate-ping rounded-full bg-spot" /> fetching from github…
          </div>
        ) : (
          <>
            <Reveal className="mb-8 flex flex-wrap gap-x-12 gap-y-4">
              <Stat value={data.totalStars} label="GitHub stars" />
              <Stat value={data.repoCount} label="Public repos" />
            </Reveal>

            <RevealGroup className="grid gap-3 sm:grid-cols-2" stagger={0.07}>
              {data.top.map((r) => (
                <motion.a
                  key={r.id}
                  variants={revealItem}
                  href={r.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col gap-2 rounded-lg border border-border bg-card p-5 transition-colors hover:border-spot/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[13px] text-foreground transition-colors group-hover:text-spot">
                      {r.name}
                    </span>
                    <span className="flex items-center gap-3 font-mono text-[11px] text-subtle">
                      <span className="flex items-center gap-1">
                        <Star className="size-3" /> {r.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="size-3" /> {r.forks_count}
                      </span>
                    </span>
                  </div>
                  <p className="line-clamp-2 text-[13px] font-light leading-snug text-muted-foreground">
                    {r.description || "—"}
                  </p>
                  {r.language && (
                    <span className="mt-auto font-mono text-[10px] uppercase tracking-wider text-subtle">
                      {r.language}
                    </span>
                  )}
                </motion.a>
              ))}
            </RevealGroup>

            {data.topLangs.length > 0 && (
              <Reveal className="mt-8 flex flex-wrap gap-1.5">
                {data.topLangs.map(([lang]) => (
                  <span
                    key={lang}
                    className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                  >
                    {lang}
                  </span>
                ))}
              </Reveal>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-serif text-[40px] font-normal leading-none text-foreground">
        {value}
        <span className="text-spot">+</span>
      </div>
      <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

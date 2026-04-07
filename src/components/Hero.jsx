import { useEffect, useState } from "react";
import { links, stats } from "../data";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-grid" />

      <div className={`hero-inner ${mounted ? "mounted" : ""}`}>
        <div className="hero-badge">
          <span className="badge-dot" />
          Open to opportunities · 2026
        </div>

        <h1 className="hero-name">
          <span className="hero-name-first">Sujal</span>
          <br />
          <span className="hero-name-last">Maheshwari</span>
        </h1>

        <p className="hero-role">Full Stack AI Developer</p>

        <p className="hero-sub">
          Final-year CS (AI &amp; DS) student. I build production-grade LLM
          systems, train language models from scratch, and ship agentic
          infrastructure that solves real engineering problems.
        </p>

        <div className="hero-btns">
          <a href={links.portfolio} className="btn-primary" target="_blank" rel="noreferrer">
            ↗ Portfolio
          </a>
          <a href={links.resume} className="btn-ghost" target="_blank" rel="noreferrer">
            Resume
          </a>
          <a href={links.github} className="btn-ghost" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={links.linkedin} className="btn-ghost" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={links.huggingface} className="btn-ghost" target="_blank" rel="noreferrer">
            HuggingFace
          </a>
        </div>

        <div className="hero-stats">
          {stats.map((s, i) => (
            <div className="hero-stat" key={i} style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
              <div className="stat-num">
                {s.value}<span className="stat-unit">{s.unit}</span>
              </div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <a href="#experience" className="scroll-hint">
        <span>scroll</span>
        <div className="scroll-line" />
      </a>
    </section>
  );
}

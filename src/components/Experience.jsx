import { useState } from "react";
import { experience } from "../data";

export default function Experience() {
  const [active, setActive] = useState(0);

  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <p className="section-eyebrow">Where I've been</p>
        <h2 className="section-title">Experience</h2>

        <div className="exp-layout">
          {/* Tab list */}
          <div className="exp-tabs">
            {experience.map((e, i) => (
              <button
                key={i}
                className={`exp-tab ${active === i ? "active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="exp-tab-co">{e.company}</span>
                <span className="exp-tab-period">{e.period}</span>
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="exp-panel" key={active}>
            <div className="exp-panel-head">
              <div>
                <h3 className="exp-panel-role">{experience[active].role}</h3>
                <p className="exp-panel-co">
                  {experience[active].company} ·{" "}
                  <span className="exp-panel-type">{experience[active].type}</span>
                </p>
                <p className="exp-panel-meta">
                  {experience[active].location} · {experience[active].period}
                </p>
              </div>
            </div>

            <ul className="exp-panel-bullets">
              {experience[active].bullets.map((b, j) => (
                <li key={j} className="exp-bullet" style={{ animationDelay: `${j * 0.07}s` }}>
                  <span className="bullet-dot" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="exp-tags">
              {experience[active].tags.map((t) => (
                <span key={t} className="tag tag-blue">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

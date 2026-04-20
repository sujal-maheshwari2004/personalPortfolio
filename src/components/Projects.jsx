import { projects } from "../data";

const accentMap = {
  green:  { tag: "tag-green",  lbl: "lbl-green"  },
  violet: { tag: "tag-violet", lbl: "lbl-violet"  },
  amber:  { tag: "tag-amber",  lbl: "lbl-amber"   },
  blue:   { tag: "tag-blue",   lbl: "lbl-blue"    },
  indigo: { tag: "tag-indigo", lbl: "lbl-indigo"  },
};

function ProjectCard({ project, wide }) {
  const ac = accentMap[project.accent] || accentMap.blue;
  return (
    <div className={`proj-card ${wide ? "proj-wide" : ""} accent-${project.accent}`}>
      <div className={`proj-lbl ${ac.lbl}`}>{project.category}</div>
      <h3 className="proj-name">{project.name}</h3>
      <p className="proj-desc">{project.description}</p>

      {project.models && (
        <div className="proj-models">
          {project.models.map((m) => (
            <div key={m.name} className="proj-model-row">
              <div>
                <span className="proj-model-name">{m.name}</span>
                <span className="proj-model-detail">{m.detail}</span>
              </div>
              <span className={m.live ? "badge-live" : "badge-soon"}>
                {m.live ? "live" : "soon"}
              </span>
            </div>
          ))}
        </div>
      )}

      {project.hf && (
        <div className="proj-hf-row">
          {project.hf.map((h) => (
            <a key={h.label} href={h.url} className="hf-badge" target="_blank" rel="noreferrer">
              🤗 {h.label}
            </a>
          ))}
        </div>
      )}

      <div className="proj-tags">
        {project.tags.map((t) => (
          <span key={t} className={`tag ${ac.tag}`}>{t}</span>
        ))}
      </div>

      <div className="proj-links">
        <a href={project.github} className="proj-link" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        {project.pypi && (
          <a href={project.pypi} className="proj-link" target="_blank" rel="noreferrer">
            PyPI ↗
          </a>
        )}
        {project.docs && (
          <a href={project.docs} className="proj-link" target="_blank" rel="noreferrer">
            Docs ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [driftguard, librarian, botstreet, ...rest] = projects;

  return (
    <section id="projects" className="section section-dark">
      <div className="section-inner">
        <p className="section-eyebrow">What I build</p>
        <h2 className="section-title">Projects</h2>

        <div className="proj-bento">
          <ProjectCard project={driftguard} wide />
          <ProjectCard project={librarian} wide />
          <ProjectCard project={botstreet} />
          {rest.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

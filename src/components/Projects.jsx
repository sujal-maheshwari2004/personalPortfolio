import { projects } from "../data";

const accentMap = {
  green:  { tag: "tag-green",  lbl: "lbl-green"  },
  violet: { tag: "tag-violet", lbl: "lbl-violet"  },
  amber:  { tag: "tag-amber",  lbl: "lbl-amber"   },
  blue:   { tag: "tag-blue",   lbl: "lbl-blue"    },
  indigo: { tag: "tag-indigo", lbl: "lbl-indigo"  },
};

function ProjectCard({ project, wide, full, narrow }) {
  const ac = accentMap[project.accent] || accentMap.blue;
  return (
    <div className={`proj-card ${wide ? "proj-wide" : ""} ${full ? "proj-full" : ""} ${narrow ? "proj-narrow" : ""} accent-${project.accent}`}>
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
              <span

import { stack, extra } from "../data";

export default function Stack() {
  return (
    <section id="stack" className="section">
      <div className="section-inner">
        <p className="section-eyebrow">Tools of the trade</p>
        <h2 className="section-title">Stack</h2>

        <div className="stack-grid">
          {Object.entries(stack).map(([category, items]) => (
            <div key={category} className="stack-group">
              <h3 className="stack-cat">{category}</h3>
              <div className="stack-tags">
                {items.map((item) => (
                  <span key={item} className="tag tag-mono">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="extra-row">
          {extra.map((item, i) => (
            <div key={i} className="extra-item">
              <span className="extra-dot">✦</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

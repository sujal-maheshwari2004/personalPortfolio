import { links } from "../data";

export default function Contact() {
  return (
    <section id="contact" className="section section-dark">
      <div className="section-inner contact-inner">
        <p className="section-eyebrow">Let's connect</p>
        <h2 className="section-title contact-title">Get in touch</h2>
        <p className="contact-sub">
          Open to internships, research roles, and freelance work in AI, LLMs, and full-stack.
          Always happy to talk about agentic systems, language models, or trading simulations.
        </p>

        <div className="contact-links">
          <a href={links.email} className="contact-link">
            <span className="contact-link-icon">✉</span>
            <span className="contact-link-label">Email</span>
            <span className="contact-link-value">sujalmaheshwari07@gmail.com</span>
          </a>
          <a href={links.linkedin} className="contact-link" target="_blank" rel="noreferrer">
            <span className="contact-link-icon">in</span>
            <span className="contact-link-label">LinkedIn</span>
            <span className="contact-link-value">sujal-maheshwari</span>
          </a>
          <a href={links.github} className="contact-link" target="_blank" rel="noreferrer">
            <span className="contact-link-icon">gh</span>
            <span className="contact-link-label">GitHub</span>
            <span className="contact-link-value">sujal-maheshwari2004</span>
          </a>
          <a href={links.huggingface} className="contact-link" target="_blank" rel="noreferrer">
            <span className="contact-link-icon">🤗</span>
            <span className="contact-link-label">HuggingFace</span>
            <span className="contact-link-value">MaheshwariSujal</span>
          </a>
        </div>

        <a href={links.resume} className="btn-primary contact-resume" target="_blank" rel="noreferrer">
          ↗ Download Resume
        </a>
      </div>
    </section>
  );
}

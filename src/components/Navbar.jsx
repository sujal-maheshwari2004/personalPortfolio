import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Stack", href: "#stack" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      setScrolled(top > 40);
      setProgress(height > 0 ? (top / height) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-progress" style={{ width: `${progress}%` }} />
      <div className="nav-inner">
        <a href="#home" className="nav-logo">SM</a>

        <nav className="nav-links">
          {navLinks.map((l) => (
            <a key={l.name} href={l.href} className="nav-link">
              {l.name}
            </a>
          ))}
        </nav>

        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="menu">
          <span className={open ? "line open-1" : "line"} />
          <span className={open ? "line open-2" : "line"} />
        </button>
      </div>

      {open && (
        <nav className="nav-mobile">
          {navLinks.map((l) => (
            <a key={l.name} href={l.href} className="nav-mobile-link" onClick={() => setOpen(false)}>
              {l.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

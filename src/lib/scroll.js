/** Scroll to a section id, using Lenis if active, else native smooth scroll. */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: 0, duration: 1.1 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Navigate to a home-page section from anywhere. On "/" it smooth-scrolls;
 * elsewhere it routes home and passes the target so Home scrolls on mount.
 */
export function goToSection(navigate, pathname, id) {
  if (pathname === "/") scrollToId(id);
  else navigate("/", { state: { scrollTo: id } });
}

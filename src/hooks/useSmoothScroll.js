import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery momentum scrolling via Lenis. Exposes the instance on
 * window.__lenis (so scrollToId can use it) and delegates in-page anchor
 * clicks to a smooth scroll. No-op under prefers-reduced-motion (native scroll).
 */
export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;

    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const el = id && document.getElementById(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: 0, duration: 1.1 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}

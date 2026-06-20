import { useEffect, lazy, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./Navbar";
import { Grain, PageFrame } from "./Chrome";
import useSmoothScroll from "../hooks/useSmoothScroll";
import { links } from "../data";

const CommandMenu = lazy(() => import("./CommandMenu"));
const Terminal = lazy(() => import("./Terminal"));

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center font-mono text-xs uppercase tracking-[0.2em] text-subtle">
      <span className="size-1.5 animate-ping rounded-full bg-spot" />
      <span className="ml-3">loading</span>
    </div>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  useSmoothScroll();

  // Scroll to top on route change (Home handles section deep-links itself).
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const brand = "color:#d83a1a;font-weight:700;font-size:13px";
    const dim = "color:#9a9384;font-size:12px";
    console.log("%cSujal Maheshwari — Full-Stack AI Developer", brand);
    console.log(
      "%cReading the console? You're exactly the kind of person I want to work with.",
      dim
    );
    console.log(`%cLet's talk → ${links.email.replace("mailto:", "")}`, dim);
    console.log("%cTip: press ⌘K / Ctrl-K anywhere on the page.", dim);
  }, []);

  useEffect(() => {
    const original = "Sujal Maheshwari — Full-Stack AI Developer";
    const onVis = () => {
      document.title = document.hidden ? "↩ come back — Sujal Maheshwari" : original;
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-md focus:border focus:border-border focus:bg-card focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-foreground"
      >
        Skip to content
      </a>
      <PageFrame />
      <Navbar />
      <main id="main" className="relative overflow-x-hidden">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="relative z-10 border-t border-border px-6 py-7 print:hidden">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle sm:flex-row">
          <p>Sujal Maheshwari — {new Date().getFullYear()}</p>
          <p>Built with React · Tailwind · Motion</p>
        </div>
      </footer>
      <Suspense fallback={null}>
        <CommandMenu />
        <Terminal />
      </Suspense>
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: "!bg-card !border-border !text-foreground !font-mono !text-xs !rounded-md",
          },
        }}
      />
      <Grain />
    </>
  );
}

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useScroll } from "motion/react";
import { Menu, Search, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "@/components/theme-toggle";
import Clock from "@/components/Clock";
import { goToSection } from "@/lib/scroll";

const sectionLinks = [
  { name: "Index", id: "home", n: "00" },
  { name: "Experience", id: "experience", n: "01" },
  { name: "Work", id: "projects", n: "02" },
  { name: "Stack", id: "stack", n: "03" },
  { name: "Contact", id: "contact", n: "04" },
];

function openCommand() {
  window.dispatchEvent(new CustomEvent("command:open"));
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const sections = sectionLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 print:hidden ${
        scrolled ? "border-border bg-background/80 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-spot"
      />

      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-5">
          <Link to="/" className="font-serif text-2xl leading-none text-foreground">
            SM<span className="text-spot">.</span>
          </Link>
          <Clock className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground lg:inline-flex lg:items-center" />
        </div>

        <nav className="hidden items-center gap-7 md:flex">
          {sectionLinks.map((l) => (
            <button
              key={l.name}
              onClick={() => goToSection(navigate, pathname, l.id)}
              className={`relative py-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                onHome && active === l.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="mr-1.5 text-spot/70">{l.n}</span>
              {l.name}
              {onHome && active === l.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-spot"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
          <Link
            to="/writing"
            viewTransition
            className="py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="mr-1.5 text-spot/70">W</span>
            Writing
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={openCommand}
            className="mr-1 hidden items-center gap-2 rounded-md border border-border px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-spot/50 hover:text-foreground md:inline-flex"
            aria-label="Open command menu"
          >
            <Search className="size-3.5" />
            <kbd className="font-mono text-[10px] tracking-wider">⌘K</kbd>
          </button>
          <Button
            variant="ghost"
            size="icon"
            onClick={openCommand}
            className="md:hidden"
            aria-label="Open command menu"
          >
            <Search className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.dispatchEvent(new CustomEvent("terminal:open"))}
            className="hidden md:inline-flex"
            aria-label="Open terminal (backtick)"
            title="Terminal — press `"
          >
            <TerminalSquare className="size-[18px]" />
          </Button>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="px-1 font-serif text-2xl">
                Sujal Maheshwari<span className="text-spot">.</span>
              </SheetTitle>
              <nav className="mt-6 flex flex-col">
                {sectionLinks.map((l) => (
                  <SheetClose asChild key={l.name}>
                    <button
                      onClick={() => goToSection(navigate, pathname, l.id)}
                      className="flex items-center gap-3 border-b border-border py-3.5 text-left font-mono text-[13px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="text-spot/70">{l.n}</span>
                      {l.name}
                    </button>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    to="/writing"
                    viewTransition
                    className="flex items-center gap-3 py-3.5 font-mono text-[13px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="text-spot/70">W</span>
                    Writing
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

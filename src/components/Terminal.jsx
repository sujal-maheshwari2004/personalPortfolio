import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useTheme } from "@/components/theme-provider";
import { projects, links } from "../data";

const PROMPT = "sujal@portfolio:~$";
const BANNER = [
  "sujal maheshwari — interactive shell",
  "type `help` for commands · `exit` to close",
];

const OPEN_TARGETS = {
  github: links.github,
  linkedin: links.linkedin,
  huggingface: links.huggingface,
  resume: links.resume,
  site: links.portfolio,
  email: links.email,
};

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState(BANNER);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const missRef = useRef(0); // consecutive unknown commands
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "`" && !/input|textarea/i.test(e.target.tagName)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("terminal:open", onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("terminal:open", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight);
  }, [lines]);

  function print(...out) {
    setLines((l) => [...l, ...out]);
  }

  function run(raw) {
    const cmd = raw.trim();
    print(`${PROMPT} ${cmd}`);
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ").toLowerCase();

    const KNOWN = [
      "help",
      "whoami",
      "ls",
      "cd",
      "open",
      "cat",
      "theme",
      "social",
      "sudo",
      "echo",
      "clear",
      "exit",
    ];
    if (KNOWN.includes(name.toLowerCase())) missRef.current = 0;

    switch (name.toLowerCase()) {
      case "help":
        print(
          "commands:",
          "  whoami            who I am",
          "  ls [projects]     list sections / projects",
          "  cd <section>      jump to a section (experience, work, stack, contact)",
          "  open <target>     github · linkedin · huggingface · resume · site · email",
          "  cat resume        open the résumé",
          "  theme [dark|light] toggle or set the theme",
          "  social            all my links",
          "  clear             clear the screen",
          "  exit              close the terminal"
        );
        break;
      case "whoami":
        print(
          "Sujal Maheshwari — Full-Stack AI Developer.",
          "Builds LLM systems, trains models from scratch, ships agentic infra.",
          "Final-year CS (AI & DS). Open to opportunities."
        );
        break;
      case "ls":
        if (arg.startsWith("proj")) print(...projects.map((p) => `  ${p.name}`));
        else print("  about  experience  work  stack  contact  writing");
        break;
      case "cd": {
        const map = {
          experience: "experience",
          work: "projects",
          projects: "projects",
          stack: "stack",
          contact: "contact",
          about: "about",
          home: "home",
        };
        const id = map[arg];
        if (id) {
          print(`→ ${arg}`);
          setOpen(false);
          setTimeout(() => navigate("/", { state: { scrollTo: id } }), 60);
        } else if (arg === "writing") {
          setOpen(false);
          setTimeout(() => navigate("/writing"), 60);
        } else print(`cd: no such section: ${arg || "(none)"}`);
        break;
      }
      case "open": {
        const url = OPEN_TARGETS[arg];
        if (url) {
          print(`opening ${arg}…`);
          window.open(url, arg === "email" ? "_self" : "_blank");
        } else print(`open: unknown target: ${arg || "(none)"}`);
        break;
      }
      case "cat":
        if (arg === "resume") {
          print("opening résumé…");
          window.open(links.resume, "_blank");
        } else print(`cat: ${arg || "(none)"}: No such file`);
        break;
      case "theme":
        if (arg === "dark" || arg === "light") setTheme(arg);
        else setTheme(theme === "dark" ? "light" : "dark");
        print(`theme → ${arg || (theme === "dark" ? "light" : "dark")}`);
        break;
      case "social":
        print(
          `  github     ${links.github}`,
          `  linkedin   ${links.linkedin}`,
          `  huggingface ${links.huggingface}`,
          `  email      ${links.email.replace("mailto:", "")}`
        );
        break;
      case "sudo":
        print("nice try. you already have root on my attention — just email me.");
        break;
      case "echo":
        print(args.join(" "));
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
        setOpen(false);
        break;
      default:
        missRef.current += 1;
        if (missRef.current < 3) {
          // Honest typos get a normal error first…
          print(`command not found: ${name} — type \`help\``);
        } else {
          // …but keep running unknown scripts and there's only one outcome.
          missRef.current = 0;
          print(
            `command not found: ${name}`,
            "running unknown scripts is dangerous. let me redirect you somewhere safe…",
            "🎵 never gonna give you up — never gonna let you down 🎵"
          );
          setTimeout(
            () => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank", "noopener"),
            700
          );
        }
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      run(input);
      setInput("");
      setHIdx(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const ni = Math.min(hIdx + 1, history.length - 1);
      if (history[ni] !== undefined) {
        setHIdx(ni);
        setInput(history[ni]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const ni = Math.max(hIdx - 1, -1);
      setHIdx(ni);
      setInput(ni === -1 ? "" : history[ni]);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="max-w-2xl gap-0 overflow-hidden border-border bg-[#0c0b08] p-0 font-mono text-[13px] text-[#ece7db]"
      >
        <DialogTitle className="sr-only">Terminal</DialogTitle>
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[11px] uppercase tracking-[0.12em] text-white/40">
            zsh — portfolio
          </span>
        </div>

        <div
          ref={bodyRef}
          data-lenis-prevent
          className="h-[60vh] max-h-[440px] space-y-1 overflow-y-auto px-4 py-3 leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap break-words text-white/80">
              {l}
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-[#ff5630]">{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              className="w-full bg-transparent text-white caret-[#ff5630] outline-none"
              aria-label="terminal input"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

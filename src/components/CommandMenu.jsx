import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowUpRight,
  FileText,
  Home,
  Briefcase,
  FolderGit2,
  Layers,
  Mail,
  Moon,
  Sun,
  PenLine,
  TerminalSquare,
  Copy,
  Code2,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { useTheme } from "@/components/theme-provider";
import { goToSection } from "@/lib/scroll";
import { posts } from "@/lib/content";
import { links } from "../data";

const sections = [
  { id: "home", label: "Index", icon: Home },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Selected Work", icon: FolderGit2 },
  { id: "stack", label: "Stack", icon: Layers },
  { id: "contact", label: "Contact", icon: Mail },
];

const external = [
  { label: "GitHub", href: links.github, icon: GithubIcon },
  { label: "LinkedIn", href: links.linkedin, icon: LinkedinIcon },
  { label: "HuggingFace", href: links.huggingface, emoji: "🤗" },
  { label: "Résumé", href: links.resume, icon: FileText },
  { label: "Email", href: links.email, icon: Mail },
];

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (e.key === "/" && /input|textarea/i.test(e.target.tagName)) return;
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("command:open", onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("command:open", onOpen);
    };
  }, []);

  const run = useCallback((fn) => {
    setOpen(false);
    setTimeout(fn, 80);
  }, []);

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command menu"
      description="Jump anywhere"
    >
      <CommandInput placeholder="Type a command or search…" />
      <CommandList data-lenis-prevent>
        <CommandEmpty>No results.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {sections.map((s) => (
            <CommandItem
              key={s.id}
              value={`go ${s.label}`}
              onSelect={() => run(() => goToSection(navigate, pathname, s.id))}
            >
              <s.icon className="size-4" />
              {s.label}
            </CommandItem>
          ))}
          <CommandItem value="writing blog notes" onSelect={() => run(() => navigate("/writing"))}>
            <PenLine className="size-4" />
            Writing
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Writing">
          {posts.map((p) => (
            <CommandItem
              key={p.slug}
              value={`post ${p.frontmatter.title}`}
              onSelect={() => run(() => navigate(`/writing/${p.slug}`))}
            >
              <PenLine className="size-4" />
              {p.frontmatter.title}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            value="open terminal shell"
            onSelect={() => run(() => window.dispatchEvent(new CustomEvent("terminal:open")))}
          >
            <TerminalSquare className="size-4" />
            Open terminal
            <CommandShortcut>`</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="copy email address"
            onSelect={() =>
              run(() =>
                navigator.clipboard
                  ?.writeText("sujalmaheshwari07@gmail.com")
                  .then(() => toast.success("Email copied"))
              )
            }
          >
            <Copy className="size-4" />
            Copy email
          </CommandItem>
          <CommandItem
            value="view source code github"
            onSelect={() =>
              run(() =>
                window.open("https://github.com/sujal-maheshwari2004/personalPortfolio", "_blank")
              )
            }
          >
            <Code2 className="size-4" />
            View source
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Links">
          {external.map((l) => (
            <CommandItem
              key={l.label}
              value={`open ${l.label}`}
              onSelect={() =>
                run(() => window.open(l.href, l.href.startsWith("mailto") ? "_self" : "_blank"))
              }
            >
              {l.icon ? <l.icon className="size-4" /> : <span className="text-sm">{l.emoji}</span>}
              {l.label}
              <CommandShortcut>
                <ArrowUpRight className="size-3.5" />
              </CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem
            value="toggle theme dark light"
            onSelect={() => run(() => setTheme(theme === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            Switch to {theme === "dark" ? "light" : "dark"} mode
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

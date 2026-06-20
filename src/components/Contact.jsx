import { motion } from "motion/react";
import { toast } from "sonner";
import { ArrowUpRight, Mail, Copy, Contact as ContactIcon } from "lucide-react";
import { links } from "../data";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import Reveal, { RevealGroup, revealItem } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { downloadVCard } from "@/lib/vcard";

const EMAIL = "sujalmaheshwari07@gmail.com";

function copyEmail() {
  navigator.clipboard?.writeText(EMAIL).then(
    () => toast.success("Email copied", { description: EMAIL }),
    () => toast.error("Couldn't copy — long-press to select")
  );
}

const contactRows = [
  {
    icon: Mail,
    label: "Email",
    value: "sujalmaheshwari07@gmail.com",
    href: links.email,
    external: false,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "sujal-maheshwari",
    href: links.linkedin,
    external: true,
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "sujal-maheshwari2004",
    href: links.github,
    external: true,
  },
  {
    icon: null,
    emoji: "🤗",
    label: "HuggingFace",
    value: "MaheshwariSujal",
    href: links.huggingface,
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 bg-secondary px-6 py-28">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-xs text-spot">(04)</span>
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Let's connect
            </span>
          </div>
          <h2 className="max-w-[14ch] font-serif text-[clamp(48px,8vw,104px)] font-normal leading-[0.9] tracking-[-0.01em] text-foreground">
            Let's build something <span className="italic text-spot">good.</span>
          </h2>
          <p className="mt-7 max-w-[520px] text-[15px] font-light leading-[1.7] text-muted-foreground">
            Open to internships, research roles, and freelance work in AI, LLMs, and full-stack.
            Always happy to talk about agentic systems, language models, or trading simulations.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-12 grid gap-0 border-t border-border sm:grid-cols-2"
          stagger={0.07}
        >
          {contactRows.map((row) => {
            const Icon = row.icon;
            return (
              <motion.a
                key={row.label}
                variants={revealItem}
                href={row.href}
                {...(row.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group flex items-center gap-4 border-b border-border px-1 py-5 transition-colors hover:bg-card sm:px-5 [&:nth-child(odd)]:sm:border-r"
              >
                <span className="flex w-5 justify-center text-muted-foreground transition-colors group-hover:text-spot">
                  {Icon ? (
                    <Icon className="size-[18px]" />
                  ) : (
                    <span className="text-base">{row.emoji}</span>
                  )}
                </span>
                <span className="w-24 font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
                  {row.label}
                </span>
                <span className="truncate font-mono text-[13px] text-foreground">{row.value}</span>
                <ArrowUpRight className="ml-auto size-4 shrink-0 text-subtle transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-spot" />
              </motion.a>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-10 flex flex-wrap items-center gap-2.5">
          <Magnetic>
            <Button asChild className="group rounded-md px-5">
              <a href={links.resume} target="_blank" rel="noreferrer">
                Download Résumé
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </Magnetic>
          <Button
            variant="outline"
            onClick={copyEmail}
            className="rounded-md font-mono text-[13px] uppercase tracking-wider"
          >
            <Copy className="size-4" /> Copy email
          </Button>
          <Button
            variant="outline"
            onClick={downloadVCard}
            className="rounded-md font-mono text-[13px] uppercase tracking-wider"
          >
            <ContactIcon className="size-4" /> Save contact
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

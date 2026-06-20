import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export default function ThemeToggle({ className }) {
  const { theme, setTheme } = useTheme();
  const reduce = useReducedMotion();
  const isDark = theme === "dark";
  const next = isDark ? "light" : "dark";

  function applyTheme() {
    // mutate synchronously so the View Transition snapshot captures it
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    setTheme(next);
  }

  function onClick(e) {
    if (reduce || !document.startViewTransition) {
      applyTheme();
      return;
    }
    document.documentElement.style.setProperty("--vt-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--vt-y", `${e.clientY}px`);
    document.documentElement.dataset.vt = next; // direction hint for CSS
    document.startViewTransition(applyTheme);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={`Switch to ${next} mode`}
      className={className}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          {isDark ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}

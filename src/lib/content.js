// Content layer — loads MDX posts + case studies at build via import.meta.glob.

function slugOf(path) {
  return path
    .split("/")
    .pop()
    .replace(/\.mdx$/, "");
}

function readingTime(raw) {
  const text = typeof raw === "string" ? raw : "";
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function build(mods, raws) {
  return Object.entries(mods)
    .map(([path, mod]) => ({
      slug: slugOf(path),
      frontmatter: mod.frontmatter || {},
      Component: mod.default,
      readingTime: readingTime(raws[path]),
    }))
    .sort((a, b) => new Date(b.frontmatter.date || 0) - new Date(a.frontmatter.date || 0));
}

// ── Writing ──────────────────────────────────────────────────────
const postMods = import.meta.glob("../content/writing/*.mdx", { eager: true });
const postRaw = import.meta.glob("../content/writing/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
});
export const posts = build(postMods, postRaw);
export const getPost = (slug) => posts.find((p) => p.slug === slug);

// ── Case studies ─────────────────────────────────────────────────
const workMods = import.meta.glob("../content/work/*.mdx", { eager: true });
const workRaw = import.meta.glob("../content/work/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
});
export const caseStudies = build(workMods, workRaw);
export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
export const hasCaseStudy = (slug) => caseStudies.some((c) => c.slug === slug);

export function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

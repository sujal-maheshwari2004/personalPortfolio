// Generate robots.txt, sitemap.xml, and rss.xml into public/ from content files.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const SITE = "https://sujalmaheshwari.com";

function frontmatter(file) {
  const raw = readFileSync(file, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  const fm = {};
  if (m) {
    for (const line of m[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > -1) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    }
  }
  return fm;
}

function collect(dir) {
  const d = resolve(root, "src/content", dir);
  return readdirSync(d)
    .filter((n) => n.endsWith(".mdx"))
    .map((n) => ({ slug: n.replace(/\.mdx$/, ""), fm: frontmatter(resolve(d, n)) }));
}

const posts = collect("writing");
const work = collect("work");

const routes = [
  { loc: "/", pri: "1.0" },
  { loc: "/writing", pri: "0.7" },
  ...work.map((w) => ({ loc: `/work/${w.slug}`, pri: "0.8" })),
  ...posts.map((p) => ({ loc: `/writing/${p.slug}`, pri: "0.6", date: p.fm.date })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url><loc>${SITE}${r.loc}</loc>${r.date ? `<lastmod>${r.date}</lastmod>` : ""}<priority>${r.pri}</priority></url>`
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Sitemap: ${SITE}/sitemap.xml
`;

const rssItems = posts
  .sort((a, b) => new Date(b.fm.date || 0) - new Date(a.fm.date || 0))
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.fm.title || p.slug)}</title>
      <link>${SITE}/writing/${p.slug}</link>
      <guid>${SITE}/writing/${p.slug}</guid>
      ${p.fm.date ? `<pubDate>${new Date(p.fm.date).toUTCString()}</pubDate>` : ""}
      <description>${escapeXml(p.fm.summary || "")}</description>
    </item>`
  )
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
    <title>Sujal Maheshwari — Writing</title>
    <link>${SITE}/writing</link>
    <description>Notes on LLMs, agents, and systems engineering.</description>
${rssItems}
</channel></rss>
`;

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));
}

writeFileSync(resolve(root, "public/sitemap.xml"), sitemap);
writeFileSync(resolve(root, "public/robots.txt"), robots);
writeFileSync(resolve(root, "public/rss.xml"), rss);
console.log(`[seo] sitemap (${routes.length} urls), robots, rss written`);

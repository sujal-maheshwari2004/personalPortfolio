// Rasterize public/og.svg -> og.png and generate PWA PNG icons from favicon.svg.
// Robust: never throws (keeps the SVG fallbacks if anything goes wrong).
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const f = (p) => resolve(root, p);

const fontFiles = [
  "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff",
  "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff",
  "node_modules/@fontsource/dm-mono/files/dm-mono-latin-400-normal.woff",
  "node_modules/@fontsource/dm-mono/files/dm-mono-latin-500-normal.woff",
]
  .map(f)
  .filter(existsSync);

function render(svgPath, outPath, width, fit = "width") {
  const svg = readFileSync(f(svgPath), "utf8");
  const resvg = new Resvg(svg, {
    fitTo: { mode: fit, value: width },
    font: { fontFiles, loadSystemFonts: true, defaultFontFamily: "Instrument Serif" },
  });
  writeFileSync(f(outPath), resvg.render().asPng());
  console.log(`[og] wrote ${outPath}`);
}

try {
  render("public/og.svg", "public/og.png", 1200, "width");
  render("public/favicon.svg", "public/icon-192.png", 192, "width");
  render("public/favicon.svg", "public/icon-512.png", 512, "width");
} catch (e) {
  console.warn("[og] generation skipped:", e.message);
}

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";

// Build the MDX plugin, then make it ignore query-suffixed ids (e.g. `.mdx?raw`)
// so Vite's core `?raw` loader returns the real source string for reading-time.
const mdxPlugin = mdx({
  remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
  rehypePlugins: [[rehypeShiki, { theme: "vesper" }]],
  providerImportSource: "@mdx-js/react",
});
const mdxTransform = mdxPlugin.transform;
mdxPlugin.transform = function (code, id) {
  if (id.includes("?")) return null;
  return mdxTransform.call(this, code, id);
};

export default defineConfig({
  plugins: [
    { enforce: "pre", ...mdxPlugin },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "og.png", "robots.txt"],
      workbox: {
        navigateFallbackDenylist: [/^\/og\.png/, /\.xml$/],
        // Don't precache the heavy, capability-gated WebGL chunks.
        globIgnores: ["**/three-*.js", "**/ShaderBackdrop-*.js"],
        maximumFileSizeToCacheInBytes: 900 * 1024,
      },
      manifest: {
        name: "Sujal Maheshwari — Full-Stack AI Developer",
        short_name: "Sujal M.",
        description: "LLM systems, agentic infrastructure, and language models from scratch.",
        theme_color: "#0c0b08",
        background_color: "#0c0b08",
        display: "standalone",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-router") || id.includes("/react/") || id.includes("react-dom"))
            return "react";
          if (id.includes("motion")) return "motion";
          if (id.includes("three") || id.includes("@react-three")) return "three";
          if (id.includes("cmdk") || id.includes("radix-ui") || id.includes("@radix-ui"))
            return "ui";
          return "vendor";
        },
      },
    },
  },
});

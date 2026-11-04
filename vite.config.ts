import { fileURLToPath, URL } from "node:url";

import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import react from "@vitejs/plugin-react";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      // MDX runs before React's plugin so lessons get Fast Refresh like any component.
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          // Highlighting happens at build time: no highlighter shipped to the browser.
          // Both themes are emitted as CSS variables and switched by `data-theme` in base.css.
          [
            rehypeShiki,
            {
              themes: { light: "github-light", dark: "github-dark-dimmed" },
              defaultColor: false,
            },
          ],
        ],
      }),
    },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
  ],
  // One alias, `@/` → `src/` (.claude/rules/import-conventions.md); keep in sync with tsconfig.
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});

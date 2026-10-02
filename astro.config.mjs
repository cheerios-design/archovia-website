// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // GitHub Pages project site. For a custom domain or Vercel, set `site` to the domain and remove `base`.
  site: "https://cheerios-design.github.io",
  base: "/archovia-website",
  // Emit about.html, portfolio.html… so the old URLs keep working on GitHub Pages.
  build: { format: "file" },
  vite: { plugins: [tailwindcss()] },
});

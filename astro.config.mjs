// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.archovia.com",
  // Emit about.html, portfolio.html… so the old URLs keep working on GitHub Pages.
  build: { format: "file" },
  vite: { plugins: [tailwindcss()] },
});

import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

export default defineConfig({
  site: "https://nexa-automation.fr",
  output: "static",
  integrations: [sitemap(), react(), mdx(), icon()],
  build: {
    assets: "assets",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

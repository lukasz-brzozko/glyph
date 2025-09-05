import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";
import path from "path";
import glsl from "vite-plugin-glsl";

// https://astro.build/config
export default defineConfig({
  base: "/glyph",
  integrations: [react()],
  site: "https://lukasz-brzozko.github.io",
  vite: {
    plugins: [glsl(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
});

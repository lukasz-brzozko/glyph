// @ts-check
import { defineConfig } from "astro/config";
import path from "path";
import react from "@astrojs/react";
import glsl from "vite-plugin-glsl";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    plugins: [glsl()],
  },
});

import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/fluid-snake/",
  server: {
    watch: {
      usePolling: true, // Enable polling for file changes
    },
  },
});

import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true, // Enable polling for file changes
    },
  },
});

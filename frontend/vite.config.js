import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/user": "http://localhost:4747",
      "/expense": "http://localhost:4747",
    },
  },
  plugins: [react()],
});

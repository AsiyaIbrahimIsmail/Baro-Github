import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api/auth": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/api/lessons": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/api/progress": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/api/ai-tutor": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});

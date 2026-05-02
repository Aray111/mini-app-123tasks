import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/mini-app-123tasks/",
  plugins: [react()],
});
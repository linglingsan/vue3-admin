import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    base: mode === "development" ? "/" : "./",
    server: { port: 3000 },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "/src"),
      },
    },
    plugins: [vue(), vueJsx()],
  });

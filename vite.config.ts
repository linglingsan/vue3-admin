import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import {
  createStyleImportPlugin,
  AndDesignVueResolve,
} from "vite-plugin-style-import";

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
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      createStyleImportPlugin({
        resolves: [AndDesignVueResolve()],
        libs: [
          {
            libraryName: "ant-design-vue",
            esModule: true,
            resolveStyle: (name) => {
              return `ant-design-vue/es/${name}/style/index`;
            },
          },
        ],
      }),
    ],
  });

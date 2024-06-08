import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// 在打包的js产物中注入css,eg:'import xxx.css' 不用使用者手动引入， 但是需要使用者的构建工具支持
// 记得在package.json中 sideEffects: ["**/*.css"]，告诉构建工具这些css文件虽然没有使用，但是不能被树摇优化
import { libInjectCss } from "vite-plugin-lib-inject-css";
//also can use @rollup/plugin-typescript to generate .d.ts files
import dts from "vite-plugin-dts";

import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";

//! demos is for docs, not for build
// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    libInjectCss(),
    dts({ include: ["src"], exclude: ["src/**/demos/*"] }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      formats: ["es"],
      entry: "src/index.ts",
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-aria-components",
        "tailwind-variants",
        "tailwind-merge",
      ],
      input: Object.fromEntries(
        glob
          .sync("src/**/*.{tsx,ts}", { ignore: ["src/**/demos/*"] })
          .map((file) => [
            // This remove `src/` as well as the file extension from each
            // file, so e.g. src/nested/foo.js becomes nested/foo
            relative("src", file.slice(0, file.length - extname(file).length)),
            // This expands the relative paths to absolute paths, so e.g.
            // src/nested/foo becomes /project/src/nested/foo.js
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),

      output: {
        assetFileNames: (assetInfo) => {
          // console.log(assetInfo.name);
          if (assetInfo.name.endsWith(".css")) {
            return "css/" + assetInfo.name;
          }
          return "assets/" + assetInfo.name;
        }, // css文件会在assets目录中
        chunkFileNames: "assets/[name].js",
        entryFileNames: "[name].js",
      },
    },
    minify: command === "build",
  },
  esbuild: {
    drop: command === "build" ? ["console", "debugger"] : [],
    legalComments: "none",
  },
  css: {
    modules: {
      scopeBehaviour: "global",
    },
  },
}));

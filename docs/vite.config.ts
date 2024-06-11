import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react";
import pages, { DefaultPageStrategy } from "vite-plugin-react-pages";

const deps = {
  "react-aria-vendor": ["react-aria-components", "react-aria"],
  "rua-componets": ["rua-components"],
  "react-vendor": [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react-router-dom",
    "react-dom/client",
  ],
};

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, "./"),
  esbuild: {
    drop: ["console", "debugger"],
    legalComments: "none",
  },
  build: {
    rollupOptions: {
      treeshake: true,
      output: {
        // 先console.log看看 打包的文件id 都有哪些
        manualChunks: {
          "react-aria-vendor": ["react-aria-components", "react-aria"],
          "rua-componets": ["rua-components"],
          "react-vendor": [
            "react",
            "react-dom",
            "react/jsx-runtime",
            "react-router-dom",
            "react-dom/client",
          ],
        },
      },
    },
  },
  plugins: [
    react(),
    pages({
      pagesDir: path.join(__dirname, "pages"),
      pageStrategy: new DefaultPageStrategy({
        extraFindPages: async (pagesDir, helpers) => {
          const srcPath = path.join(__dirname, "./src");
          if (String(process.env.SHOW_ALL_COMPONENT_DEMOS) === "true") {
            // show all component demos during dev
            // put them in page `/components/demos/${componentName}`
            helpers.watchFiles(
              srcPath,
              "**/demos/*.{[tj]sx,md?(x)}",
              async function fileHandler(file, api) {
                const { relative, path: demoFilePath } = file;
                const match = relative.match(
                  /(.*)\/demos\/(.*)\.([tj]sx|mdx?)$/,
                );
                if (!match) throw new Error("unexpected file: " + demoFilePath);
                const [_, componentName, demoName] = match;
                const pageId = `/components/demos/${componentName}`;
                // register page data
                api.addPageData({
                  pageId,
                  key: demoName,
                  // register demo runtime data path
                  // it will be consumed by theme-doc
                  // the ?demo query will wrap the module with useful demoInfo
                  dataPath: `${demoFilePath}?demo`,
                  // register demo static data
                  staticData: await helpers.extractStaticData(file),
                });
              },
            );
          }

          // find all component README
          helpers.watchFiles(
            srcPath,
            "**/{README,readme}.md?(x)",
            async function fileHandler(file, api) {
              const { relative, path: markdownFilePath } = file;
              const match = relative.match(/(.*)\/(?:README|readme)\.mdx?$/);
              if (!match)
                throw new Error("unexpected file: " + markdownFilePath);
              const [_, componentName] = match;
              const pageId = `/components/${componentName}`;
              // register page data
              api.addPageData({
                pageId,
                // register page component
                dataPath: markdownFilePath,
                // register static data
                staticData: await helpers.extractStaticData(file),
              });
              // register outlineInfo data
              // it will be consumed by theme-doc
              api.addPageData({
                pageId,
                key: "outlineInfo",
                // the ?outlineInfo query will extract title info from the markdown file and return the data as a js module
                dataPath: `${markdownFilePath}?outlineInfo`,
              });
            },
          );
        },
      }),
    }),
  ],
  resolve: {
    alias: {
      //  引用外部项目，会将外部项目也打包，别这么干
      // "@components": path.resolve(__dirname, "../components"),
    },
  },
  ssr: {
    noExternal: ["@components"],
  },
});

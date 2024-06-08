// 将src中的所有大写开头的目录在 src/index.ts 中统一导出
// const fs = require("fs");
// const path = require("path");

// const srcDir = path.resolve(__dirname, "../src");
// const destFile = path.resolve(__dirname, "../src/index.ts");
// console.log(destFile);

// const files = fs.readdirSync(srcDir);
// for (const file of files) {
//   const filePath = path.resolve(srcDir, file);
//   if (
//     fs.statSync(filePath).isDirectory() &&
//     file[0] === file[0].toUpperCase()
//   ) {
//     console.log(file);
//   }
// }
import { dirname, extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import fs from "fs";

const distFile = "src/index.ts";
const files = glob
  .sync("src/*/index.tsx", {
    ignore: ["src/**/*.d.ts", "src/utils/*", "src/styles/*"],
  })
  .map((item) => {
    const compName = dirname(item, extname(item)); // eg: src/Component
    const relativePath = compName.replace("src/", "./");
    return `export * from "${relativePath}"`;
  });

// 将files中的内容追加到distFile中
const dist =
  `\n\n//inject by import.js,Total: ${files.length}\n` + files.join("\n");
fs.writeFileSync(distFile, dist, { encoding: "utf-8", flag: "a+" });

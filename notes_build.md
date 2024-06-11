## build 编译

vite的lib模式默认是全都一股脑打包到一起，js文件进assets，这样对于直接在html中link引入很好，但是我这是个组件库，不是最终产物，需要保持目录结构，支持treeshake, 所有需要特别配置。

### 每个组件单独入口，打包为单独的chunk

参见[rollupOptions.input](https://www.rollupjs.com/configuration-options/#input)
为组件都作为单独入口，会打包为单独的chunk,这样能保留目录结构，支持treeshake。
手动配置`input`很麻烦，推荐rollup官方推荐的使用`glob`映射目录结构。

```json
rollupOptions:{
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
}
```

### vite-plugin-lib-inject-css

作用:保留 import \*.css

源文件中`import **.css`库模式下没有html引入css,因此会打包成`css in js`， 而组件库完成可以在js文件中保留`import **.css`，只是需要使用者的构建工具支持
**注意:** 记得在package.json中 sideEffects: ["**/*.css"]，告诉构建工具这些css文件虽然没有使用，但是不能被树摇优化
vite config中使用插件:
解决工具: `vite-plugin-lib-inject-css`

```ts
import { libInjectCss } from "vite-plugin-lib-inject-css";
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    libInjectCss(),
    dts({ include: ["src"], exclude: ["src/**/demos/*"] }), //生成.d.ts
  ],
  ...
}))
```

### 修改assets产物目录

```json
rollupOptions:{
      output: {
        assetFileNames: (assetInfo) => {
          // console.log(assetInfo.name);
          if (assetInfo.name.endsWith(".css")) {
            return "css/" + assetInfo.name;
          }
          return "assets/" + assetInfo.name;
        }, // css文件会在assets目录中
      }
}
```

## 手动code-split：manualChunks

打包时，tunks过大警告:

```bash
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
```

参考一下:
[Vue router中的路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)

1. import() 动态导入，把不同路由对应的组件分割成不同的代码块
2. 配置 rollupOptions.output.manualChunks

使用文档生成工具`vite-plugin-react-pages`，内部的路由打包不好动，幸好还能手动分包。

For example:将一些外部包手动分chunk

```json
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
```

但是还不够，manualChunks支持函数模式，先打印看一下信息,再根据文件名或引用次数等情况进行分包

```ts
//id为文件的全路径
    manualChunks(id, { getModuleInfo }) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/.pnpm/")[1]
              .split("/")[0]
              .toString();
          } else {
            console.log("id: ", id);
            return '...'
          }
        },
```

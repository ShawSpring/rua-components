## 导航栏按钮功能太少

menu item居然不能自定义点击事件，我要添加的具有32种主题的switcher,怎么办？

解决方案： 扩展了官方主题，

## 打包错误 Rollup failed to resolve

解决方案：docs目录下,pnpm i -D @mdx-js/react,

```bash
Rollup failed to resolve import "@mdx-js/react" ， 还是老老实实用react吧
error during build: [vite]: Rollup failed to resolve import "@mdx-js/react" from "/home/xcl/code/rua-components/components/README.md".\
```

### 非错误的错误排除

1. TypeScript: Restart TS Server
2. pnpm i 所有包依赖在装一下
3. vscode 重启

## docs 打包产物没有tailwindcss 产物？

解决方案同下：

## 首页tailwindcss 没有生效

点进Components时，延迟加载，才会让tailwindcss生效。

解决方案： 在首页所在的组中，加载一点动态的jsx代码，比如在

```
<Demo src="./src/Button/demos/variants.tsx" />
```

> 猜测应该和vite-react-pages的splitChunks配置有关，一个group是一个chunk，单独加载，
> 而tailwind的css产物是在Guide组没有加载，因为都是些md文件，而components组是写tsx文件才加载。

## 本项目使用的starter

[React Aria Starter](https://github.com/adobe/react-spectrum/tree/main/starters)

## renderProps 作为样式与交互状态的中间层

交互 ==> renderProps ==> 条件渲染

`react-aria-components` 是个无样式的组件库，它处理了交互逻辑以及**aria attributes**，通过修改组件的props来表达状态。
表现形式为：

1. react组件的porps, eg:`isFocusVisible` `isSelected` `isDisabled`
2. DOM元素上的`data-state`属性

使用组件时根据这些props就能编写对应交互状态下的样式，所以这些props叫做[renderProps](https://react-spectrum.adobe.com/react-aria/styling.html#render-props)
例如,当` <Button isDisabled></Button>` 上isDisabled为true时，dom元素上的`data-disabled` 和`disabled`都会相应的设置。

使用`react-aria-components`再次开发样式组件，不需要考虑交互逻辑，只需要在编写renderProps对应的样式即可。

### 基于renderProps编写条件渲染

#### 函数形式

与一般的react组件props不同，类型为 `props|(renderProps)=>props`。  
 props包含的className与children都变成有了函数形式，方便交互状态作为参数来控制className和children条件渲染。
比如,button的className类型如下：

```ts
string |
  ((
    values: ButtonRenderProps & {
      defaultClassName: string | undefined;
    },
  ) => string) |
  undefined;
```

renderProps控制className

```ts
<ListBoxItem
  className={({ isSelected }) => isSelected ? 'selected' : 'unselected'}
>
  Item
</ListBoxItem>
```

renderProps控制children

```ts
<ListBoxItem>
  {({isSelected}) => (
    <>
      {isSelected && <CheckmarkIcon />}
      <span>Item</span>
    </>
  )}
</ListBoxItem>
```

#### css 选择器形式

DOM上的属性选择器，`[data-state]{...}`
tailwind 写法:

```ts
<Popover className="data-[entering]:animate-in data-[entering]:fade-in data-[exiting]:animate-out data-[exiting]:fade-out">
  {/* ... */}
</Popover>
```

使用tailwind插件[tailwindcss-react-aria-components](https://react-spectrum.adobe.com/react-aria/styling.html#plugin), 将`data-[state]` 变成了`state:`variant

Boolean states

```ts
<ListBoxItem className="selected:bg-blue-400 disabled:bg-gray-100">
  Item
</ListBoxItem>
```

Non-boolean states

```ts
<Tabs className="orientation-vertical:flex-row">
  {/* ... */}
</Tabs>
```

## [tailwind-variants](https://www.tailwind-variants.org/docs/getting-started)

参考tva写的类似的库,使用它就避免了写一大堆条件classNames,比如`className={props.size==='sm'?'w-6 ...':'w-8 ...'}`
转而以对象形式定义variants, 在像这样调用就能返回对应的className字符串。

```ts
  <button className={buttonVariants({ size: props.size, color: props.color })}>
    Click me
  </button>
```

## 样式合并

用户自定义的className需要与组件里的className合并。
**样式的优先级与className中的使用顺序无关，与声明顺序有关**，tailwind-merge可以让根据使用顺序合并样式,将用户传入的props.className写后边就能确保覆盖。
一般[tailwind-merge](https://www.npmjs.com/package/tailwind-merge)+[clsx](https://www.npmjs.com/package/clsx)+[class-variance-authority](https://cva.style/docs)写法：

```ts
className={twMerge(clsx(buttonVariants({ type, size, fill, shape })))}
```

而本项目根据starter的方式，使用了[tv](https://www.tailwind-variants.org/)替代cva + 自定义的基于twMerge的helper函数(内部使用了tailwind-merge)。

`tailwind-merge`只能接收字符串，而`react-aria-components`中className的
类型为`string | ((renderProps) => string)`,因此需要特殊处理。

### composeRenderProps 合并renderProps

```ts
import {composeRenderProps} from "react-aria-components";
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({
          ...renderProps,
          variant: props.variant,
          className,
        }),
      )}
```

`utils`文件中提供了更简洁的helper函数

```
import {composeTWRenderProps } from "../utils";
 className={composeTailwindRenderProps(
        props.className,
        button({ variant: props.variant, isDisabled: props.isDisabled }),
      )}
```

### 自定义样式太长的合并

> tailwind-merge提供了`twMerge`与`twJoin`两个函数，`twJoin`仅仅将多个字符串合并，不处理样式冲突，在一个组件内部合并自已定义的样式推荐使用`twJoin`.
> `clsx` 功能类似，单支持字符串、数组、对象形式的合并，但样式冲突还是要`twMerge`, 而复杂的条件样式功能在`tv`/`cva`中，因此`clsx` 不再需要。

```ts
const cls_disabled =
  "disabled:grayscale-[0.8] disabled:cursor-not-allowed disabled:opacity-50";
const cls_interactions =
  "pressed:animate-btn-pop hover:ring-2 hover:bg-opacity-60";
const cls_base = "rounded-btn ring-teal-700 ...";
twJoin(cls_base, cls_disabled, cls_interactions);
```

<br/> 
<br/>
<br/>
<br/>

---

pickup

## tailwind knowledge

### [container](https://tailwindcss.com/docs/container#using-the-container)

tailwind提供了container类
在#app这样的容器中很好用

```
<div id="app" class="container mx-auto">
```

### dark mode

是'dark:' variant支持所有暗黑的主题
使用`where`,简洁，且能容错，个别条件错误不会影响整条css规则
本想写在插件里方便移植，但是插件中不能写darkMode, `addVariant()`中定义的variant又不能覆盖`dark:`,除非换个名称,比如`black:`

```json
 darkMode: [
    "variant",
    [
      ':where([data-theme="dark"] ,\
      [data-theme="synthwave"] ,\
      [data-theme="halloween"] ,\
      [data-theme="forest"] ,\
      [data-theme="aqua"] ,\
      [data-theme="black"] ,\
      [data-theme="luxury"] ,\
      [data-theme="dracula"] ,\
      [data-theme="business"] ,\
      [data-theme="night"] ,\
      [data-theme="coffee"] ,\
      [data-theme="dim"] ,\
      [data-theme="sunset"]) &',
    ],
  ],
```

### grid masonry 瀑布流布局

`grid-template-rows: masonry;`太新了，用不了
纯css中最接近瀑布流布局的是：

```css
{
   grid-auto-rows: 10px;
  grid-auto-flow: row dense;
}
```

在此基础上，只需要：每一行高度设很小，通过js或者手动来设置`grid-row:span ?;`即可。
tailwind写法:

```
grid-autofit-80  grid  grid-flow-row-dense auto-rows-[10px]
```

子项上：`row-span-?`

### chores

postcss配置能根据env使用插件
postcss-import，css文件中的‘@import’导入效率低，使用此插件可以将导入语句换为导入的内容(远程保留),
postcss-preset-env 包含autoprefixer，它的主要功能让你可以写新的css features(包括nested语法),它来编译为兼容版本的css

```
export default ({env}) => ({
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    // postcss-preset-env 包含了postcss-nested和autoprefixer
    'postcss-preset-env': env === 'production' ? {} : false,
  },
});
```

## forced-colors 强制颜色

tailwind: `forced-colors:outline-[Highlight]`

```css
@media (forced-colors: active) {
  .forced-colors\:outline-\[Highlight\] {
    outline-color: Highlight;
  }
}
```

### 关键字

<table>
<tbody>
<tr>
<th width="26%">Theme color in Windows high contrast settings</th>
<th width="37%">Internet Explorer and Microsoft Edge Legacy</th>
<th width="37%">New Microsoft Edge and web standards</th>
</tr>
<tr>
<td width="26%">Text</td>
<td width="37%"><code>WindowText</code></td>
<td width="37%"><code>CanvasText</code></td>
</tr>
<tr>
<td width="26%">Hyperlinks</td>
<td width="37%"><code>-ms-hotlight</code></td>
<td width="37%"><code>LinkText</code></td>
</tr>
<tr>
<td width="26%">Disabled Text</td>
<td width="37%"><code>GrayText</code></td>
</tr>
<tr>
<td width="26%">Selected Text</td>
<td colspan="2" width="37%"><code>HighlightText</code> (foreground), <code>Highlight</code> (background)</td>
</tr>
<tr>
<td width="26%">Button Text</td>
<td colspan="2" width="37%"><code>ButtonText</code> (foreground), <code>ButtonFace</code> (background)</td>
</tr>
<tr>
<td width="26%">Background</td>
<td width="37%"><code>Window</code></td>
<td width="37%"><code>Canvas</code></td>
</tr>
</tbody>
</table>

[keywords reference](https://blogs.windows.com/msedgedev/2020/09/17/styling-for-windows-high-contrast-with-new-standards-for-forced-colors/)

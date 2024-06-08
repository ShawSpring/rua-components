# lai-components

a react component library, created on top of [react-aria-components](https://react-spectrum.adobe.com/react-aria/getting-started.html)

## 💡features

1. 🌓multiple themes (32)
2. 😋support tree shaking

## install

```bash
npm install lai-components
```

## requirements

```json
 "react": "^18.2.0",
 "react-dom": "^18.2.0"
```

## Usage

two ways to use lai-components, ts src or js dist

### dist

```ts
import { Button, Label } from "lai-components";
```

### src

> the **preview** workspace project is an example
> see [preview](preview/README.md)

```ts
import { Button, Label } from "lai-components/src";
```

## Themes

```ts
type Theme =
  | "light"
  | "dark"
  | "system"
  | "corporate"
  | "cupcake"
  | "bumblebee"
  | "wireframe"
  | "halloween"
  | "black"
  | "luxury"
  | "valentine"
  | "emerald"
  | "dracula"
  | "cmyk"
  | "cyberpunk"
  | "retro"
  | "garden"
  | "aqua"
  | "pastel"
  | "fantasy"
  | "lofi"
  | "forest"
  | "autumn"
  | "synthwave"
  | "business"
  | "acid"
  | "lemonade"
  | "night"
  | "coffee"
  | "winter"
  | "dim"
  | "nord"
  | "sunset";
```

color tokens are defined with css variables, see `src/styles/themes.css`
set attribute `data-theme` in html or body element,for expample：

```html
<body data-theme="<your-theme-name>"></body>
```

## Notes to attention

> no need to import css files, it was injected in js file
> **Your bundler tool must be able to handle CSS imports.**

```json
 "browserslist": [
    ">1%",
    "not IE 11"
  ]
```

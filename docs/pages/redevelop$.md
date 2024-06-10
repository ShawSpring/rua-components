---
title: redevelop
order: 10
---

# redevelop with components src

## usage

use `src` sub route

```ts
import { Button } from "rua-components/src";
```

## config

### css import

all the css files imported in js files,so
**Your bundler tool must be able to handle CSS imports.**
recommend using [vite](https://vitejs.dev/)

### tailwindcss

3 modifies in `tailwind.config.js`

1. content `./node_modules/rua-components/src/**/*.{js,ts,jsx,tsx}`, let tailwindcss handle content of src
2. set dark mode with `variant`
3. plugin from `rua-components/plugin` 、`tailwindcss-react-aria-components` and `tailwindcss-animate`

```json
import ruaPlugin from 'rua-components/plugin';
import aria from "tailwindcss-react-aria-components";
import animate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/rua-components/src/**/*.{js,ts,jsx,tsx}',
  ],
    darkMode: [
    "variant",
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
  theme: {
    extend: {},
  },
  plugins: [aria, animate, ruaPlugin()],
};
```

### postcss

following postcss plugins are required

> postcss-preset-env is necessary for compatiblity with modern css, such as `oklch` color spaces

```bash
pnpm install -D postcss postcss-import tailwindcss postcss-preset-env
```

```js
export default ({ env }) => ({
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    // postcss-preset-env can replace postcss-nested and autoprefixer
    "postcss-preset-env": env === "production" ? {} : false,
  },
});
```

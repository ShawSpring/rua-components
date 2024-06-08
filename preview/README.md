# preview for components src

## usage

import from `src` sub route

```ts
import { Button } from "rua-components/src";
```

## requirements

### css import

all the css files imported in js files,so
**Your bundler tool must be able to handle CSS imports.**
recommend using [vite](https://vitejs.dev/)

### tailwindcss

1. content `./node_modules/rua-components/src/**/*.{js,ts,jsx,tsx}`, let tailwindcss handle content of src
2. set dark mode with `variant`
3. plugin from `rua-components/plugin`

```json
import ruaPlugin from 'rua-components/plugin';
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
  plugins: [ruaPlugin()],
};

```

### css module

in vite.config.ts (or other css module config)

```ts
export default defineConfig({
...
  css: {
    modules: {
      scopeBehaviour: 'global',
    },
  },
});
```

### postcss

following postcss plugins are required

```bash
pnpm install -D postcss postcss-import tailwindcss postcss-preset-env
```

```js
export default ({ env }) => ({
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    // postcss-preset-env 包含了postcss-nested和autoprefixer
    "postcss-preset-env": env === "production" ? {} : false,
  },
});
```

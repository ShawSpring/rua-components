import ruaPlugin from "./src/utils/ruaPlugin";
import aria from "tailwindcss-react-aria-components";
import animate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  // constomize the dark mode with data-theme variants
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
  corePlugins: {
    preflight: false /* preset comes with `@tailwindcss base` is disabled */,
  },
  // plugin reference: https://react-spectrum.adobe.com/react-aria/styling.html#plugin
  plugins: [aria, animate, ruaPlugin()],
};
/* type Theme='light'|'dark'|'system'|'corporate'|'cupcake'|'bumblebee'|'wireframe'|'halloween'|'black'|'luxury'|'valentine'|'emerald'|'dracula'|'cmyk'|'cyberpunk'|'retro'|'garden'|'aqua'|'pastel'|'fantasy'|'lofi'|'forest'|'autumn'|'synthwave'|'business'|'acid'|'lemonade'|'night'|'coffee'|'winter'|'dim'|'nord'|'sunset'; */

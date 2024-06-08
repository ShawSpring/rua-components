import componentConfig from "../components/tailwind.config";

componentConfig = {
  ...componentConfig,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/rua-components/src/**/*.{js,ts,jsx,tsx}",
  ],
};
export default componentConfig;

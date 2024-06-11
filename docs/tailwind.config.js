import componentConfig from "../components/tailwind.config";

componentConfig = {
  ...componentConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{jsx,tsx}",
    "./node_modules/rua-components/src/**/*.{js,ts,jsx,tsx}",
  ],
};
export default componentConfig;

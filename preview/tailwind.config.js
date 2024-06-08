import componentConfig from "../components/tailwind.config";

componentConfig = {
  ...componentConfig,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/lai-components/src/**/*.{js,ts,jsx,tsx}",
  ],
};
export default componentConfig;

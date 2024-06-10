/** @type {import('postcss-load-config').Config} */
export default ({ env }) => ({
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    // postcss-preset-env 包含了postcss-nested和autoprefixer
    "postcss-preset-env": { stage: 2, browsers: "last 2 versions" },
  },
});

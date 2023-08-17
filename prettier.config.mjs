import prettierTailwind from "prettier-plugin-tailwindcss";

/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  tailwindConfig: "./packages/tailwind/tailwind.config.mjs",
  plugins: [prettierTailwind],
};

export default config;

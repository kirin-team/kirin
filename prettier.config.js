module.exports = {
  singleQuote: true,
  tailwindConfig: './packages/tailwind/tailwind.config.cjs',
  plugins: [require('prettier-plugin-tailwindcss')],
};

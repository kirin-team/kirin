module.exports = {
  root: true,
  extends: ["next"],
  parserOptions: { babelOptions: { presets: [require.resolve("next/babel")] } },
  rules: {
    "react-hooks/exhaustive-deps": "off",
    "react-hooks/rules-of-hooks": "off",
    "jsx-a11y/role-has-required-aria-props": "off",
  },
  settings: { next: { rootDir: ["apps/*/"] } },
};

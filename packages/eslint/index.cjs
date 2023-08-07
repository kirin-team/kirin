// @ts-check

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['next', 'turbo', 'prettier'],
  parserOptions: { babelOptions: { presets: [require.resolve('next/babel')] } },
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'jsx-a11y/role-has-required-aria-props': 'off',
  },
};

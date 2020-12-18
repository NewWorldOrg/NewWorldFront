// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: [
      '@typescript-eslint/parser'
    ],
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    jest: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'prettier',
    'plugin:prettier/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'react-hooks'
  ],
  // add your custom rules here
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  }
}

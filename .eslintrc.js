module.exports = {
  env: {
    es6: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:jsdoc/recommended',
    'plugin:import/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    fetch: 'writeable',
    __RewireAPI__: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['jest', 'import', 'jsdoc', 'node'],
  overrides: [
    {
      files: ['*.test.js', '*.spec.js'],
      rules: {
        'max-lines-per-function': 'off',
        'no-underscore-dangle': 'off',
      },
    },
  ],
  rules: {
    'node/no-unsupported-features/es-syntax': 'off',
  },
  settings: {
    'import/ignore': ['themeManager.js'],
  },
}

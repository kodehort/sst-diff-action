/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: ['vitest', '@typescript-eslint'],

  extends: [
    'plugin:github/recommended',
    'plugin:vitest/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'i18n-text/no-en': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports' },
    ],
  },
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: ['**/*.config.js', '**/*.config.cjs', '**/*.config.ts'],
  reportUnusedDisableDirectives: true,
}

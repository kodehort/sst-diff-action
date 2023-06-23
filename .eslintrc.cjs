/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['plugin:github/recommended', '@kodehort/eslint-config'],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'i18n-text/no-en': 'off',
    'import/extensions': 'off',
    'no-constant-condition': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    'perfectionist/sort-imports': 'off',
    'n/no-missing-import': 'off',
    'eslint-comments/no-use': 'off',
  },
  root: true,
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: ['**/*.config.ts', '.eslintrc.cjs'],
  reportUnusedDisableDirectives: true,
}

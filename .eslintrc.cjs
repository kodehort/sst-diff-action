/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['plugin:github/recommended', '@kodehort/eslint-config'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  reportUnusedDisableDirectives: true,
  root: true,
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    'eslint-comments/no-use': 'off',
    // This is within the github/recommended and it is a pain
    'filenames/match-regex': 'off',
    'i18n-text/no-en': 'off',
    'import/extensions': 'off',
    'no-constant-condition': 'off',
  },
}

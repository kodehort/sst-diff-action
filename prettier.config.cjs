/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  arrowParens: 'always',
  printWidth: 80,
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  tabWidth: 2,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: ['^@/(.*)$', '^[./]'],
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
}

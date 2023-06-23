/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  arrowParens: 'always',
  importOrder: ['<THIRD_PARTY_MODULES>', '<BUILTIN_MODULES>', '', '^[./]'],
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
  plugins: [require.resolve('@ianvs/prettier-plugin-sort-imports')],
  printWidth: 80,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
}

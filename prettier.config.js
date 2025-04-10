import greenacesso from '@greenacesso/prettier-config'

export default greenacesso({
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'always',
  jsxSingleQuote: true,
  jsxBracketSameLine: false,
  semi: false,
  bracketSpacing: true,
  bracketSameLine: false,
  plugins: ['@greenacesso/prettier-plugin-package-json']
})

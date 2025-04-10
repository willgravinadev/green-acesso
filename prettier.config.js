import ecomverzo from '@ecomverzo/prettier-config'

export default ecomverzo({
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
  plugins: ['@ecomverzo/prettier-plugin-package-json']
})

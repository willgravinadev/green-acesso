import ecomverzo from '@ecomverzo/eslint-config'

export default ecomverzo({
  project: './tsconfig.json',
  tsconfigRootDir: import.meta.dirname,
  turbo: true
})

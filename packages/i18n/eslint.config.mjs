import greenacesso from '@greenacesso/eslint-config'

export default greenacesso({
  project: './tsconfig.json',
  tsconfigRootDir: import.meta.dirname,
  turbo: true
})

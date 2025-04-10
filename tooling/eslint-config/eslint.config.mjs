import greenacesso from './dist/index.js'

export default greenacesso(
  {
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.dirname,
    react: true,
    next: true,
    playwright: true,
    testingLibrary: true,
    turbo: true,
    typescript: true
  },
  {
    ignores: ['eslint.config.bundled_*.mjs']
  }
)

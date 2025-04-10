import greenacesso from '@greenacesso/eslint-config'

export default greenacesso(
  {
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.dirname,
    typescript: true,
    turbo: true
  },
  {
    rules: {
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      'unicorn/no-array-reduce': 'off'
    }
  }
)

import ecomverzo from '@ecomverzo/eslint-config'

export default ecomverzo(
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

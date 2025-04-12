import greenacesso from '@greenacesso/eslint-config'

export default greenacesso(
  {
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.dirname,
    turbo: true,
    typescript: true
  },
  {
    rules: {
      'sonarjs/no-async-constructor': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      'sonarjs/cognitive-complexity': ['error', 20]
    }
  }
)

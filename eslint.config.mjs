import greenacesso from '@greenacesso/eslint-config'

export default greenacesso(
  {
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.dirname,
    turbo: true
  },
  {
    ignores: [
      'apps/**',
      'packages/**',
      'tooling/**',
      'eslint.config.bundled_*.mjs',
      'build/*',
      'dist/*',
      'node_modules/*',
      '.turbo/*',
      '.next/*',
      '.changeset/*',
      '**/eslint.config.bundled_*.mjs',
      'build/*',
      'dist/*',
      'node_modules/*',
      '.turbo/*',
      '.next/*',
      '.changeset/*'
    ]
  }
)

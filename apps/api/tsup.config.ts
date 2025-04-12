import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src'],
  splitting: false,
  sourcemap: true,
  clean: true,
  noExternal: [
    '@greenacesso/domain',
    '@greenacesso/logger',
    '@greenacesso/utils',
    '@greenacesso/database',
    '@greenacesso/queue'
  ]
})

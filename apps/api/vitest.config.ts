import { mergeConfig } from 'vitest/config'

import { sharedProjectConfig } from '../../vitest.shared'

const resolve = (path: string) => new URL(path, import.meta.url).pathname

export default mergeConfig(sharedProjectConfig, {
  test: {
    globals: true,
    environment: 'node'
  },
  resolve: {
    alias: {
      '@controllers': resolve('./src/controllers'),
      '@factories': resolve('./src/factories'),
      '@server': resolve('./src/server'),
      '@use-cases': resolve('./src/use-cases')
    }
  }
})

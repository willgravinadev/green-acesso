import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const databaseKeys = () =>
  createEnv({
    server: {
      DATABASE_URL: z.string().url()
    },
    shared: {
      NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
    },
    runtimeEnv: {
      DATABASE_URL: process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV
    },
    emptyStringAsUndefined: true
  })

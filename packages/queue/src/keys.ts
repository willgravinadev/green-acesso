import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const queueKeys = () =>
  createEnv({
    server: {
      REDIS_HOST: z.string().min(1),
      REDIS_PORT: z
        .string()
        .min(1)
        .transform((val) => Number.parseInt(val))
    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true
  })

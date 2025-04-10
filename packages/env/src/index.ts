import { createEnv } from '@t3-oss/env-nextjs'
import { vercel } from '@t3-oss/env-nextjs/presets-zod'
import { z } from 'zod'

export const env = createEnv({
  skipValidation: !!process.env.CI,
  extends: [vercel()],

  shared: {
    PORT: z
      .string()
      .transform((val) => Number.parseInt(val))
      .optional(),
    NODE_ENV: z.enum(['local', 'development', 'production', 'test']).default('local'),
    JWT_SECRET: z.string().min(1),
    JWT_ISSUER: z.string().min(1),
    JWT_ALGORITHM: z.enum(['HS256', 'HS384', 'HS512']),
    JWT_EXPIRES_IN_DAYS: z.coerce.number().min(1),
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().min(1)
  },
  server: {
    DATABASE_URL: z.string().url()
  },
  client: {},
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ISSUER: process.env.JWT_ISSUER,
    JWT_ALGORITHM: process.env.JWT_ALGORITHM,
    JWT_EXPIRES_IN_DAYS: process.env.JWT_EXPIRES_IN_DAYS,
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
  },

  emptyStringAsUndefined: true
})

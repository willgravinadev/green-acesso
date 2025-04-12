import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

/**
 * Storage environment configuration with validation
 * Provides type-safe access to storage-related environment variables
 */
export const storageKeys = () =>
  createEnv({
    server: {
      // R2 Storage credentials
      R2_ACCESS_KEY_ID: z.string().min(1, 'R2 Access Key ID is required'),
      R2_SECRET_ACCESS_KEY: z.string().min(1, 'R2 Secret Access Key is required'),
      R2_ENDPOINT: z.string().url('R2 Endpoint must be a valid URL'),

      // Local storage configuration
      LOCAL_STORAGE_URL: z.string().url('Local storage URL must be a valid URL'),

      // Provider selection
      STORAGE_PROVIDER: z.enum(['local', 'r2'], { description: 'Must be either "local" or "r2"' })
    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true
  })

import { databaseKeys } from '@greenacesso/database'
import { queueKeys } from '@greenacesso/queue'
import { storageKeys } from '@greenacesso/storage'
import { createEnv } from '@t3-oss/env-core'

export const env = createEnv({
  extends: [storageKeys(), databaseKeys(), queueKeys()],
  server: {},
  runtimeEnv: {},
  emptyStringAsUndefined: true
})

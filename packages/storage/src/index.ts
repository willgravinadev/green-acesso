import type { IUploadPDFStoreProvider } from '@greenacesso/domain'

import { makeLoggerProvider } from '@greenacesso/logger'

import { storageKeys } from './keys'
import { LocalStorageProvider } from './providers/local.storage-provider'
import { R2StorageProvider } from './providers/r2.storage-provider'

export const makeStorageProvider = (): IUploadPDFStoreProvider => {
  return storageKeys().STORAGE_PROVIDER === 'r2'
    ? new R2StorageProvider(makeLoggerProvider(), {
        R2_ACCESS_KEY_ID: storageKeys().R2_ACCESS_KEY_ID,
        R2_SECRET_ACCESS_KEY: storageKeys().R2_SECRET_ACCESS_KEY,
        R2_ENDPOINT: storageKeys().R2_ENDPOINT
      })
    : new LocalStorageProvider(makeLoggerProvider(), {
        LOCAL_STORAGE_URL: storageKeys().LOCAL_STORAGE_URL
      })
}

export * from './keys'

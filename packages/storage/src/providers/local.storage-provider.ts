import fs from 'node:fs'
import path from 'node:path'

import {
  type ISendLogErrorLoggerProvider,
  type IUploadPDFStoreProvider,
  ProviderError,
  ProvidersNames,
  StorageProviderMethods,
  type UploadPDFStoreProviderDTO
} from '@greenacesso/domain'
import { failure, success } from '@greenacesso/utils'

export class LocalStorageProvider implements IUploadPDFStoreProvider {
  constructor(
    private readonly loggerProvider: ISendLogErrorLoggerProvider,
    private readonly environments: { LOCAL_STORAGE_URL: string }
  ) {}

  // eslint-disable-next-line @typescript-eslint/require-await -- This is a mock implementation
  public async uploadPDF(
    parameters: UploadPDFStoreProviderDTO.Parameters
  ): UploadPDFStoreProviderDTO.Result {
    try {
      const { filename, pdf, bucket } = parameters

      const directory = path.join(process.cwd(), '..', '..', 'tmp', 'pdf', bucket)

      fs.mkdirSync(directory, { recursive: true })

      fs.writeFileSync(path.join(directory, filename), pdf)

      const fileUrl = `${this.environments.LOCAL_STORAGE_URL}/files/${bucket}/${filename}`

      return success({ url: fileUrl })
    } catch (error: unknown) {
      this.loggerProvider.sendLogError({
        message: 'Failed to upload pdf to Local Storage',
        value: error
      })

      return failure(
        new ProviderError({
          error,
          provider: {
            name: ProvidersNames.STORAGE,
            method: StorageProviderMethods.UPLOAD_PDF,
            externalName: 'local'
          }
        })
      )
    }
  }
}

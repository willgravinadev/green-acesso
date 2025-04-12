import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import {
  type ISendLogErrorLoggerProvider,
  type IUploadPDFStoreProvider,
  ProviderError,
  ProvidersNames,
  StorageProviderMethods,
  type UploadPDFStoreProviderDTO
} from '@greenacesso/domain'
import { failure, success } from '@greenacesso/utils'

export class R2StorageProvider implements IUploadPDFStoreProvider {
  private readonly s3: S3Client

  constructor(
    private readonly loggerProvider: ISendLogErrorLoggerProvider,
    private readonly environments: {
      R2_ACCESS_KEY_ID: string
      R2_SECRET_ACCESS_KEY: string
      R2_ENDPOINT: string
    }
  ) {
    this.s3 = new S3Client({
      region: 'auto',
      endpoint: this.environments.R2_ENDPOINT,
      credentials: {
        accessKeyId: this.environments.R2_ACCESS_KEY_ID,
        secretAccessKey: this.environments.R2_SECRET_ACCESS_KEY
      }
    })
  }

  public async uploadPDF(
    parameters: UploadPDFStoreProviderDTO.Parameters
  ): UploadPDFStoreProviderDTO.Result {
    try {
      const { filename, pdf, bucket } = parameters

      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: filename,
        Body: pdf
      })

      const result = await this.s3.send(command)

      if (result.$metadata.httpStatusCode !== 200) {
        return failure(
          new ProviderError({
            error: new Error('Failed to upload pdf'),
            provider: {
              name: ProvidersNames.STORAGE,
              method: StorageProviderMethods.UPLOAD_PDF
            }
          })
        )
      }

      return success({ url: `https://${bucket}.${this.environments.R2_ENDPOINT}/${filename}` })
    } catch (error: unknown) {
      this.loggerProvider.sendLogError({
        message: 'Failed to upload pdf to R2 Storage',
        value: error
      })

      return failure(
        new ProviderError({
          error,
          provider: {
            name: ProvidersNames.STORAGE,
            method: StorageProviderMethods.UPLOAD_PDF
          }
        })
      )
    }
  }
}

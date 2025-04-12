import { StatusError } from './status-error'

type ParametersConstructorDTO = {
  error: Error | unknown
  provider: {
    name: ProvidersNames
    method: QueueProviderMethods | StorageProviderMethods | PDFProviderMethods
    externalName?: 'bee-queue' | 'bullmq' | 'sqs' | 'pdf-lib' | 'local'
  }
}

export enum ProvidersNames {
  QUEUE = 'queue',
  STORAGE = 'storage',
  PDF = 'pdf'
}

export enum QueueProviderMethods {
  ENQUEUE_PAYMENT_SLIP_IMPORT = 'enqueue payment slip import'
}

export enum StorageProviderMethods {
  UPLOAD_PDF = 'upload pdf'
}

export enum PDFProviderMethods {
  GET_PAGES = 'get pages'
}

export class ProviderError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name = 'ProviderError'

  readonly errorValue: Error | unknown

  constructor(parameters: ParametersConstructorDTO) {
    this.errorMessage = `Error in ${parameters.provider.name} provider in ${parameters.provider.method} method.${
      parameters.provider.externalName === undefined
        ? ''
        : ` Error in external lib name: ${parameters.provider.externalName}.`
    }`
    this.status = StatusError.PROVIDER_ERROR
    this.errorValue = parameters.error
  }
}

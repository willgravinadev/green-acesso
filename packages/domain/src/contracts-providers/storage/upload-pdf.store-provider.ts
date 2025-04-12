import type { ProviderError } from '../../errors/_shared/provider.error'

import { type Either } from '@greenacesso/utils'

export namespace UploadPDFStoreProviderDTO {
  export type Parameters = Readonly<{
    filename: string
    pdf: Buffer
    bucket: 'payment-slips'
  }>

  export type ResultFailure = Readonly<ProviderError>
  export type ResultSuccess = Readonly<{ url: string }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface IUploadPDFStoreProvider {
  uploadPDF(parameters: UploadPDFStoreProviderDTO.Parameters): UploadPDFStoreProviderDTO.Result
}

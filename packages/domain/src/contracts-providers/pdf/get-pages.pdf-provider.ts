import type { ProviderError } from '../../errors/_shared/provider.error'

import { type Either } from '@greenacesso/utils'

export namespace GetPagesPDFProviderDTO {
  export type Parameters = Readonly<{ pdfBuffer: Buffer }>

  export type ResultFailure = Readonly<ProviderError>
  export type ResultSuccess = Readonly<{ pdfPages: Buffer[] }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface IGetPagesPDFProvider {
  getPages(parameters: GetPagesPDFProviderDTO.Parameters): GetPagesPDFProviderDTO.Result
}

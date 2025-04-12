import type { RepositoryError } from '../../errors/_shared/repository.error'
import type { CondominiumLot } from '../../models/condominium-lot.model'
import type { PaymentSlip } from '../../models/payment-slip.model'
import type { ID } from '../../value-objects/id.value-object'

import { type Either } from '@greenacesso/utils'

export namespace SearchPaymentSlipsRepositoryDTO {
  export type Parameters = Readonly<{
    searchParams: {
      payerName?: string
      paymentSlipID?: ID
      startAmountInCents?: number
      endAmountInCents?: number
    }
    orderByCondominiumLotName?: 'asc' | 'desc'
  }>

  export type ResultFailure = Readonly<RepositoryError>

  export type FoundPaymentSlip = Readonly<
    Pick<PaymentSlip, 'id' | 'deletedAt' | 'amountInCents' | 'barcode' | 'payerName' | 'status'> & {
      condominiumLot: Pick<CondominiumLot, 'name' | 'status'>
    }
  >
  export type ResultSuccess = Readonly<{
    foundPaymentSlips: FoundPaymentSlip[]
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface ISearchPaymentSlipsRepository {
  search(
    parameters: SearchPaymentSlipsRepositoryDTO.Parameters
  ): SearchPaymentSlipsRepositoryDTO.Result
}

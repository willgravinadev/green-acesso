import { type Either } from '@greenacesso/utils'

import { type ProviderError } from '../../errors/_shared/provider.error'
import { type CondominiumLot } from '../../models/condominium-lot.model'
import { type PaymentSlip } from '../../models/payment-slip.model'

export namespace EnqueuePaymentSlipImportQueueProviderDTO {
  export type Parameters = Readonly<{
    paymentSlip: Pick<PaymentSlip, 'amountInCents' | 'barcode' | 'payerName'> & {
      condominiumLot: Pick<CondominiumLot, 'name'>
    }
  }>

  export type ResultFailure = Readonly<ProviderError>
  export type ResultSuccess = Readonly<{ messageID: string }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface IEnqueuePaymentSlipImportQueueProvider {
  enqueuePaymentSlipImport(
    parameters: EnqueuePaymentSlipImportQueueProviderDTO.Parameters
  ): EnqueuePaymentSlipImportQueueProviderDTO.Result
}

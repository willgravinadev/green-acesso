import type { ProviderError } from '../../errors/_shared/provider.error'
import type { CondominiumLot } from '../../models/condominium-lot.model'
import type { PaymentSlip } from '../../models/payment-slip.model'

import { type Either } from '@greenacesso/utils'

export namespace CreatePDFReportPaymentSlipsProviderDTO {
  export type Parameters = Readonly<{
    paymentSlips: Array<
      Pick<PaymentSlip, 'id' | 'amountInCents' | 'barcode' | 'payerName' | 'status'> & {
        condominiumLot: Pick<CondominiumLot, 'name' | 'status'>
      }
    >
  }>

  export type ResultFailure = Readonly<ProviderError>
  export type ResultSuccess = Readonly<{
    pdfPath: string
    pdfInBase64: string
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface ICreatePDFReportPaymentSlipsProvider {
  createPDFReportPaymentSlips(
    parameters: CreatePDFReportPaymentSlipsProviderDTO.Parameters
  ): CreatePDFReportPaymentSlipsProviderDTO.Result
}

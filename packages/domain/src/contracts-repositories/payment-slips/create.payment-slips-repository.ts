import type { RepositoryError } from '../../errors/_shared/repository.error'
import type { PaymentSlip } from '../../models/payment-slip.model'

import { type Either } from '@greenacesso/utils'

export namespace CreatePaymentSlipsRepositoryDTO {
  export type Parameters = Readonly<{ paymentSlip: PaymentSlip }>

  export type ResultFailure = Readonly<RepositoryError>

  export type ResultSuccess = Readonly<null>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface ICreatePaymentSlipsRepository {
  create(
    parameters: CreatePaymentSlipsRepositoryDTO.Parameters
  ): CreatePaymentSlipsRepositoryDTO.Result
}

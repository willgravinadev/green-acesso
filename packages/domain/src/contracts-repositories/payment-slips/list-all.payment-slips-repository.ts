import type { RepositoryError } from '../../errors/_shared/repository.error'
import type { CondominiumLot } from '../../models/condominium-lot.model'
import type { PaymentSlip } from '../../models/payment-slip.model'

import { type Either } from '@greenacesso/utils'

export namespace ListAllPaymentSlipsRepositoryDTO {
  export type ResultFailure = Readonly<RepositoryError>

  export type FoundPaymentSlip = Readonly<
    Pick<PaymentSlip, 'id' | 'deletedAt'> & { condominiumLot: Pick<CondominiumLot, 'name'> }
  >
  export type ResultSuccess = Readonly<{
    foundPaymentSlips: FoundPaymentSlip[]
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface IListAllPaymentSlipsRepository {
  listAll(): ListAllPaymentSlipsRepositoryDTO.Result
}

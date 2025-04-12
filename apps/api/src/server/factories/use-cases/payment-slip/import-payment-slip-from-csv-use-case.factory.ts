import type { UseCase } from '@greenacesso/domain'

import { makeCondominiumLotsRepository, makePaymentSlipsRepository } from '@greenacesso/database'
import { makeLoggerProvider } from '@greenacesso/logger'
import {
  ImportPaymentSlipFromCSVUseCase,
  type ImportPaymentSlipFromCSVUseCaseDTO
} from '@use-cases/payment-slip/import-payment-slip-from-csv.use-case'

export const makeImportPaymentSlipFromCSVUseCase = (): UseCase<
  ImportPaymentSlipFromCSVUseCaseDTO.Parameters,
  ImportPaymentSlipFromCSVUseCaseDTO.ResultFailure,
  ImportPaymentSlipFromCSVUseCaseDTO.ResultSuccess
> =>
  new ImportPaymentSlipFromCSVUseCase(
    makeLoggerProvider(),
    makeCondominiumLotsRepository(),
    makePaymentSlipsRepository()
  )

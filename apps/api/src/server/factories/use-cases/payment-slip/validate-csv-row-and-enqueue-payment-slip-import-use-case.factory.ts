import type { UseCase } from '@greenacesso/domain'

import { makeLoggerProvider } from '@greenacesso/logger'
import { makeQueueProvider } from '@greenacesso/queue'
import {
  ValidateCSVRowAndEnqueuePaymentSlipImportUseCase,
  type ValidateCSVRowAndEnqueuePaymentSlipImportUseCaseDTO
} from '@use-cases/payment-slip/validate-csv-row-and-enqueue-payment-slip-import.use-case'

export const makeValidateCSVRowAndEnqueuePaymentSlipImportUseCase = (): UseCase<
  ValidateCSVRowAndEnqueuePaymentSlipImportUseCaseDTO.Parameters,
  ValidateCSVRowAndEnqueuePaymentSlipImportUseCaseDTO.ResultFailure,
  ValidateCSVRowAndEnqueuePaymentSlipImportUseCaseDTO.ResultSuccess
> => {
  return new ValidateCSVRowAndEnqueuePaymentSlipImportUseCase(
    makeLoggerProvider(),
    makeQueueProvider()
  )
}

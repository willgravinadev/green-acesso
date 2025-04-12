import type { UseCase } from '@greenacesso/domain'

import { makePaymentSlipsRepository } from '@greenacesso/database'
import { makeLoggerProvider } from '@greenacesso/logger'
import { makePDFProvider } from '@greenacesso/pdf'
import { makeStorageProvider } from '@greenacesso/storage'
import {
  ImportPaymentSlipFromPDFUseCase,
  type ImportPaymentSlipFromPDFUseCaseDTO
} from '@use-cases/payment-slip/import-payment-slip-from-pdf.use-case'

export const makeImportPaymentSlipFromPDFUseCase = (): UseCase<
  ImportPaymentSlipFromPDFUseCaseDTO.Parameters,
  ImportPaymentSlipFromPDFUseCaseDTO.ResultFailure,
  ImportPaymentSlipFromPDFUseCaseDTO.ResultSuccess
> =>
  new ImportPaymentSlipFromPDFUseCase(
    makeLoggerProvider(),
    makePaymentSlipsRepository(),
    makePDFProvider(),
    makeStorageProvider()
  )

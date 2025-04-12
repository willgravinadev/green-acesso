import type { UseCase } from '@greenacesso/domain'

import { makePaymentSlipsRepository } from '@greenacesso/database'
import { makeLoggerProvider } from '@greenacesso/logger'
import { makePDFProvider } from '@greenacesso/pdf'
import {
  ExportPaymentSlipsReportAsPDFUseCase,
  type ExportPaymentSlipsReportAsPDFUseCaseDTO
} from '@use-cases/payment-slip/export-payment-slips-report-as-pdf.use-case'

export const makeExportPaymentSlipsReportAsPDFUseCase = (): UseCase<
  ExportPaymentSlipsReportAsPDFUseCaseDTO.Parameters,
  ExportPaymentSlipsReportAsPDFUseCaseDTO.ResultFailure,
  ExportPaymentSlipsReportAsPDFUseCaseDTO.ResultSuccess
> => {
  return new ExportPaymentSlipsReportAsPDFUseCase(
    makeLoggerProvider(),
    makePaymentSlipsRepository(),
    makePDFProvider()
  )
}

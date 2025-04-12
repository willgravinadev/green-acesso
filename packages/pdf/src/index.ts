import type {
  ICreatePDFReportPaymentSlipsProvider,
  IGetPagesPDFProvider
} from '@greenacesso/domain'

import { PDFProvider } from './infra/pdf-provider'

export const makePDFProvider = (): IGetPagesPDFProvider & ICreatePDFReportPaymentSlipsProvider =>
  PDFProvider.getInstance()

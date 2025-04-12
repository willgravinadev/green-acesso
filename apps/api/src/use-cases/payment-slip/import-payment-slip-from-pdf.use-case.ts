import {
  type CondominiumLot,
  type IGetPagesPDFProvider,
  type IListAllPaymentSlipsRepository,
  type ISendLogErrorLoggerProvider,
  type ISendLogTimeUseCaseLoggerProvider,
  type IUploadPDFStoreProvider,
  type PaymentSlip,
  type ProviderError,
  type RepositoryError,
  UseCase
} from '@greenacesso/domain'
import { type Either, failure, success } from '@greenacesso/utils'

export namespace ImportPaymentSlipFromPDFUseCaseDTO {
  export type Parameters = Readonly<{ pdfBuffer: Buffer }>

  export type ResultFailure = Readonly<ProviderError | RepositoryError>
  export type ResultSuccess = Readonly<{
    paymentSlipsURLs: string[]
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class ImportPaymentSlipFromPDFUseCase extends UseCase<
  ImportPaymentSlipFromPDFUseCaseDTO.Parameters,
  ImportPaymentSlipFromPDFUseCaseDTO.ResultFailure,
  ImportPaymentSlipFromPDFUseCaseDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogTimeUseCaseLoggerProvider & ISendLogErrorLoggerProvider,
    private readonly paymentSlipsRepository: IListAllPaymentSlipsRepository,
    private readonly pdfProvider: IGetPagesPDFProvider,
    private readonly storageProvider: IUploadPDFStoreProvider
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    parameters: ImportPaymentSlipFromPDFUseCaseDTO.Parameters
  ): ImportPaymentSlipFromPDFUseCaseDTO.Result {
    const resultGetPagesPDF = await this.pdfProvider.getPages({ pdfBuffer: parameters.pdfBuffer })
    if (resultGetPagesPDF.isFailure()) return failure(resultGetPagesPDF.value)
    const { pdfPages } = resultGetPagesPDF.value

    const resultFindAllPaymentSlips = await this.paymentSlipsRepository.listAll()
    if (resultFindAllPaymentSlips.isFailure()) return failure(resultFindAllPaymentSlips.value)

    const paymentSlips: Array<
      Pick<PaymentSlip, 'id' | 'deletedAt'> & { condominiumLot: Pick<CondominiumLot, 'name'> }
    > = resultFindAllPaymentSlips.value.foundPaymentSlips
      .filter((paymentSlip) => paymentSlip.deletedAt === null)
      .sort((a, b) => a.condominiumLot.name.localeCompare(b.condominiumLot.name))

    const paymentSlipsURLs: string[] = []

    for (const [index, pdfPage] of pdfPages.entries()) {
      if (paymentSlips[index] === undefined) continue
      const resultUploadPdfStoreProvider = await this.storageProvider.uploadPDF({
        pdf: pdfPage,
        filename: `${paymentSlips[index].id.toString()}.pdf`,
        bucket: 'payment-slips'
      })
      if (resultUploadPdfStoreProvider.isFailure()) {
        return failure(resultUploadPdfStoreProvider.value)
      }
      paymentSlipsURLs.push(resultUploadPdfStoreProvider.value.url)
    }

    return success({ paymentSlipsURLs })
  }
}

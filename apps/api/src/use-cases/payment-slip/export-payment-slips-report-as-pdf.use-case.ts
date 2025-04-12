import {
  type ICreatePDFReportPaymentSlipsProvider,
  ID,
  InvalidAmountInCentsError,
  InvalidAmountInCentsMotive,
  type InvalidIDError,
  type ISearchPaymentSlipsRepository,
  type ISendLogErrorLoggerProvider,
  type ISendLogTimeUseCaseLoggerProvider,
  ModelName,
  type ProviderError,
  type RepositoryError,
  UseCase
} from '@greenacesso/domain'
import { type Either, failure, success } from '@greenacesso/utils'

export namespace ExportPaymentSlipsReportAsPDFUseCaseDTO {
  export type Parameters = Readonly<{
    searchParams: {
      payerName?: string
      id?: string
      startAmountInCents?: string
      endAmountInCents?: string
    }
  }>

  export type ResultFailure = Readonly<
    RepositoryError | ProviderError | InvalidIDError | InvalidAmountInCentsError
  >
  export type ResultSuccess = Readonly<{
    pdfInBase64: string
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class ExportPaymentSlipsReportAsPDFUseCase extends UseCase<
  ExportPaymentSlipsReportAsPDFUseCaseDTO.Parameters,
  ExportPaymentSlipsReportAsPDFUseCaseDTO.ResultFailure,
  ExportPaymentSlipsReportAsPDFUseCaseDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogTimeUseCaseLoggerProvider & ISendLogErrorLoggerProvider,
    private readonly paymentSlipsRepository: ISearchPaymentSlipsRepository,
    private readonly pdfProvider: ICreatePDFReportPaymentSlipsProvider
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    parameters: ExportPaymentSlipsReportAsPDFUseCaseDTO.Parameters
  ): ExportPaymentSlipsReportAsPDFUseCaseDTO.Result {
    const { searchParams } = parameters

    let paymentSlipID: undefined | ID = undefined
    if (searchParams.id) {
      const resultValidateID = ID.validate({
        id: searchParams.id,
        modelName: ModelName.PAYMENT_SLIP
      })
      if (resultValidateID.isFailure()) return failure(resultValidateID.value)
      paymentSlipID = resultValidateID.value.idValidated
    }

    let startAmountInCents: undefined | number = undefined
    if (searchParams.startAmountInCents) {
      const resultParseStartAmountInCents = Number.parseInt(searchParams.startAmountInCents)
      if (Number.isNaN(resultParseStartAmountInCents)) {
        return failure(
          new InvalidAmountInCentsError({
            motive: InvalidAmountInCentsMotive.INVALID_VALUE_FORMAT
          })
        )
      }
      if (resultParseStartAmountInCents < 0) {
        return failure(
          new InvalidAmountInCentsError({
            motive: InvalidAmountInCentsMotive.INVALID_VALUE_GREATER_THAN_ZERO
          })
        )
      }
      startAmountInCents = resultParseStartAmountInCents
    }

    let endAmountInCents: undefined | number = undefined
    if (searchParams.endAmountInCents) {
      const resultParseEndAmountInCents = Number.parseInt(searchParams.endAmountInCents)
      if (Number.isNaN(resultParseEndAmountInCents)) {
        return failure(
          new InvalidAmountInCentsError({ motive: InvalidAmountInCentsMotive.INVALID_VALUE_FORMAT })
        )
      }
      if (resultParseEndAmountInCents < 0) {
        return failure(
          new InvalidAmountInCentsError({
            motive: InvalidAmountInCentsMotive.INVALID_VALUE_GREATER_THAN_ZERO
          })
        )
      }
      endAmountInCents = resultParseEndAmountInCents
    }

    if (startAmountInCents && endAmountInCents && startAmountInCents > endAmountInCents) {
      return failure(
        new InvalidAmountInCentsError({
          motive:
            InvalidAmountInCentsMotive.INVALID_VALUE_GREATER_THAN_ZERO_AND_LESS_THAN_OTHER_VALUE,
          value: `${startAmountInCents} > ${endAmountInCents}`
        })
      )
    }

    let payerName: undefined | string = undefined
    if (searchParams.payerName) payerName = searchParams.payerName.trim()

    const resultSearchPaymentSlips = await this.paymentSlipsRepository.search({
      searchParams: {
        paymentSlipID,
        startAmountInCents,
        endAmountInCents,
        payerName
      }
    })
    if (resultSearchPaymentSlips.isFailure()) return failure(resultSearchPaymentSlips.value)
    const { foundPaymentSlips } = resultSearchPaymentSlips.value
    const resultCreatePDFReportPaymentSlips = await this.pdfProvider.createPDFReportPaymentSlips({
      paymentSlips: foundPaymentSlips
    })
    if (resultCreatePDFReportPaymentSlips.isFailure()) {
      return failure(resultCreatePDFReportPaymentSlips.value)
    }
    const { pdfInBase64 } = resultCreatePDFReportPaymentSlips.value

    return success({ pdfInBase64 })
  }
}

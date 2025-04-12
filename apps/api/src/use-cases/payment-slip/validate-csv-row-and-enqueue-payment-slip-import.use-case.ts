import {
  type IEnqueuePaymentSlipImportQueueProvider,
  InvalidPaymentSlipCSVRowError,
  InvalidPaymentSlipCSVRowMotive,
  type ISendLogErrorLoggerProvider,
  type ISendLogTimeUseCaseLoggerProvider,
  type ProviderError,
  UseCase
} from '@greenacesso/domain'
import { type Either, failure, success } from '@greenacesso/utils'

export namespace ValidateCSVRowAndEnqueuePaymentSlipImportUseCaseDTO {
  export type Parameters = Readonly<{
    csvRow: Record<string, string>
  }>

  export type ResultFailure = Readonly<InvalidPaymentSlipCSVRowError | ProviderError>
  export type ResultSuccess = Readonly<{
    payerName: string
    condominiumLotName: string
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class ValidateCSVRowAndEnqueuePaymentSlipImportUseCase extends UseCase<
  ValidateCSVRowAndEnqueuePaymentSlipImportUseCaseDTO.Parameters,
  ValidateCSVRowAndEnqueuePaymentSlipImportUseCaseDTO.ResultFailure,
  ValidateCSVRowAndEnqueuePaymentSlipImportUseCaseDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogTimeUseCaseLoggerProvider & ISendLogErrorLoggerProvider,
    private readonly queueProvider: IEnqueuePaymentSlipImportQueueProvider
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    parameters: ValidateCSVRowAndEnqueuePaymentSlipImportUseCaseDTO.Parameters
  ): ValidateCSVRowAndEnqueuePaymentSlipImportUseCaseDTO.Result {
    const { csvRow } = parameters

    if (!csvRow.nome || !csvRow.unidade || !csvRow.valor || !csvRow.linha_digitavel) {
      return failure(
        new InvalidPaymentSlipCSVRowError({
          motive: InvalidPaymentSlipCSVRowMotive.MISSING_REQUIRED_FIELDS
        })
      )
    }

    const payerNameFormatted = csvRow.nome.trim()
    if (payerNameFormatted.length === 0) {
      return failure(
        new InvalidPaymentSlipCSVRowError({
          motive: InvalidPaymentSlipCSVRowMotive.INVALID_NAME,
          value: payerNameFormatted
        })
      )
    }

    const condominiumLotNameFormatted = csvRow.unidade.trim().padStart(4, '0')
    if (condominiumLotNameFormatted.length === 0) {
      return failure(
        new InvalidPaymentSlipCSVRowError({
          motive: InvalidPaymentSlipCSVRowMotive.INVALID_UNIT,
          value: condominiumLotNameFormatted
        })
      )
    }
    const condominiumLotName = condominiumLotNameFormatted.padStart(4, '0')

    const valueFormatted = csvRow.valor.trim()
    if (valueFormatted.length === 0) {
      return failure(
        new InvalidPaymentSlipCSVRowError({
          motive: InvalidPaymentSlipCSVRowMotive.INVALID_VALUE,
          value: valueFormatted
        })
      )
    }
    const valueParsed = Number.parseFloat(valueFormatted)
    if (Number.isNaN(valueParsed)) {
      return failure(
        new InvalidPaymentSlipCSVRowError({
          motive: InvalidPaymentSlipCSVRowMotive.INVALID_VALUE_FORMAT,
          value: valueParsed.toString()
        })
      )
    }
    if (valueParsed <= 0) {
      return failure(
        new InvalidPaymentSlipCSVRowError({
          motive: InvalidPaymentSlipCSVRowMotive.INVALID_VALUE_GREATER_THAN_ZERO,
          value: valueParsed.toString()
        })
      )
    }
    const amountInCents = valueParsed * 100

    const barCodeFormatted = csvRow.linha_digitavel.trim()
    if (barCodeFormatted.length === 0) {
      return failure(
        new InvalidPaymentSlipCSVRowError({
          motive: InvalidPaymentSlipCSVRowMotive.INVALID_BARCODE,
          value: barCodeFormatted
        })
      )
    }

    const resultEnqueue = await this.queueProvider.enqueuePaymentSlipImport({
      paymentSlip: {
        amountInCents,
        barcode: barCodeFormatted,
        payerName: payerNameFormatted,
        condominiumLot: { name: condominiumLotName }
      }
    })
    if (resultEnqueue.isFailure()) return failure(resultEnqueue.value)

    return success({ condominiumLotName, payerName: payerNameFormatted })
  }
}

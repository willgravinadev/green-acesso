import {
  type CondominiumLot,
  CondominiumLotNotFoundError,
  type GenerateIDError,
  type ICreatePaymentSlipsRepository,
  type IFindByNameCondominiumLotsRepository,
  type InvalidGenerateDateTimeError,
  type ISendLogErrorLoggerProvider,
  type ISendLogTimeUseCaseLoggerProvider,
  PaymentSlip,
  type RepositoryError,
  UseCase
} from '@greenacesso/domain'
import { type Either, failure, success } from '@greenacesso/utils'

export namespace ImportPaymentSlipFromCSVUseCaseDTO {
  export type Parameters = Readonly<{
    paymentSlip: Pick<PaymentSlip, 'amountInCents' | 'barcode' | 'payerName'> & {
      condominiumLot: Pick<CondominiumLot, 'name'>
    }
  }>

  export type ResultFailure = Readonly<
    RepositoryError | InvalidGenerateDateTimeError | GenerateIDError | CondominiumLotNotFoundError
  >
  export type ResultSuccess = Readonly<null>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class ImportPaymentSlipFromCSVUseCase extends UseCase<
  ImportPaymentSlipFromCSVUseCaseDTO.Parameters,
  ImportPaymentSlipFromCSVUseCaseDTO.ResultFailure,
  ImportPaymentSlipFromCSVUseCaseDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogTimeUseCaseLoggerProvider & ISendLogErrorLoggerProvider,
    private readonly condominiumLotsRepository: IFindByNameCondominiumLotsRepository,
    private readonly paymentSlipsRepository: ICreatePaymentSlipsRepository
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    parameters: ImportPaymentSlipFromCSVUseCaseDTO.Parameters
  ): ImportPaymentSlipFromCSVUseCaseDTO.Result {
    const resultFindByNameCondominiumLot = await this.condominiumLotsRepository.findByName({
      condominiumLot: { name: parameters.paymentSlip.condominiumLot.name }
    })
    if (resultFindByNameCondominiumLot.isFailure()) {
      return failure(resultFindByNameCondominiumLot.value)
    }
    const { foundCondominiumLot } = resultFindByNameCondominiumLot.value
    if (foundCondominiumLot === null || foundCondominiumLot.deletedAt !== null) {
      return failure(
        new CondominiumLotNotFoundError({
          condominiumLotName: parameters.paymentSlip.condominiumLot.name
        })
      )
    }
    const resultCreatePaymentSlip = PaymentSlip.create({
      condominiumLot: { id: foundCondominiumLot.id },
      amountInCents: parameters.paymentSlip.amountInCents,
      barcode: parameters.paymentSlip.barcode,
      payerName: parameters.paymentSlip.payerName
    })
    if (resultCreatePaymentSlip.isFailure()) return failure(resultCreatePaymentSlip.value)
    const { paymentSlipCreated } = resultCreatePaymentSlip.value

    const resultCreatePaymentSlipInDB = await this.paymentSlipsRepository.create({
      paymentSlip: paymentSlipCreated
    })
    if (resultCreatePaymentSlipInDB.isFailure()) return failure(resultCreatePaymentSlipInDB.value)

    return success(null)
  }
}

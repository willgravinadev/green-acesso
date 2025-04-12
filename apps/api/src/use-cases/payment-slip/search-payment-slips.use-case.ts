import {
  type CondominiumLot,
  ID,
  InvalidAmountInCentsError,
  InvalidAmountInCentsMotive,
  type InvalidIDError,
  type ISearchPaymentSlipsRepository,
  type ISendLogErrorLoggerProvider,
  type ISendLogTimeUseCaseLoggerProvider,
  ModelName,
  type PaymentSlip,
  type RepositoryError,
  UseCase
} from '@greenacesso/domain'
import { type Either, failure, success } from '@greenacesso/utils'

export namespace SearchPaymentSlipsUseCaseDTO {
  export type Parameters = Readonly<{
    searchParams: {
      payerName?: string
      id?: string
      startAmountInCents?: string
      endAmountInCents?: string
    }
  }>

  export type ResultFailure = Readonly<RepositoryError | InvalidIDError | InvalidAmountInCentsError>
  export type ResultSuccess = Readonly<{
    paymentSlips: Array<
      Pick<
        PaymentSlip,
        'id' | 'deletedAt' | 'amountInCents' | 'barcode' | 'payerName' | 'status'
      > & { condominiumLot: Pick<CondominiumLot, 'name' | 'status'> }
    >
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class SearchPaymentSlipsUseCase extends UseCase<
  SearchPaymentSlipsUseCaseDTO.Parameters,
  SearchPaymentSlipsUseCaseDTO.ResultFailure,
  SearchPaymentSlipsUseCaseDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogTimeUseCaseLoggerProvider & ISendLogErrorLoggerProvider,
    private readonly paymentSlipsRepository: ISearchPaymentSlipsRepository
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    parameters: SearchPaymentSlipsUseCaseDTO.Parameters
  ): SearchPaymentSlipsUseCaseDTO.Result {
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
    return success({ paymentSlips: resultSearchPaymentSlips.value.foundPaymentSlips })
  }
}

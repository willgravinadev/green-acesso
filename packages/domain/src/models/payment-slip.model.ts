import { type Either, failure, success } from '@greenacesso/utils'

import { type InvalidGenerateDateTimeError } from '../errors/value-objects/date-time/invalid-generate-date-time.error'
import { type GenerateIDError } from '../errors/value-objects/id/generate-id.error'
import { DateTime } from '../value-objects/date-time.value-object'
import { ID } from '../value-objects/id.value-object'

import { ModelName } from './_model-name'
import { type CondominiumLot } from './condominium-lot.model'

export enum PaymentSlipStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE'
}

export class PaymentSlip {
  public readonly payerName: string
  public readonly condominiumLot: Pick<CondominiumLot, 'id'>
  public readonly amountInCents: number
  public readonly barcode: string
  public readonly status: PaymentSlipStatus

  public readonly id: ID
  public readonly createdAt: DateTime
  public readonly updatedAt: DateTime
  public readonly deletedAt: DateTime | null

  private constructor(input: {
    id: ID
    payerName: string
    condominiumLot: Pick<CondominiumLot, 'id'>
    amountInCents: number
    barcode: string
    status: PaymentSlipStatus
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime | null
  }) {
    this.id = input.id
    this.payerName = input.payerName
    this.condominiumLot = input.condominiumLot
    this.amountInCents = input.amountInCents
    this.barcode = input.barcode
    this.status = input.status
    this.createdAt = input.createdAt
    this.updatedAt = input.updatedAt
    this.deletedAt = input.deletedAt
  }

  public static create(
    input: Readonly<{
      payerName: string
      condominiumLot: Pick<CondominiumLot, 'id'>
      amountInCents: number
      barcode: string
      createdAt?: DateTime
      updatedAt?: DateTime
    }>
  ): Either<InvalidGenerateDateTimeError | GenerateIDError, { paymentSlipCreated: PaymentSlip }> {
    const resultGenerateID = ID.generate({ modelName: ModelName.PAYMENT_SLIP })
    if (resultGenerateID.isFailure()) return failure(resultGenerateID.value)
    const { idGenerated: paymentSlipID } = resultGenerateID.value

    let createdAt = input.createdAt
    if (createdAt === undefined) {
      const resultNow = DateTime.now()
      if (resultNow.isFailure()) return failure(resultNow.value)
      createdAt = resultNow.value.now
    }

    const paymentSlipCreated = new PaymentSlip({
      id: paymentSlipID,
      payerName: input.payerName,
      condominiumLot: input.condominiumLot,
      amountInCents: input.amountInCents,
      barcode: input.barcode,
      status: PaymentSlipStatus.PENDING,
      createdAt,
      updatedAt: input.updatedAt ?? createdAt,
      deletedAt: null
    })

    return success({ paymentSlipCreated })
  }
}

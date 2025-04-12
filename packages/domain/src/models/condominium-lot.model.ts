import { type Either, failure, success } from '@greenacesso/utils'

import { type InvalidGenerateDateTimeError } from '../errors/value-objects/date-time/invalid-generate-date-time.error'
import { type GenerateIDError } from '../errors/value-objects/id/generate-id.error'
import { DateTime } from '../value-objects/date-time.value-object'
import { ID } from '../value-objects/id.value-object'

import { ModelName } from './_model-name'

export enum CondominiumLotStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export class CondominiumLot {
  public readonly name: string // * nome_unidade | nome_lote | unidade
  public readonly status: CondominiumLotStatus

  public readonly id: ID
  public readonly createdAt: DateTime
  public readonly updatedAt: DateTime
  public readonly deletedAt: DateTime | null

  private constructor(input: {
    id: ID
    name: string
    status: CondominiumLotStatus
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime | null
  }) {
    this.id = input.id
    this.name = input.name
    this.status = input.status
    this.createdAt = input.createdAt
    this.updatedAt = input.updatedAt
    this.deletedAt = input.deletedAt
  }

  public static create(
    input: Readonly<{
      name: string
      status: CondominiumLotStatus
      createdAt?: DateTime
      updatedAt?: DateTime
    }>
  ): Either<
    InvalidGenerateDateTimeError | GenerateIDError,
    { condominiumLotCreated: CondominiumLot }
  > {
    const resultGenerateID = ID.generate({ modelName: ModelName.CONDOMINIUM_LOT })
    if (resultGenerateID.isFailure()) return failure(resultGenerateID.value)
    const { idGenerated: condominiumLotID } = resultGenerateID.value

    let createdAt = input.createdAt
    if (createdAt === undefined) {
      const resultNow = DateTime.now()
      if (resultNow.isFailure()) return failure(resultNow.value)
      createdAt = resultNow.value.now
    }

    const condominiumLotCreated = new CondominiumLot({
      id: condominiumLotID,
      name: input.name,
      status: input.status,
      createdAt,
      updatedAt: input.updatedAt ?? createdAt,
      deletedAt: null
    })

    return success({ condominiumLotCreated })
  }
}

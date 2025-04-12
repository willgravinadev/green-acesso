import type { RepositoryError } from '../../errors/_shared/repository.error'
import type { CondominiumLot } from '../../models/condominium-lot.model'

import { type Either } from '@greenacesso/utils'

export namespace FindByNameCondominiumLotsRepositoryDTO {
  export type Parameters = Readonly<{ condominiumLot: Pick<CondominiumLot, 'name'> }>

  export type ResultFailure = Readonly<RepositoryError>

  export type FoundCondominiumLot = Pick<CondominiumLot, 'id' | 'name' | 'deletedAt'>
  export type ResultSuccess = Readonly<{ foundCondominiumLot: null | FoundCondominiumLot }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface IFindByNameCondominiumLotsRepository {
  findByName(
    parameters: FindByNameCondominiumLotsRepositoryDTO.Parameters
  ): FindByNameCondominiumLotsRepositoryDTO.Result
}

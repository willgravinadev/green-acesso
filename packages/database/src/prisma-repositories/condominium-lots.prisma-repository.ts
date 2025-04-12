import type { Database } from '../database'

import {
  CondominiumLotsRepositoryMethods,
  DateTime,
  type FindByNameCondominiumLotsRepositoryDTO,
  ID,
  type IFindByNameCondominiumLotsRepository,
  type ISendLogErrorLoggerProvider,
  RepositoryError,
  RepositoryExternalName,
  RepositoryNames
} from '@greenacesso/domain'
import { failure, success } from '@greenacesso/utils'

export class CondominiumLotsPrismaRepository implements IFindByNameCondominiumLotsRepository {
  constructor(
    private readonly loggerProvider: ISendLogErrorLoggerProvider,
    private readonly database: Database
  ) {}
  public async findByName(
    parameters: FindByNameCondominiumLotsRepositoryDTO.Parameters
  ): FindByNameCondominiumLotsRepositoryDTO.Result {
    try {
      const foundCondominiumLot = await this.database.prisma.condominiumLot.findFirst({
        where: { name: parameters.condominiumLot.name },
        select: { id: true, name: true, deletedAt: true }
      })

      if (foundCondominiumLot === null) return success({ foundCondominiumLot: null })

      return success({
        foundCondominiumLot: {
          id: new ID({ id: foundCondominiumLot.id }),
          name: foundCondominiumLot.name,
          deletedAt: foundCondominiumLot.deletedAt
            ? new DateTime(foundCondominiumLot.deletedAt)
            : null
        }
      })
    } catch (error: unknown) {
      const repositoryError = new RepositoryError({
        error,
        repository: {
          name: RepositoryNames.CONDOMINIUM_LOTS,
          method: CondominiumLotsRepositoryMethods.FIND_BY_NAME,
          externalName: RepositoryExternalName.PRISMA
        }
      })
      this.loggerProvider.sendLogError({
        message: repositoryError.errorMessage,
        value: repositoryError
      })
      return failure(repositoryError)
    }
  }
}

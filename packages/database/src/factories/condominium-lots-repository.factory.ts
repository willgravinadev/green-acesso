import { type IFindByNameCondominiumLotsRepository } from '@greenacesso/domain'
import { makeLoggerProvider } from '@greenacesso/logger'

import { Database } from '../database'
import { CondominiumLotsPrismaRepository } from '../prisma-repositories/condominium-lots.prisma-repository'

export const makeCondominiumLotsRepository = (): IFindByNameCondominiumLotsRepository => {
  return new CondominiumLotsPrismaRepository(makeLoggerProvider(), Database.getInstance())
}

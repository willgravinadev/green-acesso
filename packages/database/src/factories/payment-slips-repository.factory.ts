import {
  type ICreatePaymentSlipsRepository,
  type IListAllPaymentSlipsRepository,
  type ISearchPaymentSlipsRepository
} from '@greenacesso/domain'
import { makeLoggerProvider } from '@greenacesso/logger'

import { Database } from '../database'
import { PaymentSlipsPrismaRepository } from '../prisma-repositories/payment-slips.prisma-repository'

export const makePaymentSlipsRepository = (): ICreatePaymentSlipsRepository &
  IListAllPaymentSlipsRepository &
  ISearchPaymentSlipsRepository => {
  return new PaymentSlipsPrismaRepository(makeLoggerProvider(), Database.getInstance())
}

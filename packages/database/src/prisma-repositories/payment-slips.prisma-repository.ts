import type { Database } from '../database'

import {
  type CondominiumLotStatus,
  type CreatePaymentSlipsRepositoryDTO,
  DateTime,
  type ICreatePaymentSlipsRepository,
  ID,
  type IListAllPaymentSlipsRepository,
  type ISearchPaymentSlipsRepository,
  type ISendLogErrorLoggerProvider,
  type ListAllPaymentSlipsRepositoryDTO,
  PaymentSlipsRepositoryMethods,
  type PaymentSlipStatus,
  RepositoryError,
  RepositoryExternalName,
  RepositoryNames,
  type SearchPaymentSlipsRepositoryDTO
} from '@greenacesso/domain'
import { failure, success } from '@greenacesso/utils'

export class PaymentSlipsPrismaRepository
  implements
    ICreatePaymentSlipsRepository,
    IListAllPaymentSlipsRepository,
    ISearchPaymentSlipsRepository
{
  constructor(
    private readonly loggerProvider: ISendLogErrorLoggerProvider,
    private readonly database: Database
  ) {}

  public async search(
    parameters: SearchPaymentSlipsRepositoryDTO.Parameters
  ): SearchPaymentSlipsRepositoryDTO.Result {
    try {
      const { searchParams, orderByCondominiumLotName } = parameters
      const found = await this.database.prisma.paymentSlip.findMany({
        where: {
          id: searchParams.paymentSlipID?.value ?? undefined,
          amountInCents: {
            gte: searchParams.startAmountInCents ?? undefined,
            lte: searchParams.endAmountInCents ?? undefined
          },
          payerName: {
            contains: searchParams.payerName ?? undefined,
            mode: 'insensitive'
          },
          deletedAt: null
        },
        orderBy: {
          condominiumLot: orderByCondominiumLotName
            ? { name: orderByCondominiumLotName }
            : undefined
        },
        select: {
          id: true,
          deletedAt: true,
          condominiumLot: { select: { name: true, status: true } },
          amountInCents: true,
          barcode: true,
          payerName: true,
          status: true
        }
      })

      return success({
        foundPaymentSlips: found.map((paymentSlip) => ({
          id: new ID({ id: paymentSlip.id }),
          deletedAt: paymentSlip.deletedAt ? new DateTime(paymentSlip.deletedAt) : null,
          condominiumLot: {
            name: paymentSlip.condominiumLot.name,
            status: paymentSlip.condominiumLot.status as CondominiumLotStatus
          },
          amountInCents: paymentSlip.amountInCents,
          barcode: paymentSlip.barcode,
          payerName: paymentSlip.payerName,
          status: paymentSlip.status as PaymentSlipStatus
        }))
      })
    } catch (error: unknown) {
      const repositoryError = new RepositoryError({
        error,
        repository: {
          name: RepositoryNames.PAYMENT_SLIPS,
          method: PaymentSlipsRepositoryMethods.SEARCH,
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

  public async create(
    parameters: CreatePaymentSlipsRepositoryDTO.Parameters
  ): CreatePaymentSlipsRepositoryDTO.Result {
    try {
      const { paymentSlip } = parameters
      await this.database.prisma.paymentSlip.create({
        data: {
          id: paymentSlip.id.value,
          payerName: paymentSlip.payerName,
          condominiumLotID: paymentSlip.condominiumLot.id.value,
          amountInCents: paymentSlip.amountInCents,
          barcode: paymentSlip.barcode,
          status: paymentSlip.status,
          createdAt: paymentSlip.createdAt.value,
          updatedAt: paymentSlip.updatedAt.value,
          deletedAt: paymentSlip.deletedAt?.value
        }
      })

      return success(null)
    } catch (error: unknown) {
      const repositoryError = new RepositoryError({
        error,
        repository: {
          name: RepositoryNames.PAYMENT_SLIPS,
          method: PaymentSlipsRepositoryMethods.CREATE,
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

  public async listAll(): ListAllPaymentSlipsRepositoryDTO.Result {
    try {
      const paymentSlips = await this.database.prisma.paymentSlip.findMany({
        where: { deletedAt: null },
        select: {
          id: true,
          deletedAt: true,
          condominiumLot: { select: { name: true } }
        }
      })

      const foundPaymentSlips: ListAllPaymentSlipsRepositoryDTO.FoundPaymentSlip[] =
        paymentSlips.map((paymentSlip) => ({
          id: new ID({ id: paymentSlip.id }),
          deletedAt: paymentSlip.deletedAt ? new DateTime(paymentSlip.deletedAt) : null,
          condominiumLot: { name: paymentSlip.condominiumLot.name }
        }))

      return success({ foundPaymentSlips })
    } catch (error: unknown) {
      const repositoryError = new RepositoryError({
        error,
        repository: {
          name: RepositoryNames.PAYMENT_SLIPS,
          method: PaymentSlipsRepositoryMethods.LIST_ALL,
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

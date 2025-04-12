import type { UseCase } from '@greenacesso/domain'

import { makePaymentSlipsRepository } from '@greenacesso/database'
import { makeLoggerProvider } from '@greenacesso/logger'
import {
  SearchPaymentSlipsUseCase,
  type SearchPaymentSlipsUseCaseDTO
} from '@use-cases/payment-slip/search-payment-slips.use-case'

export const makeSearchPaymentSlipsUseCase = (): UseCase<
  SearchPaymentSlipsUseCaseDTO.Parameters,
  SearchPaymentSlipsUseCaseDTO.ResultFailure,
  SearchPaymentSlipsUseCaseDTO.ResultSuccess
> => new SearchPaymentSlipsUseCase(makeLoggerProvider(), makePaymentSlipsRepository())

import type { ProviderError } from './provider.error'

import { StatusError } from './status-error'

export enum InvalidPaginationErrorMotive {
  LIMIT_GREATER_THAN_30 = 'limit greater than 30',
  LIMIT_LESS_THAN_1 = 'limit less than 1',
  PAGE_LESS_THAN_1 = 'page less than 1'
}

type ParametersConstructorDTO = {
  motive: InvalidPaginationErrorMotive
}

export class InvalidPaginationError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'InvalidPaginationError'

  readonly errorValue: null | ProviderError | Error | unknown

  constructor(parameters: ParametersConstructorDTO) {
    this.status = StatusError.INVALID
    this.errorMessage = `Invalid pagination, motive: ${parameters.motive}.`
    this.name = 'InvalidPaginationError'
    this.errorValue = null
  }
}

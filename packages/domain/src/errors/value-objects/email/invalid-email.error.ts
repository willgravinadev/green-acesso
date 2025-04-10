import type { ProviderError } from '@/errors/_shared/provider.error'

import { StatusError } from '@/errors/_shared/status-error'

type ParametersConstructorDTO = { email: string }

export class InvalidEmailError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'InvalidEmailError'

  readonly errorValue: null | ProviderError

  constructor(parameters: ParametersConstructorDTO) {
    this.name = 'InvalidEmailError'
    this.errorMessage = `The email ${parameters.email} is invalid`
    this.status = StatusError.INVALID
    this.errorValue = null
  }
}

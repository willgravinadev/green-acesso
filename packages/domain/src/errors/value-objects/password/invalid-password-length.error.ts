import type { ProviderError } from '@/errors/_shared/provider.error'

import { StatusError } from '@/errors/_shared/status-error'

type ParametersConstructorDTO = {
  passwordLength: number
}

export class InvalidPasswordLengthError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'InvalidPasswordLengthError'

  readonly errorValue: null | ProviderError | Error | unknown

  constructor(parameters: ParametersConstructorDTO) {
    this.status = StatusError.INVALID
    this.errorMessage = `Invalid password length: ${parameters.passwordLength}`
    this.name = 'InvalidPasswordLengthError'
    this.errorValue = null
  }
}

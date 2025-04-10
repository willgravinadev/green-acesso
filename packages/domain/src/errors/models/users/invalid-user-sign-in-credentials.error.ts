import type { ProviderError } from '@/errors/_shared/provider.error'

import { StatusError } from '@/errors/_shared/status-error'

export class InvalidUserSignInCredentialsError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'InvalidUserSignInCredentialsError'

  readonly errorValue: null | ProviderError | Error | unknown

  constructor() {
    this.status = StatusError.INVALID
    this.errorMessage = `Invalid user sign in credentials.`
    this.name = 'InvalidUserSignInCredentialsError'
    this.errorValue = null
  }
}

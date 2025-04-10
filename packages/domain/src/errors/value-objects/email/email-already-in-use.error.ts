import type { ProviderError } from '@/errors/_shared/provider.error'
import type { Email } from '@/value-objects/email.value-object'

import { StatusError } from '@/errors/_shared/status-error'

export class EmailAlreadyInUseError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'EmailAlreadyInUseError'

  readonly errorValue: null | ProviderError

  constructor(parameters: { email: Pick<Email, 'value'> }) {
    this.name = 'EmailAlreadyInUseError'
    this.errorMessage = `The email ${parameters.email.value} is already in use, please try another one.`
    this.status = StatusError.CONFLICT
    this.errorValue = null
  }
}

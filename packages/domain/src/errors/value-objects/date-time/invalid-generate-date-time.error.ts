import type { ProviderError } from '@/errors/_shared/provider.error'

import { StatusError } from '@/errors/_shared/status-error'

export class InvalidGenerateDateTimeError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'InvalidGenerateDateTimeError'

  readonly errorValue: null | ProviderError | Error | unknown

  constructor() {
    this.status = StatusError.INVALID
    this.errorMessage = `Invalid generate date time.`
    this.name = 'InvalidGenerateDateTimeError'
    this.errorValue = null
  }
}

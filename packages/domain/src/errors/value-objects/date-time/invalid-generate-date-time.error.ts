import { type ProviderError } from '../../_shared/provider.error'
import { StatusError } from '../../_shared/status-error'

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

import { type ProviderError } from '../../_shared/provider.error'
import { StatusError } from '../../_shared/status-error'

type ParametersConstructorDTO = {
  month: string
}

export class InvalidMonthDateTimeError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'InvalidMonthDateTimeError'

  readonly errorValue: null | ProviderError | Error | unknown

  constructor(parameters: ParametersConstructorDTO) {
    this.status = StatusError.INVALID
    this.errorMessage = `Invalid month: ${parameters.month}`
    this.name = 'InvalidMonthDateTimeError'
    this.errorValue = null
  }
}

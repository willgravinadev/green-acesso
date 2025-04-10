import type { ProviderError } from '@/errors/_shared/provider.error'

import { StatusError } from '@/errors/_shared/status-error'

type ParametersConstructorDTO = {
  monthNumber: number
}

export class InvalidMonthNumberDateTimeError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'InvalidMonthNumberDateTimeError'

  readonly errorValue: null | ProviderError | Error | unknown

  constructor(parameters: ParametersConstructorDTO) {
    this.status = StatusError.INVALID
    this.errorMessage = `Invalid month number: ${parameters.monthNumber}`
    this.name = 'InvalidMonthNumberDateTimeError'
    this.errorValue = null
  }
}

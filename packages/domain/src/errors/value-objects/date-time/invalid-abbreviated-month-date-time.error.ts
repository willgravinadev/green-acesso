import type { ProviderError } from '@/errors/_shared/provider.error'

import { StatusError } from '@/errors/_shared/status-error'

export enum InvalidAbbreviatedMonthDateTimeMotive {
  INVALID_ABBREVIATED_MONTH = 'invalid abbreviated month'
}

type ParametersConstructorDTO = {
  abbreviatedMonth: string
  motive: InvalidAbbreviatedMonthDateTimeMotive
}

export class InvalidAbbreviatedMonthDateTimeError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'InvalidAbbreviatedMonthDateTimeError'

  readonly errorValue: null | ProviderError | Error | unknown

  constructor(parameters: ParametersConstructorDTO) {
    this.status = StatusError.INVALID
    this.errorMessage = `Invalid abbreviated month "${parameters.abbreviatedMonth}". Motive: ${parameters.motive}`
    this.name = 'InvalidAbbreviatedMonthDateTimeError'
    this.errorValue = null
  }
}

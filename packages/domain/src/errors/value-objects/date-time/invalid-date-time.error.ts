import type { ProviderError } from '@/errors/_shared/provider.error'

import { StatusError } from '@/errors/_shared/status-error'

export enum InvalidDateTimeMotive {
  DATE_REQUIRED = 'date required',
  IS_NOT_A_DATE = 'is not a date'
}

type ParametersConstructorDTO = {
  dateTime: string | number | null
  motive: InvalidDateTimeMotive
}

export class InvalidDateTimeError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'InvalidDateTimeError'

  readonly errorValue: null | ProviderError | Error | unknown

  constructor(parameters: ParametersConstructorDTO) {
    this.status = StatusError.INVALID
    const dateTimeStr = parameters.dateTime === null ? '.' : `" ${parameters.dateTime}."`
    this.errorMessage = `Invalid date time${dateTimeStr} Motive: ${parameters.motive}`
    this.name = 'InvalidDateTimeError'
    this.errorValue = null
  }
}

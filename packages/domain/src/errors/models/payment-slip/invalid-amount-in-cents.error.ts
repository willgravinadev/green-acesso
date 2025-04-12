import { StatusError } from '../../_shared/status-error'

export enum InvalidAmountInCentsMotive {
  INVALID_VALUE_FORMAT = 'invalid value format',
  INVALID_VALUE_GREATER_THAN_ZERO = 'invalid value greater than zero',
  INVALID_VALUE_GREATER_THAN_ZERO_AND_LESS_THAN_OTHER_VALUE = 'invalid value greater than zero and less than other value'
}

export class InvalidAmountInCentsError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'InvalidAmountInCentsError'

  readonly errorValue: null

  constructor(parameters: { motive: InvalidAmountInCentsMotive; value?: string }) {
    this.status = StatusError.INVALID
    this.errorMessage = `Invalid amount in cents. Motive: ${parameters.motive}${
      parameters.value ? `, Value: ${parameters.value}` : ''
    }`
    this.name = 'InvalidAmountInCentsError'
    this.errorValue = null
  }
}

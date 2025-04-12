import { StatusError } from '../../_shared/status-error'

export enum InvalidPaymentSlipCSVRowMotive {
  MISSING_REQUIRED_FIELDS = 'missing required fields',
  INVALID_NAME = 'invalid name',
  INVALID_UNIT = 'invalid unit',
  INVALID_VALUE = 'invalid value',
  INVALID_VALUE_FORMAT = 'invalid value format',
  INVALID_VALUE_GREATER_THAN_ZERO = 'invalid value greater than zero',
  INVALID_BARCODE = 'invalid barcode'
}

export class InvalidPaymentSlipCSVRowError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'InvalidPaymentSlipCSVRowError'

  readonly errorValue: null

  constructor(parameters: { motive: InvalidPaymentSlipCSVRowMotive; value?: string }) {
    this.status = StatusError.INVALID
    this.errorMessage = `Invalid payment slip csv row. Motive: ${parameters.motive}${
      parameters.value ? `, Value: ${parameters.value}` : ''
    }`
    this.name = 'InvalidPaymentSlipCSVRowError'
    this.errorValue = null
  }
}

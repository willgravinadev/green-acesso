import { StatusError } from './status-error'

type ParametersConstructorDTO = {
  error: Error | unknown
  provider: {
    name: ProvidersNames
    method: string
    externalName?: string
  }
}

export enum ProvidersNames {}

export class ProviderError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name = 'ProviderError'

  readonly errorValue: Error | unknown

  constructor(parameters: ParametersConstructorDTO) {
    this.errorMessage = `Error in ${parameters.provider.name} provider in ${parameters.provider.method} method.${
      parameters.provider.externalName === undefined
        ? ''
        : ` Error in external lib name: ${parameters.provider.externalName}.`
    }`
    this.status = StatusError.PROVIDER_ERROR
    this.errorValue = parameters.error
  }
}

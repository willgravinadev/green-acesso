import { StatusError } from './status-error'

type ParametersConstructorDTO = {
  error: Error | unknown
  provider: {
    name: ProvidersNames
    method: CryptoProviderMethods | TokenProviderMethods | NotificationProviderMethods
    externalName?: string
  }
}

export enum ProvidersNames {
  CRYPTO = 'crypto',
  TOKEN = 'token',
  NOTIFICATION = 'notification'
}

export enum TokenProviderMethods {
  GENERATE_JWT = 'generate jwt',
  VERIFY_JWT = 'verify jwt'
}

export enum NotificationProviderMethods {
  SEND_EMAIL = 'send email'
}

export enum CryptoProviderMethods {
  ENCRYPT_PASSWORD = 'encrypt password',
  COMPARE_ENCRYPTED_PASSWORD = 'compare encrypted password'
}

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

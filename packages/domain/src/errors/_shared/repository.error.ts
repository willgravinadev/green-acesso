import { StatusError } from './status-error'

type ParametersConstructorDTO = {
  error: Error | unknown
  repository: {
    name: RepositoryNames
    method: PaymentSlipsRepositoryMethods | CondominiumLotsRepositoryMethods
    externalName?: RepositoryExternalName
  }
}

export enum RepositoryExternalName {
  PRISMA = 'prisma'
}

export enum RepositoryNames {
  PAYMENT_SLIPS = 'payment slips',
  CONDOMINIUM_LOTS = 'condominium lots'
}

export enum PaymentSlipsRepositoryMethods {
  CREATE = 'create',
  LIST_ALL = 'list all',
  SEARCH = 'search'
}

export enum CondominiumLotsRepositoryMethods {
  FIND_BY_NAME = 'find by name'
}

export class RepositoryError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'RepositoryError'

  readonly errorValue: Error | unknown

  constructor(parameters: ParametersConstructorDTO) {
    this.name = 'RepositoryError'
    this.errorMessage = `Error in ${parameters.repository.name} repository in ${parameters.repository.method} method.${
      parameters.repository.externalName === undefined
        ? ''
        : ` Error in external lib name: ${parameters.repository.externalName}.`
    }`
    this.status = StatusError.REPOSITORY_ERROR
    this.errorValue = parameters.error
  }
}

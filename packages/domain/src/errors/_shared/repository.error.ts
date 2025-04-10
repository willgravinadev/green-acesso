import { StatusError } from './status-error'

type ParametersConstructorDTO = {
  error: Error | unknown
  repository: {
    name: RepositoryNames
    method: UsersRepositoryMethods
    externalName?: RepositoryExternalName
  }
}

export enum RepositoryExternalName {
  PRISMA = 'prisma'
}

export enum RepositoryNames {
  USERS = 'users'
}

export enum UsersRepositoryMethods {
  VALIDATE_EMAIL = 'validate email',
  CREATE = 'create',
  VALIDATE_USER_ID = 'validate user id'
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

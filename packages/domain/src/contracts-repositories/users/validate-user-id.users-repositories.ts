import type { RepositoryError } from '@/errors/_shared/repository.error'
import type { InvalidIDError } from '@/errors/value-objects/id/invalid-id.error'
import type { User } from '@/models/user.model'
import type { ID } from '@/value-objects/id.value-object'
import type { Either } from '@greenacesso/utils'

export namespace ValidateUserIDUsersRepositoryDTO {
  export type Parameters = Readonly<{ userID: ID }>

  export type ResultFailure = Readonly<RepositoryError | InvalidIDError>
  export type ResultSuccess = Readonly<{
    foundUser: null | Pick<User, 'id'>
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface IValidateUserIDUsersRepository {
  validateUserID(
    parameters: ValidateUserIDUsersRepositoryDTO.Parameters
  ): ValidateUserIDUsersRepositoryDTO.Result
}

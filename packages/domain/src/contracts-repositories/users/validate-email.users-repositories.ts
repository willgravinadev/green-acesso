import type { RepositoryError } from '@/errors/_shared/repository.error'
import type { InvalidEmailError } from '@/errors/value-objects/email/invalid-email.error'
import type { InvalidIDError } from '@/errors/value-objects/id/invalid-id.error'
import type { User } from '@/models/user.model'
import type { Email } from '@/value-objects/email.value-object'
import type { Either } from '@greenacesso/utils'

export namespace ValidateEmailUsersRepositoryDTO {
  export type Parameters = Readonly<{ email: Email }>

  export type ResultFailure = Readonly<RepositoryError | InvalidEmailError | InvalidIDError>
  export type ResultSuccess = Readonly<{
    foundUser:
      | null
      | (Pick<User, 'id' | 'email'> & { password: Pick<User['password'], 'value' | 'isEncrypted'> })
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface IValidateEmailUsersRepository {
  validateEmail(
    parameters: ValidateEmailUsersRepositoryDTO.Parameters
  ): ValidateEmailUsersRepositoryDTO.Result
}

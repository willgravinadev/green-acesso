import type { ProviderError } from '../../errors/_shared/provider.error'
import type { Password } from '../../value-objects/password.value-object'
import type { Either } from '@ecomverzo/utils'

export namespace CompareEncryptedPasswordCryptoProviderDTO {
  export type Parameters = Readonly<{
    passwordEncrypted: Pick<Password, 'value'>
    passwordDecrypted: Pick<Password, 'value'>
  }>

  export type ResultFailure = Readonly<ProviderError>
  export type ResultSuccess = Readonly<{ isPasswordMatch: boolean }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface ICompareEncryptedPasswordCryptoProvider {
  compareEncryptedPassword(
    parameters: CompareEncryptedPasswordCryptoProviderDTO.Parameters
  ): CompareEncryptedPasswordCryptoProviderDTO.Result
}

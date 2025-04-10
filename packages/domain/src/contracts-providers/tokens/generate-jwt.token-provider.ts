import type { ProviderError } from '@/errors/_shared/provider.error'
import type { ID } from '@/value-objects/id.value-object'
import type { Either } from '@ecomverzo/utils'

export namespace GenerateJWTTokenProviderDTO {
  export type Parameters = Readonly<{ userID: ID }>

  export type ResultFailure = Readonly<ProviderError>
  export type ResultSuccess = Readonly<{ jwtToken: string }>

  export type Result = Either<ResultFailure, ResultSuccess>
}

export interface IGenerateJWTTokenProvider {
  generateJWT(
    parameters: GenerateJWTTokenProviderDTO.Parameters
  ): GenerateJWTTokenProviderDTO.Result
}

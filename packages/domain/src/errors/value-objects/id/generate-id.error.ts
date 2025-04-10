import type { ProviderError } from '@/errors/_shared/provider.error'
import type { ModelName } from '@/models/_model-name'

import { StatusError } from '@/errors/_shared/status-error'
import { ValueObjectName } from '@/value-objects/_value-object-name'

type ParametersConstructorDTO = {
  modelNameOrValueObjectName: ModelName | ValueObjectName
  error: Error | unknown | ProviderError
}

export class GenerateIDError {
  readonly status: StatusError
  readonly errorMessage: string
  readonly name: 'GenerateIDError'
  readonly errorValue: null | ProviderError | Error | unknown

  constructor(parameters: ParametersConstructorDTO) {
    this.status = StatusError.INVALID
    this.errorMessage = `Error generating id to ${
      parameters.modelNameOrValueObjectName in ValueObjectName ? 'value object' : 'model'
    } ${parameters.modelNameOrValueObjectName}`
    this.name = 'GenerateIDError'
    this.errorValue = parameters.error
  }
}

import type { ProviderError } from '@/errors/_shared/provider.error'
import type { ModelName } from '@/models/_model-name'

import { StatusError } from '@/errors/_shared/status-error'
import { ValueObjectName } from '@/value-objects/_value-object-name'

type ParametersConstructorDTO = {
  modelNameOrValueObjectName: ModelName | ValueObjectName
}

export class InvalidIDError {
  public readonly status: StatusError

  public readonly errorMessage: string

  public readonly name: 'InvalidIDError'

  public readonly errorValue: unknown | ProviderError

  constructor(parameters: ParametersConstructorDTO) {
    this.status = StatusError.INVALID
    this.errorMessage = `Invalid ID to ${
      parameters.modelNameOrValueObjectName in ValueObjectName ? 'value object' : 'model'
    } ${parameters.modelNameOrValueObjectName}`
    this.name = 'InvalidIDError'
    this.errorValue = undefined
  }
}

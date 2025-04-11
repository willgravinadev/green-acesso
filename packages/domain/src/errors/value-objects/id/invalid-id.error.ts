import { type ModelName } from '../../../models/_model-name'
import { ValueObjectName } from '../../../value-objects/_value-object-name'
import { type ProviderError } from '../../_shared/provider.error'
import { StatusError } from '../../_shared/status-error'

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

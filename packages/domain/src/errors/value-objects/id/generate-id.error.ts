import { type ModelName } from '../../../models/_model-name'
import { ValueObjectName } from '../../../value-objects/_value-object-name'
import { type ProviderError } from '../../_shared/provider.error'
import { StatusError } from '../../_shared/status-error'

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

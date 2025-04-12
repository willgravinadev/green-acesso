import { StatusError } from '../../_shared/status-error'

export class CondominiumLotNotFoundError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'CondominiumLotNotFoundError'

  readonly errorValue: null

  constructor(parameters: { condominiumLotName: string }) {
    this.status = StatusError.NOT_FOUND
    this.errorMessage = `Condominium lot with name "${parameters.condominiumLotName}" not found`
    this.name = 'CondominiumLotNotFoundError'
    this.errorValue = null
  }
}

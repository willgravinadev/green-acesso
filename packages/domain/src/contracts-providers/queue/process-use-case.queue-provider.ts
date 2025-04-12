import type { UseCase } from '../../shared/use-case'

export interface IProcessUseCaseQueueProvider {
  processUseCase<Params, ResultError, ResultSuccess>(
    useCase: UseCase<Params, ResultError, ResultSuccess>
  ): void
}

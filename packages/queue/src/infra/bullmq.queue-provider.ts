import {
  type EnqueuePaymentSlipImportQueueProviderDTO,
  type IEnqueuePaymentSlipImportQueueProvider,
  type IProcessUseCaseQueueProvider,
  type ISendLogErrorLoggerProvider,
  type ISendLogInfoLoggerProvider,
  ProviderError,
  ProvidersNames,
  QueueProviderMethods,
  type UseCase
} from '@greenacesso/domain'
import { makeLoggerProvider } from '@greenacesso/logger'
import { failure, success } from '@greenacesso/utils'
import { Queue, Worker } from 'bullmq'

import { queueKeys } from '../keys'

export class BullMQQueueProvider
  implements IEnqueuePaymentSlipImportQueueProvider, IProcessUseCaseQueueProvider
{
  private static instance: BullMQQueueProvider | undefined
  private readonly queue: Queue
  private readonly queueName = 'payment-slip-import'
  private readonly redisConfig = {
    host: queueKeys().REDIS_HOST || 'localhost',
    port: queueKeys().REDIS_PORT || 6379
  }

  private constructor(
    private readonly logger: ISendLogErrorLoggerProvider & ISendLogInfoLoggerProvider
  ) {
    this.logger = logger
    this.queue = new Queue(this.queueName, {
      connection: this.redisConfig,
      defaultJobOptions: {
        attempts: 4,
        delay: 1000
      }
    })
  }

  private setupWorkerEvents(worker: Worker): void {
    worker.on('ready', () => {
      this.logger.sendLogInfo({ message: 'Worker is ready' })
    })

    worker.on('drained', () => {
      this.logger.sendLogInfo({ message: 'Worker is drained' })
    })

    worker.on('progress', (job, progress) => {
      this.logger.sendLogInfo({
        message: `Job ${job.id} progress ${JSON.stringify(progress)}`
      })
    })

    worker.on('completed', (job, result) => {
      this.logger.sendLogInfo({
        message: `Job ${job.id} completed with result ${JSON.stringify(result)}`
      })
    })

    worker.on('failed', (job, error) => {
      this.logger.sendLogError({
        message: `Job ${job?.id} failed`,
        value: error
      })
    })

    worker.on('error', (error) => {
      this.logger.sendLogError({
        message: 'Worker error occurred',
        value: error
      })
    })
  }

  public processUseCase<Params, ResultError, ResultSuccess>(
    useCase: UseCase<Params, ResultError, ResultSuccess>
  ): void {
    const worker = new Worker<Params, void, string>(
      this.queueName,
      async (job) => {
        const result = await useCase.execute(job.data)
        if (result.isFailure()) {
          const error = result.value as { errorMessage: string; name: string; errorValue: unknown }
          this.logger.sendLogError({
            message: error.errorMessage,
            value: error
          })
          throw new Error(error.errorMessage, { cause: error })
        }
        if (result.isSuccess()) {
          this.logger.sendLogInfo({ message: `Job ${job.id} completed successfully` })
        }
      },
      {
        concurrency: 1,
        connection: this.redisConfig
      }
    )

    this.setupWorkerEvents(worker)
  }

  public async enqueuePaymentSlipImport(
    params: EnqueuePaymentSlipImportQueueProviderDTO.Parameters
  ): EnqueuePaymentSlipImportQueueProviderDTO.Result {
    try {
      const response = await this.queue.add(this.queueName, params, {
        removeOnComplete: true,
        removeOnFail: 1000,
        attempts: 3,
        delay: 3000
      })
      return success({ messageID: response.id ?? '' })
    } catch (error: unknown) {
      const providerError = new ProviderError({
        error,
        provider: {
          name: ProvidersNames.QUEUE,
          method: QueueProviderMethods.ENQUEUE_PAYMENT_SLIP_IMPORT,
          externalName: 'bullmq'
        }
      })

      this.logger.sendLogError({
        message: providerError.errorMessage,
        value: providerError
      })

      return failure(providerError)
    }
  }

  public static getInstance(): BullMQQueueProvider {
    BullMQQueueProvider.instance ??= new BullMQQueueProvider(makeLoggerProvider())
    return BullMQQueueProvider.instance
  }
}

import type {
  IEnqueuePaymentSlipImportQueueProvider,
  IProcessUseCaseQueueProvider
} from '@greenacesso/domain'

import { BullMQQueueProvider } from './infra/bullmq.queue-provider'

export const makeQueueProvider = (): IEnqueuePaymentSlipImportQueueProvider &
  IProcessUseCaseQueueProvider => {
  return BullMQQueueProvider.getInstance()
}

export * from './keys'

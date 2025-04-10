import type {
  ISendLogErrorLoggerProvider,
  ISendLogInfoLoggerProvider,
  ISendLogTimeControllerLoggerProvider,
  ISendLogTimeUseCaseLoggerProvider
} from '@ecomverzo/domain'

import { PinoLoggerProvider } from './infra/pino.logger-provider'

export const makeLoggerProvider = (): ISendLogErrorLoggerProvider &
  ISendLogTimeControllerLoggerProvider &
  ISendLogTimeUseCaseLoggerProvider &
  ISendLogInfoLoggerProvider => {
  return PinoLoggerProvider.getInstance()
}

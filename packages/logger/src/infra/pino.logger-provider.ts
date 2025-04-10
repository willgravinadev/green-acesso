import {
  type ISendLogErrorLoggerProvider,
  type ISendLogInfoLoggerProvider,
  type ISendLogTimeControllerLoggerProvider,
  type ISendLogTimeUseCaseLoggerProvider,
  type SendLogErrorLoggerProviderDTO,
  type SendLogInfoLoggerProviderDTO,
  type SendLogTimeControllerLoggerProviderDTO,
  type SendLogTimeUseCaseLoggerProviderDTO
} from '@ecomverzo/domain'
import pino, { type Logger } from 'pino'

export class PinoLoggerProvider
  implements
    ISendLogErrorLoggerProvider,
    ISendLogInfoLoggerProvider,
    ISendLogTimeControllerLoggerProvider,
    ISendLogTimeUseCaseLoggerProvider
{
  private static instance: PinoLoggerProvider | undefined

  private readonly logger: Logger

  private constructor() {
    this.logger = pino({
      level: 'debug',
      transport: {
        targets: [
          {
            target: 'pino-pretty',
            level: 'error',
            options: {
              name: 'dev-terminal',
              colorize: true,
              levelFirst: true,
              include: 'level,time',
              translateTime: 'yyyy-mm-dd HH:MM:ss Z'
            }
          }
        ]
      }
    })
  }

  public static getInstance(): PinoLoggerProvider {
    PinoLoggerProvider.instance ??= new PinoLoggerProvider()
    return PinoLoggerProvider.instance
  }

  public sendLogInfo(
    parameters: SendLogInfoLoggerProviderDTO.Parameters
  ): SendLogInfoLoggerProviderDTO.Result {
    this.logger.info(parameters.message)
    return null
  }

  public sendLogError(
    parameters: SendLogErrorLoggerProviderDTO.Parameters
  ): SendLogErrorLoggerProviderDTO.Result {
    this.logger.error(parameters.value, parameters.message)
    return null
  }

  public sendLogTimeController(
    parameters: SendLogTimeControllerLoggerProviderDTO.Parameters
  ): SendLogTimeControllerLoggerProviderDTO.Result {
    this.logger.info(parameters, parameters.message)
    return null
  }

  public sendLogTimeUseCase(
    parameters: SendLogTimeUseCaseLoggerProviderDTO.Parameters
  ): SendLogTimeUseCaseLoggerProviderDTO.Result {
    this.logger.info(parameters, parameters.message)
    return null
  }
}

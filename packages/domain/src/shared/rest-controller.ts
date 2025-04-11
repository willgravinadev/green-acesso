import { performance } from 'node:perf_hooks'

import { type Either } from '@greenacesso/utils'

import { type ISendLogErrorLoggerProvider } from '../contracts-providers/logger/send-log-error.logger-provider'
import { type ISendLogTimeControllerLoggerProvider } from '../contracts-providers/logger/send-log-time-controller.logger-provider'
import { StatusError as HttpStatusError } from '../errors/_shared/status-error'

import { HttpStatusCode } from './http-status-code.util'
import {
  type ControllerResponse,
  type HttpResponse,
  type HttpResponseError,
  type HttpResponseSuccess,
  HttpStatusSuccess
} from './rest-controller.types'

// Interface for metrics logging data.
interface MetricsData<TRequest, TResponse> {
  request: TRequest
  startTime: number
  success: boolean
  response: TResponse
}

/**
 * Interface for handling sensitive data sanitization in logs.
 */
export interface ISensitiveDataHandler {
  sanitize(data: unknown): string
  isSensitiveField(key: string): boolean
}

/**
 * Implementation that sanitizes sensitive fields like passwords and tokens
 * to prevent exposing sensitive information in logs.
 */
export class SensitiveDataHandler implements ISensitiveDataHandler {
  private readonly sensitiveFields = new Set([
    'password',
    'token',
    'access_token',
    'secret',
    'api_key',
    'private_key',
    'authorization'
  ])

  public sanitize(data: unknown): string {
    return JSON.stringify(data, (key, value) => {
      if (this.isSensitiveField(key)) {
        return '[REDACTED]'
      }
      return value as unknown
    })
  }

  public isSensitiveField(key: string): boolean {
    return this.sensitiveFields.has(key.toLowerCase())
  }
}

/**
 * Abstract base controller with enhanced type safety and error handling.
 * Provides consistent error handling, performance logging, and response formatting.
 *
 * @template TRequest - The type of request data expected by this controller
 * @template TFailure - The type of error response returned by this controller
 * @template TSuccess - The type of success response returned by this controller
 */
export abstract class RestController<
  TRequest,
  TFailure extends HttpResponseError,
  TSuccess extends HttpResponseSuccess<unknown>
> {
  private readonly sensitiveDataHandler: ISensitiveDataHandler

  // Static mapping from status values to HTTP status codes.
  private static readonly statusMap = new Map<HttpStatusError | HttpStatusSuccess, HttpStatusCode>([
    [HttpStatusError.CONFLICT, HttpStatusCode.CONFLICT],
    [HttpStatusError.INVALID, HttpStatusCode.BAD_REQUEST],
    [HttpStatusError.NOT_FOUND, HttpStatusCode.NOT_FOUND],
    [HttpStatusError.PROVIDER_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR],
    [HttpStatusError.REPOSITORY_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR],
    [HttpStatusError.NOT_EXISTS, HttpStatusCode.NOT_FOUND],
    [HttpStatusError.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED],
    [HttpStatusSuccess.CREATED, HttpStatusCode.CREATED],
    [HttpStatusSuccess.DONE, HttpStatusCode.OK]
  ])

  constructor(
    protected readonly loggerProvider: ISendLogErrorLoggerProvider &
      ISendLogTimeControllerLoggerProvider,
    protected readonly controllerName = new.target.name,
    sensitiveDataHandler?: ISensitiveDataHandler
  ) {
    this.sensitiveDataHandler = sensitiveDataHandler ?? new SensitiveDataHandler()
  }

  /**
   * Abstract method to perform the main operation.
   * Concrete controllers must implement this.
   */
  protected abstract performOperation(request: TRequest): Promise<Either<TFailure, TSuccess>>

  /**
   * Main entry point that handles the request, logs metrics,
   * and returns an appropriate HTTP response.
   */
  public async handle(request: TRequest): ControllerResponse<TFailure | TSuccess> {
    const startTime = performance.now()

    try {
      const result = await this.performOperation(request)

      if (result.isFailure()) {
        const errorResponse = this.buildErrorResponse(result.value)
        this.logError(result.value)
        this.logMetrics({
          request,
          startTime,
          success: false,
          response: errorResponse.data as TFailure
        })
        return errorResponse
      }

      const successResponse = this.buildSuccessResponse(result.value)
      this.logMetrics({
        request,
        startTime,
        success: true,
        response: successResponse.data as TSuccess
      })
      return successResponse
    } catch (error: unknown) {
      const errorResponse = this.handleError(error) as HttpResponse<TFailure | TSuccess>
      this.logError(error)
      this.logMetrics({
        request,
        startTime,
        success: false,
        response: errorResponse.data as TFailure
      })
      return errorResponse
    }
  }

  /**
   * Handles errors by returning a generic internal server error response.
   */
  protected handleError(error: unknown): HttpResponse<TFailure> {
    return {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      data: {
        errorMessage: error instanceof Error ? error.message : 'Unknown error occurred',
        status: HttpStatusError.INTERNAL_SERVER_ERROR
      } as TFailure
    }
  }

  /**
   * Logs error details using the provided logger.
   */
  private logError(error: unknown): void {
    this.loggerProvider.sendLogError({
      message: `${this.controllerName}.handle() error`,
      value: error
    })
  }

  /**
   * Logs performance metrics including execution time and sanitized request/response.
   */
  private logMetrics(input: MetricsData<TRequest, TFailure | TSuccess>): void {
    const sanitizedRequest = this.sensitiveDataHandler.sanitize(input.request)
    const sanitizedResponse = this.sensitiveDataHandler.sanitize(input.response)
    const runtime = performance.now() - input.startTime

    this.loggerProvider.sendLogTimeController({
      message: `${this.controllerName}.handle() executed in ${runtime.toFixed(2)} ms`,
      controllerName: this.controllerName,
      runtimeInMs: runtime,
      httpRequest: sanitizedRequest,
      httpResponse: sanitizedResponse,
      isSuccess: input.success
    })
  }

  /**
   * Constructs an error HTTP response from a failure result.
   */
  private buildErrorResponse(input: TFailure): HttpResponse<TFailure> {
    return {
      statusCode: RestController.mapStatus(input.status),
      data: input
    }
  }

  /**
   * Constructs a success HTTP response from a success result.
   */
  private buildSuccessResponse(input: TSuccess): HttpResponse<TSuccess> {
    return {
      statusCode: RestController.mapStatus(input.status),
      data: {
        success: input.success as never,
        status: input.status
      }
    }
  }

  /**
   * Maps a status value to its corresponding HTTP status code.
   */
  private static mapStatus(status: HttpStatusError | HttpStatusSuccess): HttpStatusCode {
    return this.statusMap.get(status) ?? HttpStatusCode.INTERNAL_SERVER_ERROR
  }
}

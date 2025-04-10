import type { StatusError as HttpStatusError } from '../errors/_shared/status-error'
import type { HttpStatusCode } from './http-status-code.util'
import type { Readable } from 'node:stream'

export interface HttpResponseError {
  errorMessage: string
  status: HttpStatusError
}

export interface HttpResponseSuccess<T> {
  success: T
  status: HttpStatusSuccess
}

export enum HttpStatusSuccess {
  CREATED = 'CREATED',
  DONE = 'DONE'
}

export type HttpResponseHeaders = Record<string, string | string[] | undefined>

// Improved HTTP response types
export interface HttpResponse<T> {
  statusCode: HttpStatusCode
  data: HttpResponseSuccess<T> | HttpResponseError
  headers?: HttpResponseHeaders
}

// Improved HTTP request type with better type safety
export interface HttpRequest<
  Body = unknown,
  Query = unknown,
  Params = unknown,
  Headers extends Record<string, string | string[] | undefined> = Record<
    string,
    string | string[] | undefined
  >
> {
  body: Body
  query: Query
  params: Params
  headers: Headers
  access_token: string
  file: FileUpload | undefined
}

// Separate file upload interface
export interface FileUpload {
  file: Readable
  fieldname: string
  filename: string
  encoding: string
  mimetype: string
}

// Controller interface with better type constraints
export interface IController<Request, Response> {
  handle(request: HttpRequest<Request>): Promise<HttpResponse<Response>>
}

// Type alias for controller responses
export type ControllerResponse<T = unknown> = Promise<HttpResponse<T>>

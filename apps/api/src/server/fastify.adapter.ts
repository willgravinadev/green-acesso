import { HttpStatusCode, HttpStatusSuccess, StatusError } from '@greenacesso/domain'

const statusMap = new Map<StatusError | HttpStatusSuccess, HttpStatusCode>([
  [StatusError.CONFLICT, HttpStatusCode.CONFLICT],
  [StatusError.INVALID, HttpStatusCode.BAD_REQUEST],
  [StatusError.NOT_FOUND, HttpStatusCode.NOT_FOUND],
  [StatusError.PROVIDER_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR],
  [StatusError.REPOSITORY_ERROR, HttpStatusCode.INTERNAL_SERVER_ERROR],
  [StatusError.NOT_EXISTS, HttpStatusCode.NOT_FOUND],
  [StatusError.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED],
  [HttpStatusSuccess.CREATED, HttpStatusCode.CREATED],
  [HttpStatusSuccess.DONE, HttpStatusCode.OK]
])

export function mapStatus(status: StatusError | HttpStatusSuccess): HttpStatusCode {
  return statusMap.get(status) ?? HttpStatusCode.INTERNAL_SERVER_ERROR
}

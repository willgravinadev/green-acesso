import { type Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'

import { type MultipartFile } from '@fastify/multipart'
import { HttpStatusCode, HttpStatusSuccess, StatusError } from '@greenacesso/domain'
import { makeLoggerProvider } from '@greenacesso/logger'
import { makeValidateCSVRowAndEnqueuePaymentSlipImportUseCase } from '@server/factories/use-cases/payment-slip/validate-csv-row-and-enqueue-payment-slip-import-use-case.factory'
import * as csv from 'csv'
import { type FastifyInstance } from 'fastify'
import { z } from 'zod'

type CSVRow = {
  nome: string
  unidade: string
  valor: string
  linha_digitavel: string
}

type ProcessResult = { isSuccess: true; data: string } | { isSuccess: false; error: string }

const CSV_RESPONSE_SCHEMA = {
  [HttpStatusCode.OK]: z.object({
    status: z.literal(HttpStatusSuccess.DONE),
    success: z.object({
      paymentSlipsImported: z.array(z.string()),
      paymentSlipsErrors: z.array(z.string())
    })
  }),
  [HttpStatusCode.BAD_REQUEST]: z.object({
    status: z.literal(StatusError.INTERNAL_SERVER_ERROR),
    error: z.object({ message: z.string() })
  })
}

const isCSVFile = (file: MultipartFile | undefined): file is MultipartFile =>
  Boolean(file) && file?.mimetype === 'text/csv'

const mapRecordToCSVRow = (record: Record<string, string>): CSVRow => ({
  nome: record.nome ?? '',
  unidade: record.unidade ?? '',
  valor: record.valor ?? '',
  linha_digitavel: record.linha_digitavel ?? ''
})

const validateAndEnqueue = async (record: Record<string, string>): Promise<ProcessResult> => {
  const result = await makeValidateCSVRowAndEnqueuePaymentSlipImportUseCase().execute({
    csvRow: mapRecordToCSVRow(record)
  })

  return result.isFailure()
    ? { isSuccess: false, error: result.value.errorMessage }
    : {
        isSuccess: true,
        data: `${result.value.condominiumLotName} - ${result.value.payerName}`
      }
}

const processCSVStream = async (stream: Readable): Promise<ProcessResult[]> => {
  const results: ProcessResult[] = []
  for await (const record of stream.pipe(
    csv.parse({ columns: true, delimiter: ';', trim: true, skip_empty_lines: true })
  ) as AsyncIterable<Record<string, string>>) {
    results.push(await validateAndEnqueue(record))
  }

  return results
}

export const importPaymentSlipsFromCSVRoute = (app: FastifyInstance) => {
  app.post(
    '/boletos/import/csv',
    {
      schema: {
        tags: ['Boletos'],
        summary: 'Import payment slips from CSV',
        description: 'Import payment slips from a CSV file',
        consumes: ['multipart/form-data'],
        operationId: 'importPaymentSlipsFromCSV',
        response: CSV_RESPONSE_SCHEMA
      }
    },
    async (request, reply) => {
      try {
        const file = await request.file()

        if (!isCSVFile(file)) {
          return await reply
            .code(HttpStatusCode.BAD_REQUEST)
            .send({ status: 'error', error: { message: 'File must be a CSV' } })
        }

        const results = await pipeline(file.file, async (stream) =>
          processCSVStream(stream as Readable)
        )

        return await reply.code(HttpStatusCode.OK).send({
          status: HttpStatusSuccess.DONE,
          success: {
            paymentSlipsImported: results
              .filter((r) => r.isSuccess)
              .map((r) => (r as { data: string }).data),
            paymentSlipsErrors: results
              .filter((r) => !r.isSuccess)
              .map((r) => (r as { error: string }).error)
          }
        })
      } catch (error: unknown) {
        makeLoggerProvider().sendLogError({
          message: 'Error importing payment slips from CSV in route',
          value: error
        })
        return reply.code(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
          status: StatusError.INTERNAL_SERVER_ERROR,
          error: { message: 'Failed to process CSV file' }
        })
      }
    }
  )
}

import type { MultipartFile } from '@fastify/multipart'
import type { FastifyInstance } from 'fastify'

import { HttpStatusCode, HttpStatusSuccess, StatusError } from '@greenacesso/domain'
import { makeLoggerProvider } from '@greenacesso/logger'
import { makeImportPaymentSlipFromPDFUseCase } from '@server/factories/use-cases/payment-slip/import-payment-slip-from-pdf-use-case.factory'
import { mapStatus } from '@server/fastify.adapter'
import { z } from 'zod'

const PDF_RESPONSE_SCHEMA = {
  [HttpStatusCode.OK]: z.object({
    status: z.literal(HttpStatusSuccess.DONE),
    success: z.object({
      paymentSlipsURLs: z.array(z.string())
    })
  }),
  [HttpStatusCode.BAD_REQUEST]: z.object({
    status: z.enum([StatusError.INVALID, StatusError.PROVIDER_ERROR]),
    error: z.object({ message: z.string() })
  }),
  [HttpStatusCode.INTERNAL_SERVER_ERROR]: z.object({
    status: z.literal(StatusError.INTERNAL_SERVER_ERROR),
    error: z.object({ message: z.string() })
  })
}

const isPDFFile = (file: MultipartFile | undefined): file is MultipartFile =>
  Boolean(file) && file?.mimetype === 'application/pdf'

export const importPaymentSlipsFromPDFRoute = (app: FastifyInstance) => {
  app.post(
    '/boletos/import/pdf',
    {
      schema: {
        tags: ['Boletos'],
        summary: 'Import payment slips from PDF',
        description: 'Import payment slips from a PDF file',
        consumes: ['multipart/form-data'],
        operationId: 'importPaymentSlipsFromPDF',
        response: PDF_RESPONSE_SCHEMA
      }
    },
    async (request, reply) => {
      try {
        const file = await request.file()

        if (!isPDFFile(file)) {
          return await reply
            .code(HttpStatusCode.BAD_REQUEST)
            .send({ status: 'error', error: { message: 'File must be a PDF' } })
        }

        const result = await makeImportPaymentSlipFromPDFUseCase().execute({
          pdfBuffer: await file.toBuffer()
        })

        if (result.isFailure()) {
          return await reply
            .code(mapStatus(result.value.status))
            .send({ status: 'error', error: { message: result.value.errorMessage } })
        }

        return await reply.code(HttpStatusCode.OK).send({
          status: HttpStatusSuccess.DONE,
          success: { paymentSlipsURLs: result.value.paymentSlipsURLs }
        })
      } catch (error: unknown) {
        makeLoggerProvider().sendLogError({
          message: 'Error importing payment slips from PDF in route',
          value: error
        })
        return await reply.code(mapStatus(StatusError.INTERNAL_SERVER_ERROR)).send({
          status: StatusError.INTERNAL_SERVER_ERROR,
          error: { message: 'Failed to process PDF file' }
        })
      }
    }
  )
}

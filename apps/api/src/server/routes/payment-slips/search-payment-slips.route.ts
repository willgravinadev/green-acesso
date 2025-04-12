import type { FastifyInstance } from 'fastify'

import { HttpStatusCode, HttpStatusSuccess, StatusError } from '@greenacesso/domain'
import { makeLoggerProvider } from '@greenacesso/logger'
import { makeExportPaymentSlipsReportAsPDFUseCase } from '@server/factories/use-cases/payment-slip/export-payment-slips-report-as-pdf-use-case.factory'
import { makeSearchPaymentSlipsUseCase } from '@server/factories/use-cases/payment-slip/search-payment-slips-use-case.factory'
import { mapStatus } from '@server/fastify.adapter'
import { z } from 'zod'

const SEARCH_PAYMENT_SLIPS_RESPONSE_SCHEMA = {
  [HttpStatusCode.OK]: z.object({
    status: z.literal(HttpStatusSuccess.DONE),
    success: z.object({
      paymentSlips: z
        .array(
          z.object({
            id: z.string(),
            amountInCents: z.number(),
            barcode: z.string(),
            payerName: z.string(),
            status: z.string(),
            condominiumLot: z.object({
              name: z.string(),
              status: z.string()
            })
          })
        )
        .optional(),
      pdfInBase64: z.string().optional()
    })
  }),
  [HttpStatusCode.BAD_REQUEST]: z.object({
    status: z.literal(StatusError.INTERNAL_SERVER_ERROR),
    error: z.object({ message: z.string() })
  })
}

export const searchPaymentSlipsRoute = (app: FastifyInstance) => {
  app.get(
    '/boletos',
    {
      schema: {
        tags: ['Boletos'],
        summary: 'Search payment slips',
        description: 'Search payment slips',
        operationId: 'searchPaymentSlips',
        response: SEARCH_PAYMENT_SLIPS_RESPONSE_SCHEMA,
        query: z.object({
          payerName: z.string().optional().describe('Payer name'),
          id: z.string().optional().describe('Payment slip ID'),
          startAmountInCents: z.string().optional().describe('Start amount in cents'),
          endAmountInCents: z.string().optional().describe('End amount in cents'),
          relatorio: z.string().optional().describe('Relatorio')
        })
      }
    },
    async (request, reply) => {
      try {
        const { payerName, id, startAmountInCents, endAmountInCents, relatorio } =
          request.query as {
            payerName?: string
            id?: string
            startAmountInCents?: string
            endAmountInCents?: string
            relatorio?: string
          }

        const isReport = relatorio === '1'

        if (isReport) {
          const result = await makeExportPaymentSlipsReportAsPDFUseCase().execute({
            searchParams: {
              payerName,
              id,
              startAmountInCents,
              endAmountInCents
            }
          })
          if (result.isFailure()) {
            return await reply.status(mapStatus(result.value.status)).send({
              status: result.value.status,
              error: {
                message: result.value.errorMessage
              }
            })
          }

          return await reply.status(HttpStatusCode.OK).send({
            status: HttpStatusSuccess.DONE,
            success: {
              pdfInBase64: result.value.pdfInBase64,
              paymentSlips: undefined
            }
          })
        }

        const result = await makeSearchPaymentSlipsUseCase().execute({
          searchParams: {
            payerName,
            id,
            startAmountInCents,
            endAmountInCents
          }
        })

        if (result.isFailure()) {
          return await reply.status(mapStatus(result.value.status)).send({
            status: result.value.status,
            error: {
              message: result.value.errorMessage
            }
          })
        }

        return await reply.status(HttpStatusCode.OK).send({
          status: HttpStatusSuccess.DONE,
          success: {
            paymentSlips: result.value.paymentSlips.map((slip) => ({
              id: slip.id.value,
              amountInCents: slip.amountInCents,
              barcode: slip.barcode,
              payerName: slip.payerName,
              status: slip.status,
              condominiumLot: {
                name: slip.condominiumLot.name,
                status: slip.condominiumLot.status
              }
            })),
            pdfInBase64: undefined
          }
        })
      } catch (error: unknown) {
        makeLoggerProvider().sendLogError({
          message: 'Error searching payment slips in route',
          value: error
        })
        return await reply.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
          status: StatusError.INTERNAL_SERVER_ERROR,
          error: { message: error instanceof Error ? error.message : 'Unknown error' }
        })
      }
    }
  )
}

import type { FastifyTypedInstance } from './fastify-types'

import { importPaymentSlipsFromCSVRoute } from './routes/payment-slips/import-payment-slips-from-csv.route'
import { importPaymentSlipsFromPDFRoute } from './routes/payment-slips/import-payment-slips-from-pdf.route'
import { searchPaymentSlipsRoute } from './routes/payment-slips/search-payment-slips.route'

export function fastifyRoutes(fastify: FastifyTypedInstance) {
  importPaymentSlipsFromCSVRoute(fastify)
  importPaymentSlipsFromPDFRoute(fastify)
  searchPaymentSlipsRoute(fastify)
}

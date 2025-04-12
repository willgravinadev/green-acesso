import { Database } from '@greenacesso/database'
import { makeQueueProvider } from '@greenacesso/queue'
import { makeImportPaymentSlipFromCSVUseCase } from '@server/factories/use-cases/payment-slip/import-payment-slip-from-csv-use-case.factory'
import { FastifyFramework } from '@server/fastify-app'

const start = async () => {
  const database = Database.getInstance()
  database.connect()
  makeQueueProvider().processUseCase(makeImportPaymentSlipFromCSVUseCase())
  const server = new FastifyFramework()
  await server.execute()
}

start()

import fs from 'node:fs'
import path from 'node:path'

import {
  type CreatePDFReportPaymentSlipsProviderDTO,
  type GetPagesPDFProviderDTO,
  type ICreatePDFReportPaymentSlipsProvider,
  type IGetPagesPDFProvider,
  type ISendLogErrorLoggerProvider,
  type ISendLogInfoLoggerProvider,
  PDFProviderMethods,
  ProviderError,
  ProvidersNames
} from '@greenacesso/domain'
import { makeLoggerProvider } from '@greenacesso/logger'
import { failure, success } from '@greenacesso/utils'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export class PDFProvider implements IGetPagesPDFProvider, ICreatePDFReportPaymentSlipsProvider {
  private static instance: PDFProvider | undefined

  private constructor(
    private readonly logger: ISendLogErrorLoggerProvider & ISendLogInfoLoggerProvider
  ) {}

  public async createPDFReportPaymentSlips(
    parameters: CreatePDFReportPaymentSlipsProviderDTO.Parameters
  ): CreatePDFReportPaymentSlipsProviderDTO.Result {
    const pdfDoc = await PDFDocument.create()

    // Dimensões A4 em pontos (72pt = 1in)
    const pageWidth = 595.28 // 210mm
    const pageHeight = 841.89 // 297mm

    const margin = 40
    const rowHeight = 18

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const fontSize = 6
    const headerFontSize = 8

    const cols = [
      { key: 'id', title: 'ID', width: 140 },
      { key: 'payerName', title: 'Nome do Pagador', width: 100 },
      { key: 'condominiumLotName', title: 'Nome do Lote', width: 60 },
      { key: 'amountInCents', title: 'Valor', width: 50 },
      { key: 'barcode', title: 'Código de Barras', width: 140 }
    ] as const

    let page = pdfDoc.addPage([pageWidth, pageHeight])
    let y = pageHeight - margin

    const drawHeader = () => {
      y -= headerFontSize
      let x = margin
      for (const { title, width } of cols) {
        page.drawText(title, { x, y, size: headerFontSize, font, color: rgb(0, 0, 0) })
        x += width
      }
      y -= rowHeight
    }

    const addNewPage = () => {
      page = pdfDoc.addPage([pageWidth, pageHeight])
      y = pageHeight - margin
      drawHeader()
    }

    drawHeader()

    for (const paymentSlip of parameters.paymentSlips) {
      if (y < margin + rowHeight) {
        addNewPage()
      }

      let x = margin
      for (const { key, width } of cols) {
        let text = ''
        switch (key) {
          case 'condominiumLotName': {
            text = String(paymentSlip.condominiumLot.name)
            break
          }
          case 'amountInCents': {
            text = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
              paymentSlip.amountInCents / 100
            )
            break
          }
          default: {
            text = String(paymentSlip[key])
          }
        }
        page.drawText(text, { x, y, size: fontSize, font })
        x += width
      }
      y -= rowHeight
    }

    const pdfBytes = await pdfDoc.save()
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64')
    const date = new Date()
    // Set timezone to Brazil (Brasília Time - BRT)
    date.setTime(date.getTime() - 3 * 60 * 60 * 1000) // UTC-3
    const day = date.getUTCDate().toString().padStart(2, '0')
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
    const year = date.getUTCFullYear()
    const hours = date.getUTCHours().toString().padStart(2, '0')
    const minutes = date.getUTCMinutes().toString().padStart(2, '0')
    const seconds = date.getUTCSeconds().toString().padStart(2, '0')
    const formattedDate = `${hours}-${minutes}-${seconds}-${day}-${month}-${year}`
    const fileName = `report-payment-slips-${formattedDate}.pdf`
    const outputDir = path.resolve(process.cwd(), '..', '..', 'tmp', 'pdf', 'report-payment-slips')

    // Ensure directory exists
    fs.mkdirSync(outputDir, { recursive: true })

    const outputPath = path.join(outputDir, fileName)
    fs.writeFileSync(outputPath, pdfBytes)
    return success({ pdfPath: outputPath, pdfInBase64: pdfBase64 })
  }

  public async getPages(
    parameters: GetPagesPDFProviderDTO.Parameters
  ): GetPagesPDFProviderDTO.Result {
    try {
      const pdfDoc = await PDFDocument.load(parameters.pdfBuffer)
      const pages = pdfDoc.getPages()
      const pdfPages = await Promise.all(
        pages.map(async (_, index) => {
          const subDocument = await PDFDocument.create()
          const [copiedPage] = await subDocument.copyPages(pdfDoc, [index])
          subDocument.addPage(copiedPage)
          const pdfBytes = await subDocument.save()
          return Buffer.from(pdfBytes)
        })
      )
      return success({ pdfPages })
    } catch (error) {
      const providerError = new ProviderError({
        provider: { method: PDFProviderMethods.GET_PAGES, name: ProvidersNames.PDF },
        error
      })
      this.logger.sendLogError({
        message: providerError.errorMessage,
        value: providerError.errorValue
      })
      return failure(providerError)
    }
  }

  public static getInstance(): PDFProvider {
    PDFProvider.instance ??= new PDFProvider(makeLoggerProvider())
    return PDFProvider.instance
  }
}

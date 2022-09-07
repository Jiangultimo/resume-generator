import type { NextApiRequest, NextApiResponse } from 'next'
import { generatePDF } from '@/utils/pdf'
import { getEnv } from '@/utils/env'
import to from 'await-to-js'

const exportPDF = async (req: NextApiRequest, res: NextApiResponse) => {
  const host = getEnv('HOST')
  const port = getEnv('PORT')
  const route = getEnv('ROUTE')
  const [pdfErr, pdfBuffer] = await to<Buffer>(generatePDF(`${host}:${port}${route}`))
  // response pdf errors
  if (pdfErr) {
    res.statusCode = 500
    res.send(pdfErr)
    return
  }
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Length', pdfBuffer.length)
  res.send(pdfBuffer)
}

export default exportPDF

import type { NextApiRequest, NextApiResponse } from 'next'
import { generatePDF } from '@/utils/pdf'
import to from 'await-to-js'

const exportPDF = async (req: NextApiRequest, res: NextApiResponse) => {
  const [pdfErr, pdfBuffer] = await to<Buffer>(generatePDF('http://localhost:3000'))
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

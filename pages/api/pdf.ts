import type { NextApiRequest, NextApiResponse } from 'next'
import { generatePDF } from '@/utils/pdf'
import { getEnv } from '@/utils/env'
import to from 'await-to-js'

const exportPDF = async (req: NextApiRequest, res: NextApiResponse) => {
  const [host, port, route] = ['HOST', 'PORT', 'ROUTE'].reduce((prev: string[], cur: string): string[] => [...prev, getEnv(cur)] as string[], [])
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

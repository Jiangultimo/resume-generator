import type { StaticImageData } from 'next/image'
// import PDFDocument from 'pdfkit'
// import blobStream from 'blob-stream'

import pdfIcon from '@/public/icons/pdf.png'

export interface Tool {
  name: string,
  icon: StaticImageData,
  des?: string,
  click: () => void
}

const TOOLS: Tool[] = [
  {
    name: 'pdf',
    icon: pdfIcon,
    des: 'Export PDF',
    click: () => {
      // TODO handle export pdf
      // const doc = new PDFDocument()
      // const stream = doc.pipe(blobStream())
      // doc.end()
      // stream.on('finish', () => {
      //   // const blob = stream.toBlob('application/pdf')
      //   const url = stream.toBlobURL('application/pdf')
      //   const aEle = document.createElement('a')
      //   aEle.href = url
      //   aEle.click()
      //   aEle.remove()
      // })
    }
  }
]

export default TOOLS

import type { StaticImageData } from 'next/image'

import pdfIcon from '@/public/icons/pdf.png'

export interface Tool {
  name: string,
  icon: StaticImageData,
  des?: string,
  click?: () => Promise<void>
}

const TOOLS: Tool[] = [
  {
    name: 'pdf',
    icon: pdfIcon,
    des: 'Export PDF',
    click: async () => {
      const res = await fetch('http://localhost:3000/api/pdf')
      const resBlob = await res.blob() // get response blob
      const blob = new Blob([resBlob])
      const blobUrl = await window.URL.createObjectURL(blob)

      const aEle = document.createElement('a')
      aEle.setAttribute('download', `resume.pdf`)
      aEle.href = blobUrl
      aEle.click()
      aEle.remove()
      window.URL.revokeObjectURL(blobUrl)
    }
  }
]

export default TOOLS

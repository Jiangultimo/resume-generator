import type { StaticImageData } from 'next/image'

import { localTime } from '@/utils/time'
import pdfIcon from '@/public/icons/pdf.png'

export interface Tool {
  name: string,
  icon: StaticImageData,
  des?: string,
  click?: (param: Intro) => Promise<void>
}

export const exportPDF: Tool = {
  name: 'pdf',
  icon: pdfIcon,
  des: 'Export PDF',
  click: async ({ name }) => {
    const res = await fetch('http://localhost:3000/api/pdf')
    const resBlob = await res.blob() // get response blob
    const blob = new Blob([resBlob])
    const blobUrl = await window.URL.createObjectURL(blob)

    const aEle = document.createElement('a')
    aEle.setAttribute('download', `${name}-${localTime()}.pdf`)
    aEle.href = blobUrl
    aEle.click()
    aEle.remove()
    window.URL.revokeObjectURL(blobUrl)
  }
}

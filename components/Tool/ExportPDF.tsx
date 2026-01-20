'use client'

import React, { memo, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingContext from '@/context/loading'
import { Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useI18n } from '@/context/i18n'
import { cn } from '@/lib/utils'

type ExportStatus = 'idle' | 'exporting' | 'success' | 'error'

const isProduction = process.env.NODE_ENV === 'production'

const Tool: React.FC = () => {
  const loadingContext = useContext(LoadingContext)
  const [exportStatus, setExportStatus] = useState<ExportStatus>('idle')
  const { t, language } = useI18n()

  // 生产环境不渲染导出按钮
  if (isProduction) {
    return null
  }

  const handleExportPDF = async () => {
    try {
      setExportStatus('exporting')

      // 调用 API 生成 PDF
      const langParam = language === 'zh' ? 'cn' : 'en'
      const response = await fetch(`/api/export-pdf?lang=${langParam}`)

      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }

      // 获取 PDF blob
      const blob = await response.blob()

      // 从响应头获取文件名
      const contentDisposition = response.headers.get('Content-Disposition')
      let filename = language === 'en' ? 'resume-en.pdf' : 'resume-zh.pdf'
      if (contentDisposition) {
        // 尝试从 filename*=UTF-8'' 格式获取
        const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/)
        if (utf8Match) {
          filename = decodeURIComponent(utf8Match[1])
        } else {
          // 回退到普通 filename
          const match = contentDisposition.match(/filename="([^"]+)"/)
          if (match) {
            filename = decodeURIComponent(match[1])
          }
        }
      }

      // 创建下载链接
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()

      // 清理
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setExportStatus('success')
      setTimeout(() => {
        setExportStatus('idle')
      }, 2000)
    } catch (error) {
      console.error('PDF export error:', error)
      setExportStatus('error')
      setTimeout(() => setExportStatus('idle'), 2000)
    }
  }

  const getIconAndText = () => {
    switch (exportStatus) {
      case 'exporting':
        return {
          icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
          text: t.exporting
        }
      case 'success':
        return {
          icon: <CheckCircle className="w-3.5 h-3.5" />,
          text: t.exportSuccess
        }
      case 'error':
        return {
          icon: <AlertCircle className="w-3.5 h-3.5" />,
          text: t.exportFailed
        }
      default:
        return {
          icon: <Download className="w-3.5 h-3.5" />,
          text: t.exportPDF || 'PDF'
        }
    }
  }

  const { icon, text } = getIconAndText()
  const isDisabled = loadingContext.loading || exportStatus !== 'idle'

  return (
    <motion.div
      data-hide-on-print
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="relative"
    >
      <AnimatePresence mode="wait">
        <motion.button
          key={exportStatus}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={handleExportPDF}
          disabled={isDisabled}
          data-export-pdf
          className={cn(
            'flex items-center justify-center gap-1.5',
            'bg-white/20 backdrop-blur-md border border-white/30',
            'rounded-full px-4 h-[44px]',
            'shadow-lg shadow-black/10',
            'text-sm font-medium transition-all duration-300',
            'dark:bg-gray-800/40 dark:border-gray-600/30',
            'hover:scale-105',
            exportStatus === 'idle' && 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white',
            exportStatus === 'success' && 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-500/25',
            exportStatus === 'error' && 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md shadow-red-500/25',
            exportStatus === 'exporting' && 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md shadow-blue-500/25',
            isDisabled && 'cursor-not-allowed opacity-70'
          )}
        >
          <span className="transition-transform duration-300">{icon}</span>
          <span className="font-semibold tracking-wide">{text}</span>
        </motion.button>
      </AnimatePresence>
    </motion.div>
  )
}

export default memo(Tool)

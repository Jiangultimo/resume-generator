'use client'

import React, { memo, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingContext from '@/context/loading'
import { Button } from '@/components/ui/button'
import { Download, CheckCircle, AlertCircle } from 'lucide-react'
import { useI18n } from '@/context/i18n'
// Removed PDF export functionality for Vercel deployment compatibility

interface Props {
  infos?: Intro
}

type ExportStatus = 'idle' | 'exporting' | 'success' | 'error'

const nilInfos: Intro = {}

const Tool:React.FC<Props> = props => {
  const { infos = nilInfos } = props
  const loadingContext = useContext(LoadingContext)
  const [exportStatus, setExportStatus] = useState<ExportStatus>('idle')
  const { t } = useI18n()
  const handlePrint = () => {
    try {
      setExportStatus('exporting')
      // Hide tools and apply print styles
      const toolsElement = document.getElementById('tools')
      if (toolsElement) {
        toolsElement.style.display = 'none'
      }
      
      // Trigger browser print dialog
      window.print()
      
      setExportStatus('success')
      setTimeout(() => {
        setExportStatus('idle')
        // Restore tools visibility
        if (toolsElement) {
          toolsElement.style.display = 'block'
        }
      }, 1000)
    } catch (error) {
      setExportStatus('error')
      setTimeout(() => setExportStatus('idle'), 2000)
    }
  }

  const getButtonContent = () => {
    switch (exportStatus) {
      case 'exporting':
        return (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Download className="mr-2 h-4 w-4" />
            </motion.div>
            {t.exporting}
          </>
        )
      case 'success':
        return (
          <>
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            {t.exportSuccess}
          </>
        )
      case 'error':
        return (
          <>
            <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
            {t.exportFailed}
          </>
        )
      default:
        return (
          <>
            <Download className="mr-2 h-4 w-4" />
            {t.printResume}
          </>
        )
    }
  }

  return (
    <motion.div 
      className="fixed top-4 right-4 z-50" 
      id="tools"
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      whileHover={{ scale: exportStatus === 'idle' ? 1.05 : 1 }}
      whileTap={{ scale: exportStatus === 'idle' ? 0.95 : 1 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={exportStatus}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <Button
             variant="default"
             size="lg"
             className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
               exportStatus === 'success' ? 'bg-green-500 hover:bg-green-600' :
               exportStatus === 'error' ? 'bg-red-500 hover:bg-red-600' : ''
             }`}
             onClick={handlePrint}
             disabled={loadingContext.loading || exportStatus !== 'idle'}
             data-export-pdf
           >
            {getButtonContent()}
          </Button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default memo(Tool)

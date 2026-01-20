'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Image as ImageIcon, Loader2 } from 'lucide-react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardPortal,
} from '@/components/ui/hover-card'
import { cn } from '@/lib/utils'

interface LinkPreviewData {
  title: string
  description: string
  image: string
  url: string
  screenshot?: string
}

interface LinkPreviewProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function LinkPreview({ href, children, className }: LinkPreviewProps) {
  const [previewData, setPreviewData] = useState<LinkPreviewData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // 检查是否是有效的 http/https 链接
  const isValidHttpUrl = () => {
    try {
      const url = new URL(href)
      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
      return false
    }
  }

  // 如果不是有效的 HTTP 链接,直接返回普通链接,不显示预览
  if (!isValidHttpUrl()) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'text-emerald-600 hover:text-emerald-700',
          'underline hover:no-underline',
          'font-medium transition-all duration-200',
          'hover:bg-emerald-50 hover:px-1 hover:py-0.5 hover:rounded',
          'inline-flex items-center gap-1',
          'relative z-0', // 设置相对定位和低 z-index
          className
        )}
      >
        {children}
        <ExternalLink className="w-3 h-3 opacity-60" />
      </a>
    )
  }

  useEffect(() => {
    // 只在 hover card 打开时才加载预览
    if (isOpen && !previewData && !error) {
      loadPreview()
    }
  }, [isOpen])

  const loadPreview = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/link-preview?url=${encodeURIComponent(href)}`)

      if (!response.ok) {
        throw new Error('Failed to load preview')
      }

      const data: LinkPreviewData = await response.json()
      setPreviewData(data)
    } catch (err) {
      console.error('Link preview error:', err)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <HoverCard openDelay={200} closeDelay={300} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'text-emerald-600 hover:text-emerald-700',
            'underline hover:no-underline',
            'font-medium transition-all duration-200',
            'hover:bg-emerald-50 hover:px-1 hover:py-0.5 hover:rounded',
            'inline-flex items-center gap-1',
            'relative z-0', // 设置相对定位和低 z-index,确保不会遮挡预览卡片
            className
          )}
        >
          {children}
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
      </HoverCardTrigger>

      <HoverCardPortal>
        <HoverCardContent
          side="top"
          align="center"
          sideOffset={8}
          className={cn(
            'w-96 p-0 overflow-hidden',
            'bg-white/95 backdrop-blur-sm',
            'border-gray-200 shadow-xl',
            'z-[9999]' // 设置最高层级,确保在所有元素之上
          )}
        >
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
            <span className="ml-2 text-sm text-gray-600">加载预览...</span>
          </div>
        )}

        {error && (
          <div className="p-6">
            <div className="flex items-center gap-2 text-gray-500">
              <ImageIcon className="w-5 h-5" />
              <span className="text-sm">无法加载预览</span>
            </div>
            <p className="mt-2 text-xs text-gray-400 break-all">{href}</p>
          </div>
        )}

        {previewData && !isLoading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* 截图或图片 */}
            {(previewData.screenshot || previewData.image) && (
              <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                <img
                  src={previewData.screenshot || previewData.image}
                  alt={previewData.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // 如果截图加载失败,尝试使用 image
                    if (previewData.screenshot && previewData.image) {
                      e.currentTarget.src = previewData.image
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}

            {/* 内容信息 */}
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                {previewData.title}
              </h4>

              {previewData.description && (
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {previewData.description}
                </p>
              )}

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <ExternalLink className="w-3 h-3" />
                <span className="truncate">{new URL(href).hostname}</span>
              </div>
            </div>
          </motion.div>
        )}
      </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}

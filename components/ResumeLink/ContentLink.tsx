'use client'

import React, { useMemo, memo } from 'react'
import { LinkPreview } from '@/components/LinkPreview'

interface Props {
  links?: ContentUrl[]
  content: string
}

const nilLinks: ContentUrl[] = []

const ContentLink: React.FC<Props> = props => {
  const { links = nilLinks, content } = props

  // 解析 HTML 标签(特别是 <br />)并将 {links.0} 替换为链接组件
  const renderedContent = useMemo(() => {
    // 辅助函数:解析 HTML 标签并添加到 parts
    const parseHtmlAndAddParts = (text: string, parts: React.ReactNode[], startIndex: number) => {
      // 分割 <br /> 和 <br> 标签
      const brRegex = /<br\s*\/?>/gi
      const segments = text.split(brRegex)

      segments.forEach((segment, index) => {
        if (segment) {
          parts.push(<span key={`text-${startIndex}-${index}`}>{segment}</span>)
        }
        // 在每个段落之间添加换行,除了最后一个
        if (index < segments.length - 1) {
          parts.push(<br key={`br-${startIndex}-${index}`} />)
        }
      })
    }

    const linkReg = /{links\.(\d+)}/g
    const parts: React.ReactNode[] = []
    let globalIndex = 0

    // 先处理链接占位符
    let match
    linkReg.lastIndex = 0
    while ((match = linkReg.exec(content)) !== null) {
      const beforeText = content.substring(globalIndex, match.index)

      // 处理链接前的文本(可能包含 HTML)
      if (beforeText) {
        parseHtmlAndAddParts(beforeText, parts, globalIndex)
      }

      // 添加链接组件
      const linkIndex = parseInt(match[1], 10)
      if (links[linkIndex]) {
        const link = links[linkIndex]
        parts.push(
          <LinkPreview key={`link-${linkIndex}-${match.index}`} href={link.url}>
            {link.name}
          </LinkPreview>
        )
      }

      globalIndex = linkReg.lastIndex
    }

    // 处理剩余的文本
    if (globalIndex < content.length) {
      parseHtmlAndAddParts(content.substring(globalIndex), parts, globalIndex)
    }

    return parts.length > 0 ? parts : [content]
  }, [links, content])

  return (
    <span className="inline">
      {renderedContent}
    </span>
  )
}

export default memo(ContentLink)

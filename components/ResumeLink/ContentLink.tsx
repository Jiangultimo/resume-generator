'use client'

import React, { useMemo, memo } from 'react'
import { LinkPreview } from '@/components/LinkPreview'

interface Props {
  links?: ContentUrl[]
  content: string
}

const nilLinks: ContentUrl[] = []

// 生成唯一占位符，避免与内容冲突
const generatePlaceholder = (index: number) => `__LINK_PLACEHOLDER_${index}__`

const ContentLink: React.FC<Props> = props => {
  const { links = nilLinks, content } = props

  // 解析内容：将 {links.N} 替换为链接组件，同时支持 HTML 渲染
  const renderedContent = useMemo(() => {
    const linkReg = /{links\.(\d+)}/g
    const linkMatches: { index: number; link: ContentUrl }[] = []

    // 收集所有链接占位符
    let match
    while ((match = linkReg.exec(content)) !== null) {
      const linkIndex = parseInt(match[1], 10)
      if (links[linkIndex]) {
        linkMatches.push({ index: linkIndex, link: links[linkIndex] })
      }
    }

    // 如果没有链接，直接使用 dangerouslySetInnerHTML 渲染 HTML
    if (linkMatches.length === 0) {
      return <span dangerouslySetInnerHTML={{ __html: content }} />
    }

    // 有链接时，需要将内容分割成 HTML 片段和链接组件
    // 先将 {links.N} 替换为唯一占位符
    let processedContent = content
    linkMatches.forEach((_, idx) => {
      processedContent = processedContent.replace(/{links\.\d+}/, generatePlaceholder(idx))
    })

    // 按占位符分割内容
    const parts: React.ReactNode[] = []
    const segments = processedContent.split(/__LINK_PLACEHOLDER_(\d+)__/)

    segments.forEach((segment, idx) => {
      if (idx % 2 === 0) {
        // 偶数索引是 HTML 文本片段
        if (segment) {
          parts.push(
            <span key={`html-${idx}`} dangerouslySetInnerHTML={{ __html: segment }} />
          )
        }
      } else {
        // 奇数索引是链接索引
        const linkIdx = parseInt(segment, 10)
        const linkData = linkMatches[linkIdx]
        if (linkData) {
          parts.push(
            <LinkPreview key={`link-${idx}`} href={linkData.link.url}>
              {linkData.link.name}
            </LinkPreview>
          )
        }
      }
    })

    return parts
  }, [links, content])

  return (
    <span className="inline">
      {renderedContent}
    </span>
  )
}

export default memo(ContentLink)

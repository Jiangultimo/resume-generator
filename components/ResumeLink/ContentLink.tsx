import React, { useEffect, useState, memo } from 'react'

interface Props {
  links?: ContentUrl[],
  content: string
}

const nilLinks: ContentUrl[] = []

const urlTemplate = (props: ContentUrl): string => {
  const { name, url } = props
  return `<a href="${url}" target="_blank">${name}</a>`
}

const ContentLink: React.FC<Props> = props => {
  const { links = nilLinks, content } = props
  const [renderContent, setRenderContent] = useState(content)
  useEffect(() => {
    const reg = /{(.*?)}/g
    const linkContents = content.match(reg)
    let urlContent = content
    if (linkContents) {
      linkContents.forEach(linkContent => {
        const [_, index] = linkContent.replace(/\{|\}/g, '').split('.')
        urlContent = urlContent.replace(linkContent, urlTemplate(links[Number(index)]))
      })
      setRenderContent(urlContent)
    }
  }, [links, content])
  return (
    <div dangerouslySetInnerHTML={{
      __html: renderContent
    }} />
  )
}

export default memo(ContentLink)

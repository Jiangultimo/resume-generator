import React, { memo } from 'react'
import Link from 'next/link'
interface Props {
  children: React.ReactNode
  url?: string,
  style?: React.CSSProperties,
  className?: string
}
const nilStyle = {}
const SimpleLink: React.FC<Props> = props => {
  const { url, style = nilStyle, className } = props
  return (
    <>
      {
        url ? (
          <Link href={url}>
            <a target="_blank" className={className} style={style}>{props.children}</a>
          </Link>
        ) : (
          <span style={style} className={className}>{props.children}</span>
        )
      }
    </>
  )
}

export default memo(SimpleLink)

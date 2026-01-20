import React, { memo } from 'react'
import { cn } from '@/lib/utils'
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
          <Link href={url} className={cn(className, 'underline decoration-1')} style={style} target="_blank" rel="noopener noreferrer">
            {props.children}
          </Link>
        ) : (
          <span style={style} className={className}>{props.children}</span>
        )
      }
    </>
  )
}

export default memo(SimpleLink)

import React, { memo } from 'react'
import { Loader2 } from 'lucide-react'
import styles from '@/styles/Loading.module.css'

export interface LoadingProps {
  style?: React.CSSProperties,
  className?: string
}

const nilStyle: React.CSSProperties = {}
const Loading: React.FC<LoadingProps> = props => {
  const { style = nilStyle, className } = props
  return (
    <div className={`${styles.loading} ${className}`} style={style}>
      <Loader2 className={`${styles['loading-icon']} animate-spin`} />
    </div>
  )
}

export default memo(Loading)

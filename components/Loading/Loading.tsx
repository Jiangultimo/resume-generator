import React, { memo } from 'react'
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
      <div className={styles['loading-container']}>
        <div className={styles['loading-spinner']}>
          <div className={styles['spinner-ring']}></div>
          <div className={styles['spinner-ring']}></div>
          <div className={styles['spinner-ring']}></div>
        </div>
        <div className={styles['loading-text']}>Loading...</div>
        <div className={styles['loading-dots']}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default memo(Loading)

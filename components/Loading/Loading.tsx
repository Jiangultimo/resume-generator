import React, { memo } from 'react'
import styles from '@/styles/Loading.module.css'
import loadingImg from '@/public/source/loading.svg'

export interface LoadingProps {
  style?: React.CSSProperties,
  className?: string
}

const nilStyle: React.CSSProperties = {}
const Loading: React.FC<LoadingProps> = props => {
  const { style = nilStyle, className } = props
  return (
    <div className={`${styles.loading} ${className}`} style={style}>
      <img
        src={loadingImg.src}
        className={styles['loading-icon']}
        alt="loading"
      />
    </div>
  );
};

export default memo(Loading)

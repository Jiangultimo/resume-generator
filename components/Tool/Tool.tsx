import React, { memo } from 'react'
import styles from '@/styles/Tool.module.css'
import Image from 'next/image'
import TOOLS from './tool.config'

const Tool:React.FC<unknown> = () => {
  return (
    <div className={styles['tool']} id="tools">
      <dl className={styles['tool-group']}>
        {
          TOOLS.map(tool => {
            const { name, icon, des, click } = tool
            return (
              <span
                className={styles['tool-item']}
                key={name}
                title={des}
                onClick={click}
              >
                <Image src={icon} alt={des} />
              </span>
            )
          })
        }
      </dl>
    </div>
  )
}

export default memo(Tool)

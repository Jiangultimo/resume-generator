import React, { memo, useContext } from 'react'
import LoadingContext from '@/context/loading'
import styles from '@/styles/Tool.module.css'
import Image from 'next/image'
import { exportPDF } from './tool.config'

interface Props {
  infos?: Intro
}

const nilInfos: Intro = {}

const Tool:React.FC<Props> = props => {
  const { infos = nilInfos } = props
  const loadingContext = useContext(LoadingContext)
  const { name, icon, des, click } = exportPDF
  return (
    <div className={styles['tool']} id="tools">
      <dl className={styles['tool-group']}>
        <span
          className={styles['tool-item']}
          key={name}
          title={des}
          onClick={async () =>{
            loadingContext.setLoading(true)
            click && await click({
              name: infos.name
            })
            loadingContext.setLoading(false)
          }}
        >
          <Image src={icon} alt={des} />
        </span>
      </dl>
    </div>
  )
}

export default memo(Tool)

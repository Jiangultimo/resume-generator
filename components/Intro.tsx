import React, { memo } from 'react'
import Image from 'next/image'
import styles from '@/styles/Intro.module.css'
import avatar from '@/public/avatar.jpg'
import { SimpleLink } from '@/components/ResumeLink'
import UploadAvatar from '@/components/pages/index/UploadAvatar'

type Props = {
  intros: Intro[]
  infos?: Intro
}

const nilIntros: Intro[] = []
const nilInfos: Intro = {}

const Header: React.FC<Props> = (props) => {
  const { intros = nilIntros, infos = nilInfos } = props

  return (
    <header className="relative">
      <div className={styles["wrapper"]}>
        <div className={styles['image-wrapper']}>
          <Image
            src={avatar}
            className={styles["avatar"]}
            width="150px"
            height="150px"
            alt={infos.name}
          />
          <UploadAvatar />
        </div>
        <div className={styles["intro"]}>
          <dl className={styles["dl__group"]}>
            {intros.map((item) => {
              const [key] = Object.keys(item)
              if (key === "email") {
                item.url = `mailto:${item[key]}`
              }
              return (
                <dd key={key} className={styles["dd__item"]}>
                  <SimpleLink {...item}>{item[key]}</SimpleLink>
                </dd>
              )
            })}
          </dl>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import styles from '@/styles/Intro.module.css'
import avatar from '@/public/avatar.jpg';
import { SimpleLink } from '@/components/ResumeLink'

type Props = {
  intros: Intro[]
}

const Header:React.FC<Props> = props => {
  const { intros = [] } = props;
  const [infos, setInfos] = useState<Intro>()

  useEffect(() => {
    if (intros.length !== 0) {
      setInfos(
        intros.reduce((prev, cur) => {
          return {
            ...prev,
            ...cur
          }
        }, {})
      )
    }
  }, [intros])

  return (
    <header className="relative">
      <div className={styles['wrapper']}>
        <Image
          src={avatar}
          className={styles['avatar']}
          width="150px"
          height="150px"
          alt={infos?.name}
        />
        <div className={styles['intro']}>
          <dl className={styles['dl__group']}>
            {intros.map(item => {
              const [ key ] = Object.keys(item)
              if (key === 'email') {
                item.url = `mailto:${item[key]}`
              }
              return (
                <dd key={key} className={styles['dd__item']}>
                  <SimpleLink {...item}>
                    {item[key]}
                  </SimpleLink>
                </dd>
              )
            })}
          </dl>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import styles from '@/styles/Intro.module.css'
import avatar from '@/public/avatar.jpg';
import { SimpleLink } from '@/components/ResumeLink'
import WordCloud from '@/components/WordCloud'

type Props = {
  intros: Intro[],
  data: string[]
}

const Header:React.FC<Props> = props => {
  const { intros = [], data } = props;
  const boxRef = useRef<HTMLDivElement>(null)
  const [rectInfo, setRectInfo] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const box = boxRef.current
    if (box) {
      setRectInfo({
        width: box.offsetWidth,
        height: box.offsetHeight
      })
    }
  }, [])

  return (
    <header className="relative">
      <div className={styles['wrapper']} ref={boxRef}>
        {/*<WordCloud rectInfo={rectInfo} words={data} />*/}
        <Image
          src={avatar}
          className={styles['avatar']}
          width="150px"
          height="150px"
          alt="Zhengxing Jiang"
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

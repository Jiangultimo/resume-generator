import React from 'react';
import styles from '@/styles/Content.module.css'

const nilSkills: string[] = []
const Skill: React.FC<StringContent> = props => {
  const { title, data = nilSkills } = props
  return (
    <div className={styles['content']}>
      <h4 className={styles['title']}>{title}</h4>
      <ul className={styles['list']}>
        {
          data.map((val: string, index: number) => {
            return (<li className={styles['list-item']} key={index}>{val}</li>);
          })
        }
      </ul>
    </div>
  );
};

export default Skill

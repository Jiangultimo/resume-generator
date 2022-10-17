import React, { memo } from 'react'
import { ContentLink } from '@/components/ResumeLink'
import styles from '@/styles/Experience.module.css'

interface Props {
  experience: ExperienceObject
}

const Experience: React.FC<Props> = (props) => {
  const { experience } = props
  const { data, title } = experience
  return (
    <div className={styles['wrapper']}>
      <div className={styles['container']}>
        <h4 className={styles['title']}>{title}</h4>
        {
          data.map((experience, index) => {
            const { labels, projects } = experience
            return (
              <div className={styles['content']} key={index}>
                <h4 className={styles['company']}>
                  <b>{experience.company}</b>
                  {experience.position  && (
                    <b> - {experience.position}</b>
                  )}
                </h4>
                { experience.companyDes && <p className={styles['company']}>{experience.companyDes}</p> }
                <p className={styles['time']}>{experience.time}</p>
                <ul className={styles['experience']}>
                  {
                    projects.map((project, index) => {
                      const { content, links } = project
                      return (
                        <li key={index} className={styles['experience-item']}>
                          <ContentLink links={links} content={content} />
                        </li>
                      );
                    })
                  }</ul>
                <div className={styles['skills-list']}>
                  {
                    labels.map((item, index) => {
                      return (<span className={styles['label']} key={index}>{item}</span>);
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default memo(Experience)

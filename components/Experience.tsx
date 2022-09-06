import React from 'react'
import { ContentLink } from '@/components/ResumeLink'
import styles from '@/styles/Experience.module.css'

interface Props {
  experiences: Experience[]
}

const Experience: React.FC<Props> = (props) => {
  const { experiences } = props
  return (
    <div className={styles['wrapper']}>
      <div className={styles['container']}>
        <h4 className={styles['title']}>工作经历</h4>
        {
          experiences.map((experience, index) => {
            const { skills, projects } = experience
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
                    skills?.map((item, index) => {
                      return (<span className={styles['skill']} key={index}>{item}</span>);
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Experience;

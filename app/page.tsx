'use client'

import { useEffect, useState, memo, useContext } from 'react'
import { getEnv } from '@/utils/env'
import LoadingContext from '@/context/loading'
import styles from '@/styles/Resume.module.css'
import Intro from '@/components/Intro'
import Content from '@/components/Content'
import Experience from '@/components/Experience'
import { ExportPDF } from '@/components/Tool/'
import Loading from '@/components/Loading'
// Removed MobileMenu import

const Resume = () => {
  const [formattedInfos, setFormattedInfos] = useState<Intro>()
  const loadingContext = useContext(LoadingContext)
  const [loading, setLoading] = useState<boolean>(loadingContext.loading)
  const [resumeData, setResumeData] = useState<Resume | null>(null)
  
  // 安全解构，避免undefined错误
  const { intros, skills, experience, evaluations, title } = resumeData || {}

  useEffect(() => {
    // 在客户端获取数据
    const fetchResume = async () => {
      try {
        // 在客户端使用相对路径
        const res = await fetch('/api/resume')
        const data = await res.json()
        setResumeData(data)
      } catch (error) {
        console.error('Failed to fetch resume data:', error)
      }
    }

    fetchResume()
  }, [])

  useEffect(() => {
    if (resumeData && resumeData.intros && resumeData.intros.length !== 0) {
      setFormattedInfos(resumeData.intros.reduce((prev, cur) => {
        return {
          ...prev,
          ...cur
        }
      }, {}))
    }
  }, [resumeData])

  if (!resumeData) {
    return <Loading />
  }

  const { intros: dataIntros, skills: dataSkills, experience: dataExperience, evaluations: dataEvaluations } = resumeData

  return (
    <div className={styles['resume']} id="resume">
      <main className={styles['resume-wrapper']}>
        <LoadingContext.Provider value={{
          loading,
          setLoading
        }}>
          { loading && <Loading /> }

          <ExportPDF infos={formattedInfos} />
          <div id="intro">
            <Intro intros={dataIntros} infos={formattedInfos} />
          </div>
          {/* 技能和评价容器 - 桌面端并排，移动端上下 */}
          <div className={styles['skills-evaluations-container']}>
            {/* 技能部分 - 提升优先级 */}
            <div id="skills" className={styles['skills']}>
              <Content {...dataSkills} />
            </div>
            {/* 自我评价部分 - 移到技能部分之后 */}
            {/* <div id="evaluations" className={styles['evaluations']}>
              <Content {...dataEvaluations} />
            </div> */}
          </div>
          <div className={styles['resume-content']}>
            {/* 工作经验部分 */}
            <div id="experience">
              <Experience experience={dataExperience} />
            </div>
          </div>
        </LoadingContext.Provider>
      </main>
    </div>
  )
}

export default memo(Resume)
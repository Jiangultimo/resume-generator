'use client'

import { useEffect, useState, memo, useContext } from 'react'
import { getEnv } from '@/utils/env'
import LoadingContext from '@/context/loading'
import { useI18n } from '@/context/i18n'
import styles from '@/styles/Resume.module.css'
import Intro from '@/components/Intro'
import Content from '@/components/Content'
import Experience from '@/components/Experience'
import { ExportPDF } from '@/components/Tool/'
import Loading from '@/components/Loading'
import LanguageSwitcher from '@/components/LanguageSwitcher'
// Removed MobileMenu import

const Resume = () => {
  const [formattedInfos, setFormattedInfos] = useState<Intro>()
  const loadingContext = useContext(LoadingContext)
  const [loading, setLoading] = useState<boolean>(loadingContext.loading)
  const [resumeData, setResumeData] = useState<Resume | null>(null)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const { t, language, isInitialized } = useI18n()
  
  // 安全解构，避免undefined错误
  const { intros, skills, experience, evaluations, title } = resumeData || {}

  useEffect(() => {
    if (!isInitialized) return
    
    // 等待按钮滑动动画完成后再开始过渡
    setTimeout(() => {
      // 稍后开始过渡动画
      setTimeout(() => {
        setIsTransitioning(true)
      }, 50)
      
      // 在客户端获取数据
      const fetchResume = async () => {
        // 立即清空数据显示loading
        setResumeData(null)
        try {
          // 根据当前语言获取数据
          const langParam = language === 'zh' ? 'cn' : 'en'
          const res = await fetch(`/api/resume?lang=${langParam}`)
          const data = await res.json()
          
          // 延迟设置新数据，确保过渡效果
          setTimeout(() => {
            setResumeData(data)
            setIsTransitioning(false)
          }, 500)
        } catch (error) {
          console.error('Failed to fetch resume data:', error)
          setIsTransitioning(false)
        }
      }

      fetchResume()
    }, 400) // 等待按钮滑动动画完成（400ms）
  }, [language, isInitialized])

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
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <main className={`${styles['resume-wrapper']} ${isTransitioning ? styles['transitioning'] : ''}`}>
        <LoadingContext.Provider value={{
          loading,
          setLoading
        }}>
          { loading && <Loading /> }

          {/* <ExportPDF infos={formattedInfos} /> */}
          <div id="intro" className={styles['content-section']}>
            <Intro key={`intro-${language}`} intros={dataIntros} infos={formattedInfos} />
          </div>
          {/* 技能和评价容器 - 桌面端并排，移动端上下 */}
          <div className={`${styles['skills-evaluations-container']} ${styles['content-section']}`}>
            {/* 技能部分 - 提升优先级 */}
            <div id="skills" className={styles['skills']}>
              <Content key={`skills-${language}`} {...dataSkills} />
            </div>
            {/* 自我评价部分 - 移到技能部分之后 */}
            {/* <div id="evaluations" className={styles['evaluations']}>
              <Content {...dataEvaluations} />
            </div> */}
          </div>
          <div className={`${styles['resume-content']} ${styles['content-section']}`}>
            {/* 工作经验部分 */}
            <div id="experience">
              <Experience key={`experience-${language}`} experience={dataExperience} />
            </div>
          </div>
        </LoadingContext.Provider>
      </main>
    </div>
  )
}

export default memo(Resume)
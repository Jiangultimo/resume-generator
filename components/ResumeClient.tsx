'use client'

import { useState, useEffect, memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n } from '@/context/i18n'
import styles from '@/styles/Resume.module.css'
import Intro from '@/components/Intro'
import Content from '@/components/Content'
import Experience from '@/components/Experience'
import { ExportPDF } from '@/components/Tool/'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ChatSection from '@/components/ChatSection'
import StructuredData from '@/components/StructuredData'

interface ResumeClientProps {
  initialData: Resume
  initialLanguage: string
}

const ResumeClient = ({ initialData, initialLanguage }: ResumeClientProps) => {
  const [resumeData, setResumeData] = useState<Resume>(initialData)
  const [dataLanguage, setDataLanguage] = useState<string>(initialLanguage)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [formattedInfos, setFormattedInfos] = useState<Intro>()
  const { language, isInitialized } = useI18n()

  // 安全解构,避免undefined错误
  const { intros, skills, experience } = resumeData || {}

  // 当语言切换时,重新获取数据
  useEffect(() => {
    if (!isInitialized) return

    // 如果当前数据语言和选择的语言一致,不需要重新获取
    if (dataLanguage === language) return

    const fetchResume = async () => {
      try {
        setIsTransitioning(true)

        const langParam = language === 'zh' ? 'cn' : 'en'
        const res = await fetch(`/api/resume?lang=${langParam}`)
        const data = await res.json()

        setResumeData(data)
        setDataLanguage(language)
      } catch (error) {
        console.error('Failed to fetch resume data:', error)
        setIsTransitioning(false)
      }
    }

    fetchResume()
  }, [language, isInitialized, dataLanguage])

  // 处理动画完成
  const handleAnimationComplete = () => {
    if (isTransitioning) {
      setIsTransitioning(false)
    }
  }

  useEffect(() => {
    if (resumeData && resumeData.intros && resumeData.intros.length !== 0) {
      // 从 intros 数组中提取姓名项作为 formattedInfos
      const nameItem = resumeData.intros.find(item =>
        item.label?.toLowerCase() === 'name' || item.label === '姓名'
      )
      if (nameItem) {
        setFormattedInfos({ value: nameItem.value, name: nameItem.value })
      }
    }
  }, [resumeData])

  const { intros: dataIntros, skills: dataSkills, experience: dataExperience } = resumeData

  return (
    <div className={styles['resume']} id="resume">
      {/* SEO: 结构化数据 */}
      <StructuredData language={language} />

      {/* 右上角工具栏：语言切换 + 导出 PDF */}
      <div className="fixed top-2 right-2 md:top-4 md:right-4 z-50 flex flex-col items-end gap-2" data-hide-on-print>
        <LanguageSwitcher />
        <ExportPDF />
      </div>
      <AnimatePresence mode="wait">
        <motion.main
          key={dataLanguage}
          className={styles['resume-wrapper']}
          initial={{ opacity: 1 }}
          animate={{ opacity: isTransitioning ? 0.3 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onAnimationComplete={handleAnimationComplete}
        >
          {/* AI 聊天区域 - 顶部显眼位置 */}
          <div className={styles['content-section']}>
            <ChatSection />
          </div>

          <div id="intro" className={styles['content-section']}>
            <Intro key={`intro-${dataLanguage}`} intros={dataIntros} infos={formattedInfos} />
          </div>
          {/* 技能和评价容器 - 桌面端并排,移动端上下 */}
          <div className={`${styles['skills-evaluations-container']} ${styles['content-section']}`}>
            {/* 技能部分 - 提升优先级 */}
            <div id="skills" className={styles['skills']}>
              <Content key={`skills-${dataLanguage}`} {...dataSkills} />
            </div>
          </div>
          <div className={`${styles['resume-content']} ${styles['content-section']}`}>
            {/* 工作经验部分 */}
            <div id="experience">
              <Experience key={`experience-${dataLanguage}`} experience={dataExperience} />
            </div>
          </div>
        </motion.main>
      </AnimatePresence>
    </div>
  )
}

export default memo(ResumeClient)

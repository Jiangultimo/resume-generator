import React from 'react'
import { motion } from 'framer-motion'
import { Award, Star, TrendingUp, ChevronRight } from 'lucide-react'
import styles from '@/styles/Content.module.css'

const nilSkills: string[] = []

const Skill: React.FC<StringContent> = props => {
  const { title, data = nilSkills } = props
  const isSkillsSection = title && (title.toLowerCase().includes('技能') || title.toLowerCase().includes('skill'))
  const isEvaluationSection = title && (title.toLowerCase().includes('评价') || title.toLowerCase().includes('evaluation'))
  
  // 技能关键词列表
  const skillKeywords = [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Hooks', 'shadcn/ui', 'Vue', 'Vue3', 'Nuxt',
    'Node.js', 'Express', 'Koa', 'Python', 'Flask', 'FastAPI', 'Golang', 'Rust',
    'Linux', 'Shell', 'DevOps', 'CI/CD', 'Azure', 'Docker', 'Kubernetes'
  ]
  
  // 高亮技能关键词的函数
  const highlightSkills = (text: string) => {
    if (!isSkillsSection) return text
    
    let highlightedText = text
    skillKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      highlightedText = highlightedText.replace(regex, `<span class="skill-highlight">${keyword}</span>`)
    })
    return highlightedText
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }
  
  const skillCardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  }
  
  const timelineItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  }
  


  return (
    <motion.div 
      className={styles['content']}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.h4 
        className={styles['title']}
        variants={containerVariants}
      >
        <div className="flex items-center gap-2">
          {isSkillsSection && <Award className="w-5 h-5 text-gray-700" />}
          {isEvaluationSection && <Star className="w-5 h-5 text-gray-700" />}
          <span>{title}</span>
          {(isSkillsSection || isEvaluationSection) && <TrendingUp className="w-4 h-4 text-green-600 ml-1" />}
        </div>
      </motion.h4>
      <motion.ul 
        className={styles['list']}
        variants={containerVariants}
      >
        {
          data.map((val: string, index: number) => {
            return (
              <motion.li 
                className={styles['list-item']}
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                  <span 
                    dangerouslySetInnerHTML={{ __html: highlightSkills(val) }}
                    className="skill-text"
                  />
                </div>
              </motion.li>
            )
          })
        }
      </motion.ul>
    </motion.div>
  )
}

export default Skill

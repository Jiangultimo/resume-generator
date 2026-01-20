import React from 'react'
import { motion } from 'framer-motion'
import { Award, Star, TrendingUp, ChevronRight } from 'lucide-react'
import { useI18n } from '@/context/i18n'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import styles from '@/styles/Content.module.css'
import skillKeywordsConfig from '@/config/skill-keywords.json'

const nilSkills: string[] = []

const Skill: React.FC<StringContent> = props => {
  const { title, data = nilSkills } = props
  const { t } = useI18n()

  // Check if this is skills or evaluation section by comparing with translations
  const isSkillsSection = title && (title === t.skills || title.toLowerCase().includes('技能') || title.toLowerCase().includes('skill'))
  const isEvaluationSection = title && (title === t.evaluation || title.toLowerCase().includes('评价') || title.toLowerCase().includes('evaluation'))

  // 高亮技能关键词的函数
  const highlightSkills = (text: string) => {
    if (!isSkillsSection) return text

    let highlightedText = text
    skillKeywordsConfig.keywords.forEach(keyword => {
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
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <Card className={cn(
        "transition-all duration-300",
      )}>
        <CardContent className="p-6">
          <motion.h4
            className="pb-3 text-lg font-semibold text-emerald-800 border-emerald-300 mb-4"
            variants={containerVariants}
          >
            <div className="flex items-center gap-2">
              {isSkillsSection && <Award className="w-5 h-5 text-emerald-700" />}
              {isEvaluationSection && <Star className="w-5 h-5 text-emerald-700" />}
              <span>{title}</span>
              {(isSkillsSection || isEvaluationSection) && <TrendingUp className="w-4 h-4 text-green-600 ml-1" />}
            </div>
          </motion.h4>

          <motion.ul
            className="space-y-2"
            variants={containerVariants}
          >
            {
              data.map((val: string, index: number) => {
                return (
                  <motion.li
                    className="list-none"
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <div className={cn(
                      "flex items-center gap-2 p-2.5 rounded-md",
                      "bg-white/60 border border-emerald-100",
                      "hover:border-emerald-300 hover:shadow-sm",
                      "transition-all duration-200"
                    )}>
                      <ChevronRight className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <span
                        dangerouslySetInnerHTML={{ __html: highlightSkills(val) }}
                        className="text-sm text-gray-700 skill-text"
                      />
                    </div>
                  </motion.li>
                )
              })
            }
          </motion.ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Skill

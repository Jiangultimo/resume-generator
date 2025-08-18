import React from 'react'
import { motion } from 'framer-motion'
import styles from '@/styles/Content.module.css'

const nilSkills: string[] = []

const Skill: React.FC<StringContent> = props => {
  const { title, data = nilSkills } = props
  const isSkillsSection = title && (title.toLowerCase().includes('技能') || title.toLowerCase().includes('skill'))
  const isEvaluationSection = title && (title.toLowerCase().includes('评价') || title.toLowerCase().includes('evaluation'))
  
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
        {title}
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
                {val}
              </motion.li>
            )
          })
        }
      </motion.ul>
    </motion.div>
  )
}

export default Skill

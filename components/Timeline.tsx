import React, { memo } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, ChevronRight, TrendingUp } from 'lucide-react'
import { useI18n } from '@/context/i18n'
import { ContentLink } from '@/components/ResumeLink'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import styles from '@/styles/Timeline.module.css'

interface Props {
  experience: ExperienceObject
}

const Timeline: React.FC<Props> = (props) => {
  const { experience } = props
  const { data, title } = experience
  const { t } = useI18n()
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0
    }
  }
  
  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1
    }
  }
  
  return (
    <motion.div 
      className={styles['wrapper']}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <div className={styles['container']}>
        <motion.h4 
          className={styles['title']}
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-700" />
            <span>{title}</span>
            <TrendingUp className="w-4 h-4 text-green-600 ml-1" />
          </div>
        </motion.h4>
        
        <div className={styles['timeline']}>
          {data.map((experience, index) => {
            const { labels, projects } = experience
            const isLast = index === data.length - 1
            
            return (
              <motion.div 
                key={index}
                className={styles['timeline-item']}
                variants={itemVariants}
              >
                {/* Timeline Line */}
                {!isLast && (
                  <div className={styles['timeline-line']} />
                )}
                
                {/* Timeline Node */}
                <motion.div 
                  className={styles['timeline-node']}
                  variants={nodeVariants}
                >
                  <div className={styles['node-inner']} />
                </motion.div>
                
                {/* Content Card - 使用 shadcn/ui Card 组件 */}
                <motion.div
                  className="ml-8"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className={cn(
                    "bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg",
                    "hover:shadow-xl hover:border-emerald-200/70 transition-all duration-300",
                    "relative"
                  )}>
                    {/* Background Gradients */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-emerald-500/5 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-3xl" />
                    </div>

                    <CardContent className="p-7 relative">
                      {/* Header */}
                      <div className="flex flex-col gap-3 mb-5">
                        <motion.h4
                          className="text-lg font-semibold text-gray-800 leading-tight"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <div>
                              <b>{experience.company}</b>
                              {experience.position && (
                                <b> - {experience.position}</b>
                              )}
                            </div>
                          </div>
                        </motion.h4>

                        <motion.div
                          className="text-sm text-gray-600 font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        >
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>{experience.time}</span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Company Description */}
                      {experience.companyDes && (
                        <motion.p
                          className="text-sm text-gray-700 mb-4 leading-relaxed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                        >
                          {experience.companyDes}
                        </motion.p>
                      )}

                      {/* Projects List */}
                      <motion.ul
                        className="space-y-3 mb-5"
                        variants={containerVariants}
                      >
                        {projects.map((project, projectIndex) => {
                          const { content, links } = project
                          return (
                            <motion.li
                              key={projectIndex}
                              className={styles['project-item']}
                              variants={itemVariants}
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <div className="flex items-start gap-2">
                                <ChevronRight className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                <ContentLink links={links} content={content} />
                              </div>
                            </motion.li>
                          )
                        })}
                      </motion.ul>

                      {/* Skills - 使用 shadcn/ui Badge 组件 */}
                      <motion.div
                        className="flex flex-wrap gap-2 mt-4"
                        variants={containerVariants}
                      >
                        {labels.map((item, labelIndex) => {
                          return (
                            <motion.div
                              key={labelIndex}
                              variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: { opacity: 1, scale: 1 }
                              }}
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <Badge
                                variant="default"
                                className={cn(
                                  "bg-emerald-500 hover:bg-emerald-600",
                                  "text-white border-emerald-500 hover:border-emerald-600",
                                  "cursor-default transition-all duration-200"
                                )}
                              >
                                {item}
                              </Badge>
                            </motion.div>
                          )
                        })}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default memo(Timeline)
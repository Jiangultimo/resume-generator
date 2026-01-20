import React, { memo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import * as LucideIcons from 'lucide-react'
import avatar from '@/public/avatar.jpg'
import { SimpleLink } from '@/components/ResumeLink'
import UploadAvatar from '@/components/pages/index/UploadAvatar'

type Props = {
  intros: Intro[]
  infos?: Intro
}

const nilIntros: Intro[] = []
const nilInfos: Intro = { value: '' }

// 动态获取 Lucide 图标组件
const getDynamicIcon = (iconName?: string) => {
  if (!iconName) {
    const HelpCircle = LucideIcons.HelpCircle
    return <HelpCircle className="h-4 w-4" />
  }

  // @ts-ignore - 动态访问图标
  const IconComponent = LucideIcons[iconName] || LucideIcons.ExternalLink
  return <IconComponent className="h-4 w-4" />
}

// 提取为独立组件以避免重复渲染
const IntroItem = memo(({ item, index }: { item: Intro; index: number }) => {
  const displayLabel = item.label
  const displayValue = item.value
  const iconComponent = getDynamicIcon(item.icon)
  const itemWithUrl = item.link ? { url: item.link } : {}

  return (
    <motion.div
      className="max-w-full min-w-0 flex-shrink"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Badge
        variant="secondary"
        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-200 transition-colors cursor-pointer max-w-full min-w-0 min-h-fit"
      >
        <motion.div
          className="flex-shrink-0"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.3 }}
        >
          {iconComponent}
        </motion.div>
        <div className="min-w-0 flex-1">
          <SimpleLink {...itemWithUrl}>
            {displayLabel && (
              <span
                className="inline text-xs opacity-70 mr-1"
                dangerouslySetInnerHTML={{ __html: displayLabel }}
              />
            )}
            <span
              className="inline text-xs sm:text-sm leading-relaxed break-words whitespace-normal"
              dangerouslySetInnerHTML={{ __html: displayValue }}
            />
          </SimpleLink>
        </div>
      </Badge>
    </motion.div>
  )
})

IntroItem.displayName = 'IntroItem'

const Header: React.FC<Props> = (props) => {
  const { intros = nilIntros, infos = nilInfos } = props

  // 从 intros 中提取姓名(label 为 "姓名" 或 "name")
  const nameItem = intros.find(item =>
    item.label?.toLowerCase() === 'name' || item.label === '姓名'
  )

  // 获取姓名值
  const displayName = nameItem?.value || infos.name || '姓名'

  // 过滤掉姓名字段,只显示其他信息
  const filteredIntros = intros.filter(item =>
    item.label?.toLowerCase() !== 'name' && item.label !== '姓名'
  )

  return (
    <motion.header 
      className="relative"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="max-w-4xl mx-auto bg-[var(--chart-2)] backdrop-blur-sm shadow-sm border-0 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full">
                {/* Avatar Section */}
                <motion.div 
                  className="relative group"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Avatar className="w-40 h-40 border-4 border-white shadow-lg" data-avatar>
                    <AvatarImage
                      src={avatar.src}
                      alt={displayName}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
                      {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 rounded-full">
                    <UploadAvatar />
                  </div>
                </motion.div>
                
                {/* Info Section */}
                <motion.div 
                  className="flex-1 text-center md:text-left w-full md:w-auto min-w-0"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <motion.h1
                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {displayName}
                  </motion.h1>
                  <motion.div
                    className="flex flex-wrap gap-2 justify-center md:justify-start max-w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {filteredIntros.map((item, index) => (
                      <IntroItem key={item.icon} item={item} index={index} />
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default memo(Header)

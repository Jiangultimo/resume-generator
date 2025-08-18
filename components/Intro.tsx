import React, { memo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MapPin, Globe, User, GraduationCap, Github, ExternalLink } from 'lucide-react'
import avatar from '@/public/avatar.jpg'
import { SimpleLink } from '@/components/ResumeLink'
import UploadAvatar from '@/components/pages/index/UploadAvatar'

type Props = {
  intros: Intro[]
  infos?: Intro
}

const nilIntros: Intro[] = []
const nilInfos: Intro = {}

const Header: React.FC<Props> = (props) => {
  const { intros = nilIntros, infos = nilInfos } = props

  const getIcon = (key: string) => {
    switch (key) {
      case 'name': return <User className="h-4 w-4" />
      case 'email': return <Mail className="h-4 w-4" />
      case 'phone': return <Phone className="h-4 w-4" />
      case 'address': return <MapPin className="h-4 w-4" />
      case 'graduate': return <GraduationCap className="h-4 w-4" />
      case 'github': return <Github className="h-4 w-4" />
      case 'site': return <Globe className="h-4 w-4" />
      case 'website': return <Globe className="h-4 w-4" />
      default: return <ExternalLink className="h-4 w-4" />
    }
  }

  return (
    <motion.header 
      className="relative"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-sm border-0 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full">
                {/* Avatar Section */}
                <motion.div 
                  className="relative group"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Avatar className="w-40 h-40 border-4 border-white shadow-lg">
                    <AvatarImage 
                      src={avatar.src} 
                      alt={infos.name as string ?? ''}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
                      {infos.name ? (infos.name as string).charAt(0).toUpperCase() : 'U'}
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
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.h1 
                    className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    {infos.name || '姓名'}
                  </motion.h1>
                  <motion.div 
                    className="flex flex-wrap gap-2 justify-center md:justify-start max-w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    {intros.filter(item => {
                      const [key] = Object.keys(item)
                      return key !== 'name' // 过滤掉name字段，避免与标题重复
                    }).map((item, index) => {
                      const [key] = Object.keys(item)
                      if (key === "email") {
                        item.url = `mailto:${item[key]}`
                      }
                      return (
                        <motion.div
                          key={key}
                          className="max-w-full min-w-0 flex-shrink"
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge 
                            variant="secondary" 
                            className="flex items-start gap-2 px-3 py-2 text-sm hover:bg-emerald-100 transition-colors cursor-pointer max-w-full min-w-0 min-h-fit"
                          >
                            <motion.div
                              className="flex-shrink-0"
                              initial={{ rotate: 0 }}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              {getIcon(key)}
                            </motion.div>
                            <div className="min-w-0 flex-1">
                               <SimpleLink {...item}>
                                 <span className="inline-block text-xs sm:text-sm leading-relaxed break-words whitespace-normal">{item[key]}</span>
                               </SimpleLink>
                             </div>
                          </Badge>
                        </motion.div>
                      )
                    })}
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

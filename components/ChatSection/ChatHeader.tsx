import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, Maximize2, Minimize2 } from 'lucide-react'
import Image from 'next/image'
import styles from '@/styles/ChatSection.module.css'

interface ChatHeaderProps {
  isExpanded: boolean
  isFullscreen: boolean
  language: string
  onToggleExpand: () => void
  onToggleFullscreen: (e: React.MouseEvent) => void
}

const ChatHeader = memo(({
  isExpanded,
  isFullscreen,
  language,
  onToggleExpand,
  onToggleFullscreen
}: ChatHeaderProps) => {
  return (
    <motion.div
      className={styles.chatHeader}
      onClick={onToggleExpand}
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
    >
      <div className={styles.headerContent}>
        <motion.div
          className={styles.headerIcon}
          animate={{ rotate: isExpanded ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/avatar.jpg"
            alt="AI Avatar"
            width={40}
            height={40}
            className={styles.headerAvatar}
          />
        </motion.div>
        <div className={styles.headerText}>
          <span className={styles.headerTitle}>
            {language === 'zh' ? 'AI 简历助手' : 'AI Resume Assistant'}
          </span>
          <AnimatePresence mode="wait">
            {!isExpanded && (
              <motion.span
                className={styles.headerHint}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {language === 'zh' ? '点击展开对话' : 'Click to expand'}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className={styles.headerButtons}>
        <motion.button
          className={styles.toggleButton}
          onClick={onToggleFullscreen}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={isFullscreen ? (language === 'zh' ? '退出全屏' : 'Exit fullscreen') : (language === 'zh' ? '全屏' : 'Fullscreen')}
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </motion.button>
        {!isFullscreen && (
          <motion.button
            className={styles.toggleButton}
            animate={{ rotate: isExpanded ? 0 : 180 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </motion.div>
  )
})

ChatHeader.displayName = 'ChatHeader'

export default ChatHeader

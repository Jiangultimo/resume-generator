'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/context/i18n'
import { useChatLogic } from './useChatLogic'
import { MessageItem } from './ChatMessage'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import SuggestedQuestions from './SuggestedQuestions'
import styles from '@/styles/ChatSection.module.css'

const ChatSection = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { language, isInitialized } = useI18n()

  const {
    messages,
    input,
    isLoading,
    isWaitingResponse,
    suggestions,
    isLoadingSuggestions,
    messageListRef,
    setInput,
    sendMessage
  } = useChatLogic({ language, isInitialized })

  const loadingText = language === 'zh' ? '思考中...' : 'Thinking...'

  // 首次加载后自动展开
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // 全屏时自动展开
  useEffect(() => {
    if (isFullscreen) {
      setIsExpanded(true)
    }
  }, [isFullscreen])

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // 处理全屏按钮
  const handleToggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFullscreen(!isFullscreen)
  }

  // 处理推荐问题选择
  const handleSelectQuestion = (question: string) => {
    sendMessage(question)
  }

  const chatContent = (
    <motion.div
      className={`${styles.chatWrapper} ${isFullscreen ? styles.fullscreenWrapper : ''}`}
      data-hide-on-print
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className={`${styles.chatCard} ${isFullscreen ? styles.fullscreenCard : ''}`}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* 装饰性背景元素 */}
        <div className={styles.decorativeOrb} />
        <div className={styles.decorativeOrb2} />

        {/* 头部 */}
        <ChatHeader
          isExpanded={isExpanded}
          isFullscreen={isFullscreen}
          language={language}
          onToggleExpand={() => setIsExpanded(!isExpanded)}
          onToggleFullscreen={handleToggleFullscreen}
        />

        {/* 内容区域 */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className={styles.chatBody}
            >
              {/* 消息列表 */}
              <div className={styles.messageList} ref={messageListRef}>
                {messages.map((message) => (
                  <MessageItem
                    key={message.id}
                    message={message}
                    loadingText={loadingText}
                  />
                ))}
              </div>

              {/* 输入区域 */}
              <div className={styles.inputArea}>
                {/* 推荐问题 */}
                {!isLoading && !isWaitingResponse && messages.length > 0 && (
                  <SuggestedQuestions
                    suggestions={suggestions}
                    isLoading={isLoadingSuggestions}
                    language={language}
                    onSelectQuestion={handleSelectQuestion}
                  />
                )}

                {/* 输入框 */}
                <ChatInput
                  input={input}
                  isLoading={isLoading}
                  isWaitingResponse={isWaitingResponse}
                  language={language}
                  onInputChange={setInput}
                  onSendMessage={sendMessage}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )

  // 全屏时使用 Portal 渲染到 body，否则正常渲染
  if (isFullscreen && typeof document !== 'undefined') {
    return createPortal(chatContent, document.body)
  }

  return chatContent
}

export default ChatSection

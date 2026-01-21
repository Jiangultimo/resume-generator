import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageCircle } from 'lucide-react'
import styles from '@/styles/ChatSection.module.css'

interface ChatInputProps {
  input: string
  isLoading: boolean
  isWaitingResponse: boolean
  language: string
  onInputChange: (value: string) => void
  onSendMessage: () => void
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

const ChatInput = memo(({
  input,
  isLoading,
  isWaitingResponse,
  language,
  onInputChange,
  onSendMessage,
  onKeyDown
}: ChatInputProps) => {
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(e.target.value)
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
  }, [onInputChange])

  const placeholderText = language === 'zh'
    ? '想了解什么？随时问我...'
    : 'What would you like to know?'

  return (
    <div className={styles.inputArea}>
      <div className={styles.inputWrapper}>
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          placeholder={placeholderText}
          className={styles.inputField}
          rows={1}
          disabled={isLoading || isWaitingResponse}
        />
        <motion.button
          onClick={onSendMessage}
          disabled={!input.trim() || isLoading || isWaitingResponse}
          className={styles.sendButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className={(isLoading || isWaitingResponse) ? styles.spinningLoader : ''}>
            {(isLoading || isWaitingResponse) ? (
              <MessageCircle className="w-4 h-4" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </div>
        </motion.button>
      </div>
      <div className={styles.inputHint}>
        {language === 'zh' ? 'Enter 发送 · Shift + Enter 换行' : 'Enter to send · Shift + Enter for new line'}
      </div>
    </div>
  )
})

ChatInput.displayName = 'ChatInput'

export default ChatInput

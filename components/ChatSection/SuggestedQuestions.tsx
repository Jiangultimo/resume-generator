import { memo } from 'react'
import styles from '@/styles/ChatSection.module.css'

interface SuggestedQuestionsProps {
  suggestions: string[]
  isLoading: boolean
  language: string
  onSelectQuestion: (question: string) => void
}

const SuggestedQuestions = memo(({
  suggestions,
  isLoading,
  language,
  onSelectQuestion
}: SuggestedQuestionsProps) => {
  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className={styles.suggestedQuestions}>
      {isLoading ? (
        <span className={styles.suggestionsLoading}>
          {language === 'zh' ? '加载推荐...' : 'Loading...'}
        </span>
      ) : (
        suggestions.map((text, index) => (
          <button
            key={index}
            className={styles.suggestedQuestion}
            onClick={() => onSelectQuestion(text)}
          >
            {text}
          </button>
        ))
      )}
    </div>
  )
})

SuggestedQuestions.displayName = 'SuggestedQuestions'

export default SuggestedQuestions

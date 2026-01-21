import { memo } from 'react'
import { User, Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import styles from '@/styles/ChatSection.module.css'

// 自定义链接渲染器，支持 mailto 链接
const CustomLink = memo(({ href, children }: any) => {
  // mailto 链接直接使用 href，让浏览器原生处理
  return (
    <a
      href={href}
      target={href?.startsWith('mailto:') ? undefined : '_blank'}
      rel={href?.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      style={{ color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer' }}
    >
      {children}
    </a>
  )
})
CustomLink.displayName = 'CustomLink'

export interface Message {
  id: string
  role: 'assistant' | 'user'
  content: string
  isLoading?: boolean
  isStreaming?: boolean
}

// 打字指示器
export const TypingIndicator = memo(() => (
  <div className={styles.typingIndicator}>
    <span className={styles.typingDot} style={{ animationDelay: '0s' }} />
    <span className={styles.typingDot} style={{ animationDelay: '0.2s' }} />
    <span className={styles.typingDot} style={{ animationDelay: '0.4s' }} />
  </div>
))
TypingIndicator.displayName = 'TypingIndicator'

// Loading 指示器
export const LoadingIndicator = memo(({ text }: { text: string }) => (
  <div className={styles.messageLoading}>
    <Loader2 className={`w-4 h-4 ${styles.spinningLoader}`} />
    <span>{text}</span>
  </div>
))
LoadingIndicator.displayName = 'LoadingIndicator'

// Markdown 渲染组件
export const MarkdownRenderer = memo(({ content, isStreaming }: { content: string; isStreaming?: boolean }) => (
  <div className={`${styles.markdownContent} ${isStreaming ? styles.streaming : ''}`}>
    <ReactMarkdown
      components={{
        a: CustomLink as any,
      }}
    >
      {content}
    </ReactMarkdown>
    {isStreaming && <span className={styles.streamingCursor} />}
  </div>
))
MarkdownRenderer.displayName = 'MarkdownRenderer'

// 消息气泡内容
export const MessageContent = memo(({
  message,
  loadingText
}: {
  message: Message
  loadingText: string
}) => {
  if (message.isLoading) {
    return <LoadingIndicator text={loadingText} />
  }

  if (message.content) {
    return <MarkdownRenderer content={message.content} isStreaming={message.isStreaming} />
  }

  return <TypingIndicator />
})
MessageContent.displayName = 'MessageContent'

// 头像组件
const AvatarImage = memo(() => (
  <Image
    src="/avatar.jpg"
    alt="AI Avatar"
    width={32}
    height={32}
    className={styles.avatarImage}
  />
))
AvatarImage.displayName = 'AvatarImage'

// 单条消息组件
export const MessageItem = memo(({
  message,
  loadingText
}: {
  message: Message
  loadingText: string
}) => {
  const isUser = message.role === 'user'

  return (
    <div
      className={`${styles.message} ${isUser ? styles.userMessage : styles.assistantMessage}`}
    >
      <div className={styles.messageAvatar}>
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <AvatarImage />
        )}
      </div>
      <div className={styles.messageBubble}>
        <MessageContent
          message={message}
          loadingText={loadingText}
        />
      </div>
    </div>
  )
})
MessageItem.displayName = 'MessageItem'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { Message } from './ChatMessage'

// 生成唯一 ID
let messageIdCounter = 0
const generateMessageId = () => `msg-${Date.now()}-${++messageIdCounter}`

// 节流更新间隔（毫秒）
const THROTTLE_INTERVAL = 50

interface UseChatLogicProps {
  language: string
  isInitialized: boolean
}

export const useChatLogic = ({ language, isInitialized }: UseChatLogicProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isWaitingResponse, setIsWaitingResponse] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)

  const messageListRef = useRef<HTMLDivElement>(null)
  const fetchedRef = useRef(false)
  const streamingContentRef = useRef('')
  const lastUpdateTimeRef = useRef(0)
  const pendingUpdateRef = useRef<number | null>(null)

  // 滚动到最新消息
  const scrollToBottom = useCallback(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [])

  // 节流更新消息内容
  const throttledUpdateMessage = useCallback((msgId: string, content: string, isIntro: boolean) => {
    const now = Date.now()
    const timeSinceLastUpdate = now - lastUpdateTimeRef.current

    if (pendingUpdateRef.current) {
      cancelAnimationFrame(pendingUpdateRef.current)
      pendingUpdateRef.current = null
    }

    const doUpdate = () => {
      if (isIntro) {
        setMessages([{ id: msgId, role: 'assistant', content, isStreaming: true }])
      } else {
        setMessages(prev => {
          const newMessages = [...prev]
          const lastIndex = newMessages.length - 1
          if (lastIndex >= 0 && newMessages[lastIndex].id === msgId) {
            newMessages[lastIndex] = { ...newMessages[lastIndex], content, isStreaming: true }
          }
          return newMessages
        })
      }
      lastUpdateTimeRef.current = Date.now()
      scrollToBottom()
    }

    if (timeSinceLastUpdate >= THROTTLE_INTERVAL) {
      doUpdate()
    } else {
      pendingUpdateRef.current = requestAnimationFrame(() => {
        doUpdate()
        pendingUpdateRef.current = null
      })
    }
  }, [scrollToBottom])

  // 获取推荐问题
  const fetchSuggestions = useCallback(async (userMessage?: string) => {
    setIsLoadingSuggestions(true)
    try {
      const langParam = language === 'zh' ? 'cn' : 'en'
      const response = await fetch('/api/chat/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang: langParam,
          userMessage
        })
      })
      const data = await response.json()
      if (data.success && data.suggestions) {
        setSuggestions(data.suggestions)
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error)
    } finally {
      setIsLoadingSuggestions(false)
    }
  }, [language])

  // 处理流式响应
  const handleStreamResponse = useCallback(async (
    response: Response,
    msgId: string,
    isIntro: boolean
  ) => {
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    streamingContentRef.current = ''
    setMessages(prev => {
      if (isIntro) {
        return [{ id: msgId, role: 'assistant', content: '', isStreaming: true }]
      }
      const newMessages = [...prev]
      newMessages[newMessages.length - 1] = { id: msgId, role: 'assistant', content: '', isStreaming: true }
      return newMessages
    })
    setIsWaitingResponse(false)
    setIsLoading(true)

    if (reader) {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices?.[0]?.delta?.content
              if (content) {
                streamingContentRef.current += content
                throttledUpdateMessage(msgId, streamingContentRef.current, isIntro)
              }
            } catch {
              // 忽略解析错误
            }
          }
        }
      }
    }

    // 清除待执行的更新
    if (pendingUpdateRef.current) {
      cancelAnimationFrame(pendingUpdateRef.current)
      pendingUpdateRef.current = null
    }

    // 流式完成，更新最终状态
    const finalContent = streamingContentRef.current
    setMessages(prev => {
      if (isIntro) {
        return [{ id: msgId, role: 'assistant', content: finalContent }]
      }
      const newMessages = [...prev]
      newMessages[newMessages.length - 1] = { id: msgId, role: 'assistant', content: finalContent }
      return newMessages
    })
    setIsLoading(false)
  }, [throttledUpdateMessage])

  // 获取 AI 自我介绍 - 仅在 i18n 初始化完成时执行一次
  useEffect(() => {
    // 等待 i18n 初始化完成
    if (!isInitialized) return
    if (fetchedRef.current) return

    // 标记已获取
    fetchedRef.current = true

    const introMsgId = generateMessageId()
    fetchSuggestions()

    const fetchIntro = async () => {
      setMessages([{ id: introMsgId, role: 'assistant', content: '', isLoading: true }])
      setIsWaitingResponse(true)

      try {
        const langParam = language === 'zh' ? 'cn' : 'en'
        const response = await fetch(`/api/chat?lang=${langParam}`)

        const contentType = response.headers.get('content-type')
        if (contentType?.includes('text/event-stream')) {
          await handleStreamResponse(response, introMsgId, true)
        } else {
          setIsWaitingResponse(false)
          const data = await response.json()
          if (data.success && data.message) {
            setMessages([{ id: introMsgId, role: 'assistant', content: data.message }])
          }
        }
      } catch (error) {
        console.error('Failed to fetch intro:', error)
        setIsWaitingResponse(false)
        setMessages([{
          id: introMsgId,
          role: 'assistant',
          content: language === 'zh' ? '加载失败，请刷新重试' : 'Failed to load, please refresh'
        }])
      }
    }

    fetchIntro()
  // 只在 isInitialized 变为 true 时执行一次，不监听 language 变化
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized])

  // 发送消息
  const sendMessage = useCallback(async (messageText?: string) => {
    const userMessage = messageText || input.trim()
    if (!userMessage || isLoading || isWaitingResponse) return

    const userMsgId = generateMessageId()
    const aiMsgId = generateMessageId()

    if (!messageText) setInput('')
    setMessages(prev => [
      ...prev,
      { id: userMsgId, role: 'user', content: userMessage },
      { id: aiMsgId, role: 'assistant', content: '', isLoading: true }
    ])
    setIsWaitingResponse(true)
    setIsLoading(true)

    fetchSuggestions(userMessage)

    try {
      const langParam = language === 'zh' ? 'cn' : 'en'
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }].map(m => ({
            role: m.role,
            content: m.content
          })),
          lang: langParam
        })
      })

      if (!response.ok) throw new Error('Failed to send message')

      await handleStreamResponse(response, aiMsgId, false)
    } catch (error) {
      console.error('Failed to send message:', error)
      setIsWaitingResponse(false)
      const errorMessage = language === 'zh'
        ? '抱歉，发送消息失败，请稍后再试。'
        : 'Sorry, failed to send message. Please try again later.'
      setMessages(prev => [...prev, { id: generateMessageId(), role: 'assistant', content: errorMessage }])
      setIsLoading(false)
    }
  }, [input, isLoading, isWaitingResponse, language, messages, fetchSuggestions, handleStreamResponse])

  // 新消息时滚动
  useEffect(() => {
    scrollToBottom()
  }, [messages.length, scrollToBottom])

  // 清理 pending update
  useEffect(() => {
    return () => {
      if (pendingUpdateRef.current) {
        cancelAnimationFrame(pendingUpdateRef.current)
      }
    }
  }, [])

  return {
    messages,
    input,
    isLoading,
    isWaitingResponse,
    suggestions,
    isLoadingSuggestions,
    messageListRef,
    setInput,
    sendMessage,
    scrollToBottom
  }
}

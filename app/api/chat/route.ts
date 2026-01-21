import { NextRequest, NextResponse } from 'next/server'
import { OpenRouter } from '@openrouter/sdk'
import { getContent } from '@/utils/parse'
import { getPromptConfig, fillPromptTemplate } from '@/config/chat-prompts'

// 初始化 OpenRouter 客户端
function getOpenRouterClient() {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not configured')
  }

  return new OpenRouter({
    apiKey,
    httpReferer: process.env.SITE_URL || 'http://localhost:3000',
    xTitle: 'Resume AI Assistant',
  })
}

// 构建简历上下文
async function buildResumeContext(lang: string): Promise<string> {
  const resume = await getContent(lang === 'en' ? 'en' : 'cn')

  // 提取关键信息构建上下文
  const intros = resume.intros.map(i => `${i.label ? i.label + ': ' : ''}${i.value}`).join('\n')
  const skills = resume.skills.data.join('\n')
  const evaluations = resume.evaluations.data.join('\n')

  const experiences = resume.experience.data.map(exp => {
    const projects = exp.projects.map(p => `  - ${p.content.replace(/<[^>]*>/g, '').replace(/\{links\.\d+\}/g, '')}`).join('\n')
    return `【${exp.company}】${exp.position} (${exp.time})
${exp.companyDes || ''}
${projects}`
  }).join('\n\n')

  return `
# 个人信息
${intros}

# 技能
${skills}

# 自我评价
${evaluations}

# 工作经历
${experiences}
`.trim()
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang') || 'cn'

  try {
    const openRouter = getOpenRouterClient()
    const resumeContext = await buildResumeContext(lang)
    const prompts = getPromptConfig(lang)

    const systemPrompt = fillPromptTemplate(prompts.introSystem, { resumeContext })

    // 使用流式响应
    const stream = await openRouter.chat.send({
      model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompts.introUser }
      ],
      stream: true
    })

    // 创建 ReadableStream 来转发流式响应
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const data = JSON.stringify(chunk)
            controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`))
          }
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          console.error('Stream error:', error)
          controller.error(error)
        }
      }
    })

    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error: any) {
    console.error('Failed to generate intro:', error)
    console.error('Error details:', {
      status: error?.status,
      statusCode: error?.statusCode,
      response: error?.response,
      message: error?.message
    })

    // 检查多种可能的 429 错误格式
    const is429 =
      error?.status === 429 ||
      error?.statusCode === 429 ||
      error?.response?.status === 429 ||
      error?.response?.statusCode === 429 ||
      (error?.message && error.message.includes('429')) ||
      (error?.message && error.message.toLowerCase().includes('rate limit'))

    if (is429) {
      return NextResponse.json(
        {
          success: false,
          error: 'QUOTA_EXCEEDED',
          message: lang === 'cn'
            ? 'AI 服务暂时不可用，请稍后再试'
            : 'AI service is temporarily unavailable, please try again later'
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to generate intro' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages, lang = 'cn' } = await request.json()

    // 获取 OpenRouter 客户端
    let openRouter: OpenRouter
    try {
      openRouter = getOpenRouterClient()
    } catch {
      return NextResponse.json(
        { success: false, error: 'API key not configured' },
        { status: 500 }
      )
    }

    // 构建简历上下文和获取 prompt 配置
    const resumeContext = await buildResumeContext(lang)
    const prompts = getPromptConfig(lang)
    const systemPrompt = fillPromptTemplate(prompts.chatSystem, { resumeContext })

    // 使用 OpenRouter SDK 发起流式请求
    const stream = await openRouter.chat.send({
      model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      stream: true
    })

    // 创建 ReadableStream 来转发 SDK 的流式响应
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const data = JSON.stringify(chunk)
            controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`))
          }
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          console.error('Stream error:', error)
          controller.error(error)
        }
      }
    })

    // 返回流式响应
    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error: any) {
    console.error('Chat API error:', error)
    console.error('Error details:', {
      status: error?.status,
      statusCode: error?.statusCode,
      response: error?.response,
      message: error?.message
    })

    // 检查多种可能的 429 错误格式
    const is429 =
      error?.status === 429 ||
      error?.statusCode === 429 ||
      error?.response?.status === 429 ||
      error?.response?.statusCode === 429 ||
      (error?.message && error.message.includes('429')) ||
      (error?.message && error.message.toLowerCase().includes('rate limit'))

    if (is429) {
      return NextResponse.json(
        {
          success: false,
          error: 'QUOTA_EXCEEDED',
          message: 'AI 服务暂时不可用，请稍后再试'
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { OpenRouter } from '@openrouter/sdk'
import { getContent } from '@/utils/parse'
import { suggestionsPrompt, fillPromptTemplate, getSuggestedQuestions } from '@/config/chat-prompts'

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

  const intros = resume.intros.map(i => `${i.label ? i.label + ': ' : ''}${i.value}`).join('\n')
  const skills = resume.skills.data.join('\n')

  const experiences = resume.experience.data.map(exp => {
    const projects = exp.projects.map(p => `  - ${p.content.replace(/<[^>]*>/g, '').replace(/\{links\.\d+\}/g, '')}`).join('\n')
    return `【${exp.company}】${exp.position} (${exp.time})
${projects}`
  }).join('\n\n')

  return `
# 个人信息
${intros}

# 技能
${skills}

# 工作经历
${experiences}
`.trim()
}

export async function POST(request: NextRequest) {
  try {
    const { lang = 'cn', userMessage } = await request.json()

    let openRouter: OpenRouter
    try {
      openRouter = getOpenRouterClient()
    } catch {
      // 如果 API 未配置，返回静态推荐
      const fallback = getSuggestedQuestions(lang)
      return NextResponse.json({
        success: true,
        suggestions: fallback.map(q => q.text)
      })
    }

    const resumeContext = await buildResumeContext(lang)
    const prompts = suggestionsPrompt[lang === 'en' ? 'en' : 'cn']

    // 选择初始推荐还是后续推荐
    const isInitial = !userMessage
    const promptTemplate = isInitial ? prompts.initial : prompts.followUp

    const prompt = fillPromptTemplate(promptTemplate, {
      resumeContext,
      userMessage: userMessage || ''
    })

    // 使用较小的模型来生成推荐，节省 token
    const response = await openRouter.chat.send({
      model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
      messages: [
        { role: 'user', content: prompt }
      ],
      stream: false
    })

    // 解析返回的 JSON 数组
    const rawContent = response.choices?.[0]?.message?.content || ''
    const content = typeof rawContent === 'string' ? rawContent : ''

    try {
      // 尝试提取 JSON 数组
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        const suggestions = JSON.parse(jsonMatch[0])
        if (Array.isArray(suggestions) && suggestions.length > 0) {
          return NextResponse.json({
            success: true,
            suggestions: suggestions.slice(0, 4)
          })
        }
      }
    } catch {
      console.error('Failed to parse suggestions:', content)
    }

    // 解析失败，返回静态推荐
    const fallback = getSuggestedQuestions(lang)
    return NextResponse.json({
      success: true,
      suggestions: fallback.map(q => q.text)
    })

  } catch (error) {
    console.error('Suggestions API error:', error)
    // 出错时返回静态推荐
    const { lang = 'cn' } = await request.json().catch(() => ({ lang: 'cn' }))
    const fallback = getSuggestedQuestions(lang)
    return NextResponse.json({
      success: true,
      suggestions: fallback.map(q => q.text)
    })
  }
}

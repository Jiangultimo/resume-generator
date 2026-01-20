import { NextRequest, NextResponse } from 'next/server'
import mql from '@microlink/mql'

export const runtime = 'edge'

interface LinkPreviewData {
  title: string
  description: string
  image: string
  url: string
  screenshot?: string
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const url = searchParams.get('url')

    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      )
    }

    // 验证 URL 格式
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    // 使用 Microlink 官方 SDK 获取网站预览和截图
    // 免费版无需 API key,每月 50 次请求限制
    // 参考文档: https://microlink.io/docs/sdk/getting-started/overview
    const { status, data } = await mql(url, {
      screenshot: true,
      meta: true,
    })

    if (status !== 'success' || !data) {
      throw new Error('Failed to fetch preview from Microlink')
    }

    const previewData: LinkPreviewData = {
      title: data.title || 'No title',
      description: data.description || '',
      image: data.image?.url || data.logo?.url || '',
      screenshot: data.screenshot?.url || '',
      url: url,
    }

    return NextResponse.json(previewData, {
      headers: {
        // 设置缓存头,减少客户端重复请求
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
      },
    })
  } catch (error) {
    console.error('Link preview error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch link preview',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

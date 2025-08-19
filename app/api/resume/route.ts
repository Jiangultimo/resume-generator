import { NextRequest, NextResponse } from 'next/server'
import { getContent } from '@/utils/parse'

export async function GET(request: NextRequest) {
  try {
    // Get language from query parameters, default to 'cn'
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('lang') || 'cn'
    
    const resume = await getContent(language)
    return NextResponse.json(resume)
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resume data' },
      { status: 500 }
    )
  }
}
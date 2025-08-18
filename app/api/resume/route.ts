import { NextRequest, NextResponse } from 'next/server'
import { getContent } from '@/utils/parse'

export async function GET(request: NextRequest) {
  try {
    const resume = await getContent('cn')
    return NextResponse.json(resume)
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resume data' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Handle file upload using the new approach for App Router
    const file = formData.get('avatar') as File
    
    if (!file) {
      return NextResponse.json(
        { success: false, msg: 'No file provided' },
        { status: 400 }
      )
    }

    // TODO: Add image type validation and size limit
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Save file to public directory
    const filePath = path.join(process.cwd(), './public/avatar.jpg')
    fs.writeFileSync(filePath, buffer)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, msg: String(error) },
      { status: 400 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import formidable from 'formidable'
import path from 'path'
import { IncomingMessage } from 'http'

export async function POST(request: NextRequest) {
  try {
    const form = formidable({
      uploadDir: path.join(process.cwd(), './public/'),
      filename: () => `avatar.jpg`, // set upload file name
    })

    // Convert NextRequest to Node.js IncomingMessage for formidable
    const formData = await request.formData()
    
    // Handle file upload using the new approach for App Router
    const file = formData.get('avatar') as File
    
    if (!file) {
      return NextResponse.json(
        { success: false, msg: 'No file provided' },
        { status: 400 }
      )
    }

    // TODO: Add image type guard
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Save file to public directory
    const fs = require('fs')
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
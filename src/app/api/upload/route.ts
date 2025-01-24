import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Save to public/uploads directory
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    const filename = `${Date.now()}-${file.name}`
    const filepath = join(uploadDir, filename)
    
    await writeFile(filepath, buffer)
    
    return NextResponse.json({ 
      url: `/uploads/${filename}`
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
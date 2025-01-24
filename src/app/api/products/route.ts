import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Database URL:', process.env.DATABASE_URL) // Debug log
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    
    // Extract product data
    const name = formData.get('name') as string
    const price = parseFloat(formData.get('price') as string)
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const imageFiles = formData.getAll('images') as File[]

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      imageFiles.map(file => uploadToCloudinary(file))
    )

    // Create product in database
    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        category,
        images: imageUrls
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
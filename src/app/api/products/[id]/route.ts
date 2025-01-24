import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'
export const dynamicParams = true

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productId = params.id
  
  const product = await prisma.product.findFirst({
    where: {
      id: productId
    }
  })

  if (!product) {
    return new NextResponse('Product not found', { status: 404 })
  }

  return NextResponse.json(product)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productId = params.id
  const data = await request.json()
  
  const product = await prisma.product.update({
    where: {
      id: productId
    },
    data: {
      name: data.name,
      price: parseFloat(data.price),
      description: data.description,
      category: data.category,
      images: data.images
    }
  })

  return NextResponse.json(product)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productId = params.id
  
  await prisma.product.delete({
    where: {
      id: productId
    }
  })

  return new NextResponse(null, { status: 204 })
}
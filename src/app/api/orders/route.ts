import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const { paypalOrderId, items, total } = await request.json()
  
  const order = await prisma.order.create({
    data: {
      paypalOrderId,
      total,
      items: {
        create: items.map((item: any) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          size: item.size
        }))
      }
    }
  })

  return NextResponse.json({ success: true, orderId: order.id })
}

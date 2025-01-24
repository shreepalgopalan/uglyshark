import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const { email, password, name, phone, street, city, postcode } = await request.json()

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      phone,
      address: {
        create: {
          street,
          city,
          postcode
        }
      }
    }
  })

  return NextResponse.json({ success: true })
}
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const { email, password } = await request.json()
  
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user || !user.isVerified) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // Create a proper payload object with user data
  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role || 'user'
  }

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  const response = NextResponse.json({ 
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  })

  response.cookies.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })

  return response
}
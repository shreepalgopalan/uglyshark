import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('Prisma connected successfully')
  } catch (error) {
    console.error('Prisma connection failed:', error)
  }
}

testConnection()

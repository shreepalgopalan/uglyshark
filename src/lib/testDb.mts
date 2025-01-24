import 'dotenv/config';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Database connection successful')
    
    const userCount = await prisma.user.count()
    console.log(`Current user count: ${userCount}`)
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// IIFE to run the async function
(async () => {
  await testConnection()
})()
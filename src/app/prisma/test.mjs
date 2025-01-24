import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('Database connection successful')
    
    // Test query
    const products = await prisma.product.findMany()
    console.log('Products found:', products.length)
    console.log('Products:', products)
    
  } catch (error) {
    console.error('Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()